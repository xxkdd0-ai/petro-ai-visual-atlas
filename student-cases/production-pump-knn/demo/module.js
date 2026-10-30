module.exports={mount:function(root){root.innerHTML="<style>.pump-demo-root{font-family:system-ui,'Microsoft YaHei',sans-serif;color:#18302e;background:#f4f6f1;font-size:15px}*{box-sizing:border-box}body{margin:0}main{max-width:1180px;margin:auto;padding:28px}header{border-bottom:1px solid #bccdc5;padding-bottom:20px;margin-bottom:20px}h1{font-size:clamp(24px,4vw,36px);margin:8px 0}h2{font-size:20px;margin:0 0 12px}h3{font-size:16px}p{line-height:1.8;color:#4f6560}small,.eyebrow{color:#536c62}.eyebrow{letter-spacing:2px;font-weight:700}button,select,input{font:inherit}button,select{border:1px solid #a9beb3;border-radius:8px;padding:10px 14px;background:white;color:#18302e;cursor:pointer}button:hover,button.active{background:#205c4e;color:white}button:focus-visible,select:focus-visible,input:focus-visible{outline:3px solid #c57a25;outline-offset:3px}nav{display:flex;gap:10px;flex-wrap:wrap;margin:18px 0}.panel[hidden]{display:none}.grid{display:grid;grid-template-columns:250px 1fr;gap:18px}.card{background:white;border:1px solid #d7e0d7;border-radius:14px;padding:20px;margin-bottom:16px}.controls label{display:block;margin:18px 0 7px;font-weight:600}.controls input[type=range],select{width:100%}.controls button{margin-top:12px;width:100%}svg{width:100%;height:auto;display:block}svg text{font-family:inherit;font-size:13px;fill:#425d55}.tag{display:inline-block;background:#e5eee6;padding:5px 10px;border-radius:20px;font-size:12px}.result{display:flex;gap:16px;flex-wrap:wrap;align-items:center;padding:12px 0}.result strong{font-size:25px;color:#205c4e}.note{padding:12px;border-left:3px solid #b67732;background:#faf1e3;color:#675138;line-height:1.6}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.stat{background:#edf3ee;padding:14px;border-radius:8px}.stat b{display:block;font-size:26px}.neighbors{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.neighbor{border:1px solid #d7e0d7;padding:10px;border-radius:9px}.tables{display:grid;grid-template-columns:1fr 1fr;gap:20px}table{width:100%;border-collapse:collapse;font-size:13px}td,th{padding:9px 5px;text-align:center;border-bottom:1px solid #e3e8e2}.stepbuttons{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px}a{color:#216453}.fine{font-size:12px}.legend{display:flex;gap:18px;flex-wrap:wrap}.bar{height:10px;background:#d9e7df;border-radius:6px;overflow:hidden}.bar span{display:block;height:100%;background:#397a67}.features{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.section-copy{max-width:850px}.screenreader{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}@media(max-width:700px){main{padding:14px}.grid,.tables{grid-template-columns:1fr}.neighbors{grid-template-columns:1fr 1fr}.features,.stats{grid-template-columns:1fr 1fr}.card{padding:14px}h1{font-size:25px}nav button{padding:9px}.controls{display:grid;grid-template-columns:1fr 1fr;gap:10px}.controls h2,.controls .note{grid-column:1/-1}.controls label{margin-top:5px}}\n\n/* Focused experiment; compact typography matched to portal. */\n.pump-demo-root{font-size:14px}main{padding:18px}header{padding-bottom:12px;margin-bottom:16px}h1{font-size:22px;margin:0 0 8px}h2{font-size:17px}h3{font-size:14px}.card{padding:16px}.result strong{font-size:22px}.eyebrow{letter-spacing:.06em;font-size:11px}.stat b{font-size:23px}#plot{max-width:720px;margin:auto}.neighbor small{font-size:11px}.fine{line-height:1.65}\n\n/* Vote evidence: stable category colors, readable zero counts, responsive rows. */\n.vote-panel{border-top:1px solid #d7e0d7;margin-top:12px;padding-top:18px}\n.vote-heading{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:18px}\n.vote-heading h2{margin:0 0 4px}.vote-heading p{margin:0;font-size:12px}\n.vote-support{text-align:right;flex-shrink:0}.vote-support>strong{display:block;font-size:32px;line-height:1.15;font-variant-numeric:tabular-nums}.vote-support small{font-size:18px;color:inherit}.vote-support>span{display:block;font-size:12px;margin-top:5px;color:#4f6560}\n.vote-rows{display:grid;gap:14px}.vote-row{display:grid;grid-template-columns:145px minmax(0,1fr) 85px;align-items:center;gap:12px}\n.vote-label{display:flex;align-items:center;gap:6px;font-size:13px}.is-selected .vote-label{font-weight:700}.vote-selected{font-size:10px;font-weight:500;white-space:nowrap;padding:2px 5px;border:1px solid #bccdc5;border-radius:4px;color:#4f6560}\n.vote-track{height:14px;border-radius:4px;background:#edf1ed;overflow:hidden}.vote-track>span{display:block;height:100%;border-radius:4px}\n.vote-count{text-align:right;font-size:18px;font-variant-numeric:tabular-nums;white-space:nowrap}.vote-count>span{font-size:12px;font-weight:400;color:#4f6560}.vote-footnote{font-size:12px;margin:14px 0 0;line-height:1.6}\n@media(max-width:480px){.vote-heading{align-items:flex-start}.vote-heading p{max-width:130px}.vote-support>strong{font-size:28px}.vote-row{grid-template-columns:minmax(0,1fr) 80px;gap:6px 10px}.vote-label{grid-column:1/-1}.vote-track{height:12px}}\n\n.pump-demo-root{display:flow-root;line-height:normal}.pump-demo-root main{height:auto;max-height:none;overflow:visible}</style><div class=\"pump-demo-root\"><main>\n<header><h1>示功图工况识别实验</h1><p>调节工况与噪声，观察分类依据和误差变化。<span class=\"tag\">教学合成数据</span></p></header>\n\n\n<section id=\"demo\" class=\"panel\"><div class=\"grid\"><aside class=\"card controls\"><h2>实验控制台</h2><div><label for=\"condition\">生成工况</label><select id=\"condition\"><option value=\"0\">正常</option><option value=\"1\">供液不足</option><option value=\"2\">阀漏</option></select></div><div><label for=\"noise\">测试噪声 <output id=\"noise-value\">0.03</output></label><input id=\"noise\" type=\"range\" min=\"0\" max=\"0.4\" step=\"0.01\" value=\"0.03\"></div><div><label for=\"k\">邻居数 k</label><select id=\"k\"><option>1</option><option>3</option><option selected>5</option><option>9</option><option>15</option></select></div><div><label><input type=\"checkbox\" id=\"truth\" checked> 显示真值</label><button id=\"next\">换一条样本</button><button id=\"reset\">重置实验</button></div><p class=\"note fine\">训练集固定180条；测试集90条。改变测试噪声不会重新训练。图形是简化形态示意，不是井下物理仿真。</p></aside>\n<div><article class=\"card\"><span class=\"eyebrow\">LOAD × DISPLACEMENT</span><div class=\"result\" aria-live=\"polite\" id=\"result\"></div><div id=\"plot\"></div><section id=\"votes\" class=\"vote-panel\" aria-label=\"近邻投票\"></section><p id=\"review\" class=\"note\"></p></article><article class=\"card\"><h2>当前样本的四维特征</h2><div id=\"features\" class=\"features\"></div><p class=\"fine\">所有特征只从曲线计算；距离使用训练集均值和标准差进行标准化。</p></article></div></div>\n<article class=\"card\"><h2>模型参考了哪些相似样本？</h2><p>按四维特征距离排序，展示最近6条以内的训练样本。投票比例不是经过校准的故障概率。</p><div id=\"neighbors\" class=\"neighbors\"></div></article>\n<article class=\"card\"><h2>同一组测试样本，两种方法</h2><p>每类30条，行是真实工况，列是预测工况。噪声作用于测试数据；成绩由当前计算得出。</p><div class=\"stats\" id=\"stats\"></div><div class=\"tables\"><div><h3>k近邻分类</h3><div id=\"matrix\"></div></div><div><h3>最近类中心基线</h3><div id=\"baseline\"></div></div></div><p id=\"recall\"></p><p class=\"note\">这里只衡量三类简化合成形状的识别能力。即使获得100%也不能说明可直接用于油田；真实应用需要跨井验证、复合故障样本与人工复核。</p></article></section>\n<footer><p class=\"fine\">参考：<a href=\"https://www.mdpi.com/1424-8220/20/19/5659\" target=\"_blank\" rel=\"noreferrer\">示功图工况识别研究（Sensors, 2020）</a>。本例不复现论文模型或精度。</p></footer></main></div>";const localDocument={getElementById:function(id){return root.querySelector("#"+id);}};(function(window,document,module){
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

(function(){'use strict';
const M=window.PumpModel,$=id=>document.getElementById(id),colors=['#2f7d6b','#b26a39','#41699b'];
const training=M.dataset(13001,60,.035),model=M.train(training);let seed=700003;
const names=['闭合面积','左段支间距','中段支间距','右段支间距'];
function chart(points,label,mini=false){const p=M.normalize(points);return '<svg viewBox="0 0 540 270" role="img" aria-label="'+label+'归一化示功图"><path d="M45 20V225H510" stroke="#9fb4aa" fill="none"/>'+[0,.5,1].map(n=>'<path d="M45 '+(225-n*190)+'H510" stroke="#e4ebe6"/><text x="12" y="'+(230-n*190)+'">'+n+'</text>').join('')+'<path d="'+p.map((q,i)=>(i?'L':'M')+(45+q[0]*450).toFixed(1)+' '+(225-q[1]*190).toFixed(1)).join(' ')+'Z" fill="#27796615" stroke="#277966" stroke-width="2"/>'+(!mini?'<text x="200" y="260">归一化位移 →</text><text x="48" y="15">归一化载荷 ↑</text><text x="380" y="25">上冲程 → / 下冲程 ←</text>':'')+'</svg>';}
function matrix(a){return '<table><caption class="screenreader">行真值，列预测</caption><thead><tr><th>真值↓ / 预测→</th>'+M.labels.map(l=>'<th>'+l+'</th>').join('')+'</tr></thead><tbody>'+a.map((row,i)=>'<tr><th>'+M.labels[i]+'</th>'+row.map((v,j)=>'<td style="background:'+(i===j?'#e3f0e7':'#fbf1e5')+'">'+v+'</td>').join('')+'</tr>').join('')+'</tbody></table>';}
function render(){const noise=+$('noise').value,k=+$('k').value,label=+$('condition').value,points=M.generate(label,seed,noise),p=M.predict(model,points,k),e=M.evaluate(model,M.dataset(290003,30,noise),k);$('noise-value').textContent=noise.toFixed(2);
 $('result').innerHTML='<strong>'+M.labels[p.label]+'</strong>'+($('truth').checked?'<span class="tag">真值：'+M.labels[label]+'</span>':'');
 $('plot').innerHTML=chart(points,'当前样本');
 $('review').textContent=p.share<.8||p.nearest[0].distance>2?'建议人工复核：近邻意见分散或样本偏离已知训练形态。':'相似样本意见较一致；仍需结合井况及作业记录复核，不能仅凭图形确诊。';
 const total=p.votes.reduce((sum,v)=>sum+v,0);
 $('votes').innerHTML='<div class="vote-heading"><div><h2>近邻投票</h2><p>查看相似样本的类别支持情况</p></div><div class="vote-support" aria-live="polite"><strong style="color:'+colors[p.label]+'">'+Math.round(p.share*100)+'<small>%</small></strong><span>近邻支持 · '+p.votes[p.label]+' / '+total+'票</span></div></div><div class="vote-rows">'+M.labels.map((name,i)=>{const share=total?p.votes[i]/total*100:0;return '<div class="vote-row'+(i===p.label?' is-selected':'')+'"><div class="vote-label">'+name+(i===p.label?'<span class="vote-selected">当前预测</span>':'')+'</div><div class="vote-track" role="meter" aria-label="'+name+'支持票数" aria-valuemin="0" aria-valuemax="'+total+'" aria-valuenow="'+p.votes[i]+'" aria-valuetext="'+p.votes[i]+' / '+total+'票"><span style="width:'+share+'%;background:'+colors[i]+'"></span></div><strong class="vote-count">'+p.votes[i]+' <span>/ '+total+'票</span></strong></div>';}).join('')+'</div><p class="vote-footnote">支持率表示邻居意见的一致程度，不是确诊概率；即使一致支持，也仍需现场复核。</p>';
 $('features').innerHTML=p.raw.map((v,i)=>'<div>'+names[i]+'<h3>'+v.toFixed(3)+'</h3><div class="bar"><span style="width:'+Math.max(0,Math.min(100,v*100))+'%"></span></div></div>').join('');
 $('neighbors').innerHTML=p.nearest.slice(0,6).map((v,i)=>'<div class="neighbor"><b>#'+(i+1)+' '+M.labels[v.sample.label]+'</b>'+chart(v.sample.points,'邻居'+(i+1),true)+'<small>距离 '+v.distance.toFixed(3)+' · '+v.sample.id+'</small></div>').join('');
 const fmt=v=>(v*100).toFixed(1)+'%';
 $('stats').innerHTML='<div class="stat">近邻准确率<b>'+fmt(e.knnMetrics.accuracy)+'</b></div><div class="stat">近邻宏平均F1<b>'+e.knnMetrics.macroF1.toFixed(3)+'</b></div><div class="stat">基线准确率<b>'+fmt(e.baseMetrics.accuracy)+'</b></div>';
 $('matrix').innerHTML=matrix(e.knn);$('baseline').innerHTML=matrix(e.base);$('recall').textContent='近邻召回率：'+M.labels.map((s,i)=>s+' '+fmt(e.knnMetrics.recall[i])).join(' / ');

}
 ['condition','noise','k','truth'].forEach(id=>$(id).addEventListener('input',render));$('next').onclick=()=>{seed+=101;render();};$('reset').onclick=()=>{seed=700003;$('condition').value='0';$('noise').value='.03';$('k').value='5';$('truth').checked=true;render();};render();
})();

})({},localDocument,undefined);return {unmount:function(){root.replaceChildren();}};}};