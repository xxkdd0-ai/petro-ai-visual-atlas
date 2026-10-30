(function(root){'use strict';
function rng(seed){return ()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};}
function features(q,c){const x=(q-8)/4,z=(c-300)/200;return [1,x,z,x*x,z*z,x*z];}
function truth(q,c){const [a,x,z]=features(q,c);return 100+22*x+18*z-18*x*x-15*z*z+8*x*z;}
function data(n,seed){const r=rng(seed);return Array.from({length:n},()=>{const q=4+8*r(),c=100+400*r();return {q,c,y:truth(q,c)+(r()+r()+r()-1.5)*5};});}
function fit(rows){const A=Array.from({length:6},()=>Array(7).fill(0));for(const row of rows){const f=features(row.q,row.c);for(let i=0;i<6;i++){for(let j=0;j<6;j++)A[i][j]+=f[i]*f[j];A[i][6]+=f[i]*row.y;}}for(let i=1;i<6;i++)A[i][i]+=.01;for(let k=0;k<6;k++){let p=k;for(let i=k+1;i<6;i++)if(Math.abs(A[i][k])>Math.abs(A[p][k]))p=i;[A[k],A[p]]=[A[p],A[k]];const v=A[k][k];for(let j=k;j<7;j++)A[k][j]/=v;for(let i=0;i<6;i++)if(i!==k){const t=A[i][k];for(let j=k;j<7;j++)A[i][j]-=t*A[k][j];}}return A.map(r=>r[6]);}
function predict(beta,q,c){return features(q,c).reduce((s,x,i)=>s+x*beta[i],0);}
function plan(beta,q,c){const fluid=q*60,sand=fluid*c/1000;return {q,c,fluid,sand,cost:20+.055*fluid+.18*sand,y:predict(beta,q,c)};}
function frontier(rows){return rows.filter(a=>!rows.some(b=>b.cost<=a.cost&&b.y>=a.y&&(b.cost<a.cost||b.y>a.y))).sort((a,b)=>a.cost-b.cost);}
function create(seed=42001){const train=data(180,seed),test=data(90,87001),beta=fit(train),grid=[];for(let q=4;q<=12;q+=.5)for(let c=100;c<=500;c+=25)grid.push(plan(beta,q,c));const mae=test.reduce((s,r)=>s+Math.abs(predict(beta,r.q,r.c)-r.y),0)/test.length;return {train,test,beta,grid,mae};}
function search(model,budget,sandCap){const engineering=model.grid.filter(p=>p.sand<=sandCap),feasible=engineering.filter(p=>p.cost<=budget),best=feasible.slice().sort((a,b)=>b.y-a.y||a.cost-b.cost)[0]||null;return {engineering,feasible,best,front:frontier(engineering)};}
const api={features,truth,data,fit,predict,plan,frontier,create,search};if(typeof module!=='undefined')module.exports=api;else root.FractureModel=api;
})(typeof window!=='undefined'?window:globalThis);
