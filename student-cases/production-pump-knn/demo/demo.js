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
