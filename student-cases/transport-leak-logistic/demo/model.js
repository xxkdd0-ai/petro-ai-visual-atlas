/* Binary event classification + independent pressure-arrival localization. */
(function(root){'use strict';
const LENGTH=10000,SPEED=1000,DT=.1,EVENT=12,featuresNames=['A端压力降','B端压力降','净流量差变化','平均输量变化'];
function rng(seed){let s=seed>>>0;return()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return(s+.5)/4294967296;};}
function normal(r){return Math.sqrt(-2*Math.log(r()))*Math.cos(2*Math.PI*r());}
function ramp(t,start){return t<start?0:1-Math.exp(-(t-start)/.25);}
function generate(type='leak',position=4000,strength=1,noise=1,seed=6100){if(!['normal','operation','leak'].includes(type)||!Number.isFinite(position)||position<0||position>LENGTH||!Number.isFinite(strength)||strength<.1||strength>1.5||!Number.isFinite(noise)||noise<0||noise>3)throw Error('无效情景');const r=rng(seed),offset=.15*(r()-.5),baseFlow=100+10*(r()-.5),operationBias=2.5*(r()-.5),pA=[],pB=[],qA=[],qB=[],times=[];
 const arrivalA=EVENT+(type==='leak'?position/SPEED:0),arrivalB=EVENT+(type==='leak'?(LENGTH-position)/SPEED:LENGTH/SPEED);
 for(let i=0;i<=400;i++){const t=i*DT,active=type!=='normal',wa=active?ramp(t,arrivalA):0,wb=active?ramp(t,arrivalB):0,drop=.15*strength,common=.002*Math.sin(t*.4);times.push(t);
 pA.push(5+offset+common-drop*wa+.008*noise*normal(r));pB.push(4.6+offset+common-drop*wb+.008*noise*normal(r));
 qA.push(baseFlow+(type==='leak'?5*strength:-12*strength)*wa+.6*noise*normal(r));qB.push(baseFlow+(type==='leak'?-10*strength:(-12+operationBias)*strength)*wb+.6*noise*normal(r));}
 return {times,pA,pB,qA,qB,truth:{type,position:type==='leak'?position:null,event:type==='normal'?null:EVENT,arrivalA:activeArrival(type,arrivalA),arrivalB:activeArrival(type,arrivalB),speed:SPEED}};}
function activeArrival(type,t){return type==='normal'?null:t;}
function mean(a){return a.reduce((s,v)=>s+v,0)/a.length;}
function features(s){const before=a=>mean(a.slice(20,81)),after=a=>mean(a.slice(320,381)),dropA=before(s.pA)-after(s.pA),dropB=before(s.pB)-after(s.pB),imbalance=(after(s.qA)-after(s.qB))-(before(s.qA)-before(s.qB)),flowChange=Math.abs((after(s.qA)+after(s.qB)-before(s.qA)-before(s.qB))/2);return [dropA,dropB,imbalance,flowChange];}
function dataset(seed,nPer=160,noiseOverride=null){const r=rng(seed),out=[];for(const type of ['normal','operation','leak'])for(let i=0;i<nPer;i++){const position=500+r()*9000,strength=.15+r()*1.35,noise=noiseOverride===null?.3+r()*1.5:noiseOverride;const s=generate(type,position,strength,noise,(r()*4294967295)>>>0);out.push({x:features(s),y:type==='leak'?1:0,type});}return out;}
function sigmoid(x){return x>=0?1/(1+Math.exp(-x)):Math.exp(x)/(1+Math.exp(x));}
function fit(rows){const mu=[0,1,2,3].map(i=>mean(rows.map(r=>r.x[i]))),sd=mu.map((m,i)=>Math.sqrt(mean(rows.map(r=>(r.x[i]-m)**2)))||1),data=rows.map(r=>({z:[1,...r.x.map((v,i)=>(v-mu[i])/sd[i])],y:r.y})),coef=[0,0,0,0,0];for(let epoch=0;epoch<600;epoch++){const g=[0,0,0,0,0];for(const r of data){const d=sigmoid(r.z.reduce((s,v,i)=>s+v*coef[i],0))-r.y;for(let j=0;j<5;j++)g[j]+=d*r.z[j]/data.length;}for(let j=0;j<5;j++)coef[j]-=.15*(g[j]+(j?.008*coef[j]:0));}return {mu,sd,coef};}
function predict(model,x){return sigmoid(model.coef[0]+x.reduce((s,v,i)=>s+(v-model.mu[i])/model.sd[i]*model.coef[i+1],0));}
function metrics(rows,predictor){const matrix=[[0,0],[0,0]];rows.forEach(r=>matrix[r.y][predictor(r)?1:0]++);const [[tn,fp],[fn,tp]]=matrix;return {matrix,recall:tp+fn?tp/(tp+fn):null,falseRate:fp+tn?fp/(fp+tn):null,precision:tp+fp?tp/(tp+fp):null};}
function evaluate(model,rows,threshold){return {learned:metrics(rows,r=>predict(model,r.x)>=threshold),pressure:metrics(rows,r=>r.x[0]>.025&&r.x[1]>.025),operationFalseRate:mean(rows.filter(r=>r.type==='operation').map(r=>predict(model,r.x)>=threshold?1:0))};}
function arrival(pressure){const reference=pressure.slice(0,81),base=mean(reference),sigma=Math.sqrt(mean(reference.map(v=>(v-base)**2))),threshold=Math.max(.015,4*sigma);let count=0;for(let i=85;i<pressure.length;i++){const drop=base-mean(pressure.slice(i-4,i+1));count=drop>threshold?count+1:0;if(count===3){return {time:(i-2)*DT,threshold,sigma};}}return {time:null,threshold,sigma};}
function locate(signals,assumedSpeed=1000){if(!(assumedSpeed>=700&&assumedSpeed<=1300))throw Error('波速超出教学范围');const a=arrival(signals.pA),b=arrival(signals.pB);if(a.time===null||b.time===null)return {valid:false,reason:'至少一端未可靠检出压力到时',a,b,x:null};const x=(LENGTH+assumedSpeed*(a.time-b.time))/2;if(x<0||x>LENGTH)return {valid:false,reason:'到时差与假设波速给出管段外位置',a,b,x:null};return {valid:true,reason:'双端到时检出；仍需核对波速与时钟同步',a,b,x};}
function inspect(model,signals,threshold=.5,speed=1000){const x=features(signals),score=predict(model,x),flag=score>=threshold,location=locate(signals,speed);return {features:x,score,flag,location:flag?location:{...location,valid:false,x:null,reason:'分类分数未达到复核阈值，不输出泄漏位置'}};}
const api={LENGTH,SPEED,DT,EVENT,featuresNames,rng,generate,mean,features,dataset,sigmoid,fit,predict,metrics,evaluate,arrival,locate,inspect};if(typeof module!=='undefined')module.exports=api;else root.LeakModel=api;
})(typeof window!=='undefined'?window:globalThis);
