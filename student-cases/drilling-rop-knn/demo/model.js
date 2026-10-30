(function(root){'use strict';
function rng(seed){return ()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};}
function truth(w,r,h){const x=(w-120)/60,z=(r-120)/60;return (h?30:42)+(h?10:15)*x+(h?7:12)*z-8*x*x-6*z*z+3*x*z;}
function data(n,seed){const random=rng(seed);return Array.from({length:n},(_,i)=>{const h=i%2,w=60+120*random(),r=60+120*random();return {h,w,r,y:truth(w,r,h)+(random()+random()+random()-1.5)*4};});}
function predict(train,w,r,h,k=12){const neighbors=train.filter(v=>v.h===h).map(v=>({...v,d:Math.hypot((v.w-w)/120,(v.r-r)/120)})).sort((a,b)=>a.d-b.d).slice(0,k);let sum=0,total=0;for(const v of neighbors){const weight=1/(v.d+.03);sum+=v.y*weight;total+=weight;}return {y:sum/total,neighbors,radius:neighbors[neighbors.length-1].d};}
function torque(w,r,h){return (3+.045*w+.012*r)*(1+.4*h);}
function create(seed=30501,k=12){const train=data(320,seed),test=data(160,80501),means=[0,1].map(h=>{const a=train.filter(v=>v.h===h);return a.reduce((s,v)=>s+v.y,0)/a.length;});let mae=0,baseline=0;const predictions=test.map(v=>{const y=predict(train,v.w,v.r,v.h,k).y;mae+=Math.abs(y-v.y)/test.length;baseline+=Math.abs(means[v.h]-v.y)/test.length;return {...v,pred:y};});return {train,test,means,mae,baseline,predictions,k};}
function plan(model,w,r,h){const v=predict(model.train,w,r,h,model.k);return {w,r,h,...v,torque:torque(w,r,h),hours:30/v.y};}
function search(model,h,cap){const grid=[];for(let w=60;w<=180;w+=10)for(let r=60;r<=180;r+=10)grid.push(plan(model,w,r,h));const feasible=grid.filter(v=>v.torque<=cap);return {grid,feasible,best:feasible.slice().sort((a,b)=>b.y-a.y||a.torque-b.torque)[0]||null};}
const api={rng,truth,data,predict,torque,create,plan,search};if(typeof module!=='undefined')module.exports=api;else root.DrillingModel=api;
})(typeof window!=='undefined'?window:globalThis);

