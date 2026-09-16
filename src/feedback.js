const hud=document.getElementById('hud');
const game=document.getElementById('game');
const overlay=document.createElement('div');
overlay.id='combat-feedback';
overlay.innerHTML='<div class="muzzle"></div><div class="slash"></div><div class="attack-pulse"></div><div class="attack-label"></div>';
document.body.appendChild(overlay);

let audioCtx=null;
function audio(){if(!audioCtx)audioCtx=new (window.AudioContext||window.webkitAudioContext)();return audioCtx}
function tone(freq,dur=.05,type='square',gain=.025,slide=0){
  try{const c=audio(),o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(freq,c.currentTime);if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(40,freq+slide),c.currentTime+dur);g.gain.setValueAtTime(gain,c.currentTime);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+dur);o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+dur)}catch{}
}
function weaponInfo(){
  const el=document.querySelector('.weaponinfo');
  const text=el?.innerText||'';
  return {melee:/MELEE/i.test(text),reloading:/RELOADING/i.test(text),text};
}
function flashLabel(text,kind='shot'){
  const el=overlay.querySelector('.attack-label');
  el.textContent=text;el.className='attack-label show '+kind;
  clearTimeout(el._t);el._t=setTimeout(()=>el.className='attack-label',120);
}
function pulseClass(cls,ms=90){overlay.classList.remove(cls);void overlay.offsetWidth;overlay.classList.add(cls);clearTimeout(overlay['_'+cls]);overlay['_'+cls]=setTimeout(()=>overlay.classList.remove(cls),ms)}

addEventListener('mousedown',e=>{
  if(e.button!==0)return;
  if(document.getElementById('modal')?.classList.contains('show'))return;
  const w=weaponInfo();
  if(w.melee){
    pulseClass('melee-swing',170);
    tone(150,.07,'sawtooth',.035,-70);
    setTimeout(()=>tone(90,.06,'triangle',.02,-35),28);
    flashLabel('SWING','melee');
  }else if(w.reloading){
    pulseClass('dry-fire',90);tone(110,.035,'square',.015,-30);flashLabel('RELOAD','dry');
  }else{
    pulseClass('gun-fire',85);
    tone(185,.035,'square',.04,-90);
    tone(62,.055,'triangle',.022,-15);
    flashLabel('FIRE','shot');
  }
});

let lastAmmo='';
setInterval(()=>{
  const t=document.querySelector('.weaponinfo span')?.textContent||'';
  if(lastAmmo&&/^\d+\/\d+$/.test(lastAmmo)&&/^\d+\/\d+$/.test(t)){
    const a=parseInt(lastAmmo),b=parseInt(t);
    if(b<a) pulseClass('confirmed-shot',70);
  }
  lastAmmo=t;
},40);
