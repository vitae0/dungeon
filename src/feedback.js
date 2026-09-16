const overlay=document.getElementById('combat-feedback')||(()=>{const el=document.createElement('div');el.id='combat-feedback';el.innerHTML='<div class="muzzle"></div><div class="slash"></div><div class="attack-pulse"></div><div class="attack-label"></div>';document.body.appendChild(el);return el})();

let audioCtx=null;
function audio(){if(!audioCtx)audioCtx=new (window.AudioContext||window.webkitAudioContext)();return audioCtx}
function tone(freq,dur=.05,type='square',gain=.025,slide=0,delay=0){
  try{const c=audio(),o=c.createOscillator(),g=c.createGain(),t=c.currentTime+delay;o.type=type;o.frequency.setValueAtTime(freq,t);if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(40,freq+slide),t+dur);g.gain.setValueAtTime(gain,t);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+dur)}catch{}
}
function shotSound(){tone(230,.026,'square',.035,-120);tone(78,.048,'triangle',.021,-25,.004)}
function meleeSound(){tone(175,.07,'sawtooth',.03,-85);tone(95,.055,'triangle',.018,-38,.025)}
function reloadSound(){tone(520,.025,'square',.018,-180);tone(280,.035,'square',.016,-90,.055);tone(760,.022,'triangle',.014,-240,.12);tone(410,.03,'square',.012,-120,.19)}

let previousAmmo=null;
let wasReloading=false;
let previousMelee=false;
setInterval(()=>{
  const span=document.querySelector('.weaponinfo span');
  const text=span?.textContent?.trim()||'';
  const reloading=/RELOADING/i.test(text);
  const melee=/MELEE/i.test(text);
  const m=text.match(/^(\d+)\/(\d+)$/);

  if(m){
    const ammo=Number(m[1]);
    if(previousAmmo!==null && ammo<previousAmmo && !reloading){
      const shots=Math.min(8,previousAmmo-ammo);
      for(let i=0;i<shots;i++)setTimeout(shotSound,i*7);
    }
    previousAmmo=ammo;
  }else if(!reloading){
    previousAmmo=null;
  }

  if(reloading&&!wasReloading)reloadSound();
  wasReloading=reloading;

  const swinging=overlay.classList.contains('melee-swing');
  if(swinging&&!previousMelee)meleeSound();
  previousMelee=swinging;
},12);
