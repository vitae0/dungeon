const overlay=document.getElementById('combat-feedback')||(()=>{const el=document.createElement('div');el.id='combat-feedback';el.innerHTML='<div class="muzzle"></div><div class="slash"></div><div class="attack-pulse"></div><div class="attack-label"></div>';document.body.appendChild(el);return el})();

let audioCtx=null;
function audio(){if(!audioCtx)audioCtx=new (window.AudioContext||window.webkitAudioContext)();return audioCtx}
function tone(freq,dur=.05,type='square',gain=.025,slide=0,delay=0){
  try{const c=audio(),o=c.createOscillator(),g=c.createGain(),t=c.currentTime+delay;o.type=type;o.frequency.setValueAtTime(freq,t);if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(40,freq+slide),t+dur);g.gain.setValueAtTime(gain,t);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+dur)}catch{}
}
function shotSound(){tone(210,.035,'square',.035,-105);tone(72,.06,'triangle',.022,-22,.006)}
function meleeSound(){tone(175,.07,'sawtooth',.03,-85);tone(95,.055,'triangle',.018,-38,.025)}
function reloadSound(){
  tone(520,.025,'square',.018,-180);
  tone(280,.035,'square',.016,-90,.055);
  tone(760,.022,'triangle',.014,-240,.12);
  tone(410,.03,'square',.012,-120,.19);
}

let lastClass='';
const observer=new MutationObserver(()=>{
  const now=overlay.className;
  if(now===lastClass)return;
  if(overlay.classList.contains('gun-fire')&&!lastClass.includes('gun-fire'))shotSound();
  if(overlay.classList.contains('melee-swing')&&!lastClass.includes('melee-swing'))meleeSound();
  lastClass=now;
});
observer.observe(overlay,{attributes:true,attributeFilter:['class']});

let wasReloading=false;
setInterval(()=>{
  const text=document.querySelector('.weaponinfo span')?.textContent?.trim()||'';
  const reloading=/RELOADING/i.test(text);
  if(reloading&&!wasReloading)reloadSound();
  wasReloading=reloading;
},35);
