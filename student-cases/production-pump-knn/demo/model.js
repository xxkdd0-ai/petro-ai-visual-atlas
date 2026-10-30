/* Teaching-only synthetic dynamometer shapes. No wave-equation solver. */
(function(root){
'use strict';
const labels=['正常','供液不足','阀漏'];
function rng(seed){let s=seed>>>0;return ()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return s/4294967296;};}
function generate(label,seed,noise=.03){
 if(!Number.isInteger(label)||label<0||label>2||!Number.isFinite(noise)||noise<0)throw Error('无效生成参数');
 const r=rng(seed),p=[],bend=.35+r()*.35,tilt=(r()-.5)*.16,shift=r()*.3,scale=.8+r()*.4;
 for(let j=0;j<2;j++)for(let i=0;i<=40;i++){
  const x=j?1-i/40:i/40;
  const edge=Math.min(1,x/.08,(1-x)/.08);
  let gap=.68;
  if(label===1)gap*=.18+.82/(1+Math.exp(-(x-bend)*13));
  if(label===2)gap*=.28+.72*Math.sin(Math.PI*x);
  const base=.16+tilt*x;
  let y=base+(j?0:gap*edge);
  // Smooth deformation plus independent sensor noise, not class-coded features.
  y+=.035*Math.sin(x*Math.PI*2+seed%13)+(r()-.5)*noise*2;
  p.push([x*scale+shift,y*scale+shift]);
 }
 return p;
}
function normalize(p){
 if(!Array.isArray(p)||p.length<8||p.some(q=>!Array.isArray(q)||q.length!==2||q.some(v=>!Number.isFinite(v))))throw Error('曲线至少8个有限二维点');
 const xs=p.map(q=>q[0]),ys=p.map(q=>q[1]),xmin=Math.min(...xs),ymin=Math.min(...ys),dx=Math.max(...xs)-xmin,dy=Math.max(...ys)-ymin;
 if(dx<1e-9||dy<1e-9)throw Error('位移或载荷无变化，无法识别');
 return p.map(q=>[(q[0]-xmin)/dx,(q[1]-ymin)/dy]);
}
function features(p){
 const q=normalize(p);let area=0;for(let i=0;i<q.length;i++){const a=q[i],b=q[(i+1)%q.length];area+=a[0]*b[1]-b[0]*a[1];}
 const h=Math.floor(q.length/2),a=q.slice(0,h),b=q.slice(h).reverse();
 function gap(lo,hi){let s=0,n=0;for(let i=0;i<Math.min(a.length,b.length);i++)if(a[i][0]>=lo&&a[i][0]<hi){s+=a[i][1]-b[i][1];n++;}return n?s/n:0;}
 return [Math.abs(area)/2,gap(.1,.35),gap(.35,.65),gap(.65,.9)];
}
function dataset(seed,count,noise){const out=[];for(let c=0;c<3;c++)for(let i=0;i<count;i++)out.push({id:seed+'-'+c+'-'+i,label:c,points:generate(c,seed+c*10000+i*37,noise)});return out;}
function train(samples){
 if(!samples.length)throw Error('训练集为空');
 const f=samples.map(s=>features(s.points)),mean=f[0].map((_,j)=>f.reduce((s,a)=>s+a[j],0)/f.length),sd=mean.map((m,j)=>Math.sqrt(f.reduce((s,a)=>s+(a[j]-m)**2,0)/f.length)||1);
 const scale=a=>a.map((v,j)=>(v-mean[j])/sd[j]);
 const rows=samples.map((s,i)=>({...s,f:scale(f[i])}));
 const centers=labels.map((_,c)=>{const rr=rows.filter(s=>s.label===c);if(!rr.length)throw Error('训练集缺少类别');return mean.map((_,j)=>rr.reduce((s,a)=>s+a.f[j],0)/rr.length);});
 return {rows,mean,sd,centers};
}
function distance(a,b){return Math.sqrt(a.reduce((s,v,j)=>s+(v-b[j])**2,0));}
function predict(model,points,k=5){
 if(!Number.isFinite(k)||k<1)throw Error('k必须大于等于1');
 k=Math.min(Math.floor(k),model.rows.length);
 const raw=features(points),f=raw.map((v,j)=>(v-model.mean[j])/model.sd[j]);
 const nearest=model.rows.map(s=>({sample:s,distance:distance(s.f,f)})).sort((a,b)=>a.distance-b.distance).slice(0,k);
 const votes=[0,0,0];nearest.forEach(s=>votes[s.sample.label]++);
 const label=votes.indexOf(Math.max(...votes)),ds=model.centers.map(c=>distance(c,f));
 return {label,votes,share:votes[label]/k,nearest,raw,baseline:ds.indexOf(Math.min(...ds))};
}
function metrics(matrix){
 const n=matrix.flat().reduce((a,b)=>a+b,0),recall=[],precision=[],f1=[];
 for(let c=0;c<3;c++){const tp=matrix[c][c],row=matrix[c].reduce((a,b)=>a+b,0),col=matrix.reduce((s,a)=>s+a[c],0);recall.push(row?tp/row:0);precision.push(col?tp/col:0);f1.push(precision[c]+recall[c]?2*precision[c]*recall[c]/(precision[c]+recall[c]):0);}
 return {accuracy:n?matrix.reduce((s,a,i)=>s+a[i],0)/n:0,recall,precision,f1,macroF1:f1.reduce((a,b)=>a+b,0)/3,n};
}
function evaluate(model,test,k){let knn=Array.from({length:3},()=>[0,0,0]),base=Array.from({length:3},()=>[0,0,0]);test.forEach(s=>{const p=predict(model,s.points,k);knn[s.label][p.label]++;base[s.label][p.baseline]++;});return {knn,base,knnMetrics:metrics(knn),baseMetrics:metrics(base)};}
const api={labels,rng,generate,normalize,features,dataset,train,predict,evaluate,metrics};
if(typeof module!=='undefined')module.exports=api;else root.PumpModel=api;
})(typeof window!=='undefined'?window:globalThis);
