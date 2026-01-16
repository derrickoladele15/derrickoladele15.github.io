// Subtle interactive background particles
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let w,h,particles;
function resize(){ w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight; }
window.addEventListener('resize', resize); resize();

function init(){
  particles = Array.from({length: 60}, () => ({
    x: Math.random()*w, y: Math.random()*h,
    vx: (Math.random()-.5)*0.4, vy: (Math.random()-.5)*0.4,
    r: 1+Math.random()*2
  }));
}
init();

function step(){
  ctx.clearRect(0,0,w,h);
  for (const p of particles){
    p.x += p.vx; p.y += p.vy;
    if(p.x<0||p.x>w) p.vx*=-1;
    if(p.y<0||p.y>h) p.vy*=-1;
  }
  // draw links
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const a=particles[i], b=particles[j];
      const dx=a.x-b.x, dy=a.y-b.y, d=Math.hypot(dx,dy);
      if(d<140){
        ctx.strokeStyle = 'rgba(34,211,238,'+(1-d/140)*.25+')';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
      }
    }
  }
  // draw dots
  for (const p of particles){
    ctx.fillStyle = 'rgba(96,165,250,.9)';
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
  }
  requestAnimationFrame(step);
}
step();
