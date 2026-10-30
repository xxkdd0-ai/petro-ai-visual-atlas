/* Teaching proxy: independent layers, stationary response, no reservoir flow solver. */
(function(root){'use strict';
const layers=[{name:'A层',cap:100,base:7,a:.30,b:.0016,cost:.06},{name:'B层',cap:120,base:9,a:.20,b:.00065,cost:.03},{name:'C层',cap:90,base:6,a:.36,b:.0022}];
layers[2].cost=.09;
function rng(seed){let s=seed>>>0;return()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return s/4294967296;};}
function truth(i,x){const l=layers[i];return l.base+l.a*x-l.b*x*x;}
function dataset(seed,n=48){if(!Number.isInteger(n)||n<3)throw Error('样本量不足');const random=rng(seed);return layers.map((l,i)=>Array.from({length:n},(_,j)=>{const x=j===0?0:j===1?l.cap:random()*l.cap;return {x,y:truth(i,x)+(random()-.5)*1.8};}));}
function solve(a,b){a=a.map((r,i)=>[...r,b[i]]);for(let i=0;i<3;i++){let pivot=i;for(let j=i+1;j<3;j++)if(Math.abs(a[j][i])>Math.abs(a[pivot][i]))pivot=j;[a[i],a[pivot]]=[a[pivot],a[i]];if(Math.abs(a[i][i])<1e-12)throw Error('奇异矩阵');const d=a[i][i];for(let k=i;k<4;k++)a[i][k]/=d;for(let j=0;j<3;j++)if(j!==i){const v=a[j][i];for(let k=i;k<4;k++)a[j][k]-=v*a[i][k];}}return a.map(r=>r[3]);}
function fit(rows){const a=Array.from({length:3},()=>[0,0,0]),b=[0,0,0];for(const p of rows){const z=p.x/120,x=[1,z,z*z];for(let j=0;j<3;j++){b[j]+=x[j]*p.y;for(let k=0;k<3;k++)a[j][k]+=x[j]*x[k];}}a[1][1]+=1e-6;a[2][2]+=1e-6;return {coef:solve(a,b)};}
function predict(model,x){const z=x/120;return model.coef[0]+model.coef[1]*z+model.coef[2]*z*z;}
function validate(models,data){return data.map((rows,i)=>Math.sqrt(rows.reduce((s,p)=>s+(predict(models[i],p.x)-p.y)**2,0)/rows.length));}
function feasible(q,budget){return q.length===3&&q.every((x,i)=>Number.isFinite(x)&&x>=0&&x<=layers[i].cap)&&q.reduce((s,x)=>s+x,0)<=budget+1e-8;}
function evaluate(models,q,budget,weight){const oil=q.reduce((s,x,i)=>s+predict(models[i],x),0),cost=q.reduce((s,x,i)=>s+layers[i].cost*x+.0003*x*x,0),water=q.reduce((s,x)=>s+x,0);return {q:q.slice(),oil,cost,water,objective:oil-weight*cost,valid:feasible(q,budget)};}
function optimize(models,budget,weight,step=5){if(!Number.isFinite(budget)||budget<0||!Number.isFinite(weight)||weight<0||!Number.isFinite(step)||step<=0)throw Error('无效约束');let best=null,count=0,grid=[];for(let a=0;a<=Math.min(layers[0].cap,budget);a+=step)for(let b=0;b<=Math.min(layers[1].cap,budget-a);b+=step){let cell=null;for(let c=0;c<=Math.min(layers[2].cap,budget-a-b)+1e-8;c+=step){const v=evaluate(models,[a,b,c],budget,weight);count++;if(!cell||v.objective>cell.objective+1e-10)cell=v;if(!best||v.objective>best.objective+1e-10)best=v;}grid.push(cell);}return {best,count,grid,step};}
function run(seed=2026,budget=180,weight=1){const train=dataset(seed,48),test=dataset(seed+90001,24),models=train.map(fit),search=optimize(models,budget,weight),equal=evaluate(models,layers.map(l=>Math.min(l.cap,budget/3)),budget,weight);return {train,test,models,rmse:validate(models,test),search,equal};}
const api={layers,rng,truth,dataset,fit,predict,validate,feasible,evaluate,optimize,run};if(typeof module!=='undefined')module.exports=api;else root.InjectionModel=api;
})(typeof window!=='undefined'?window:globalThis);
