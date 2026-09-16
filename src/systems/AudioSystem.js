export class AudioSystem{
  constructor(bus){this.bus=bus;this.ctx=null;this.enabled=true;const unlock=()=>{try{this.audio().resume()}catch{}};window.addEventListener('pointerdown',unlock,{once:true});
    bus.on('weapon:fired',({weapon})=>this.shot(weapon));bus.on('weapon:reload',()=>this.reload());bus.on('weapon:melee',({hit})=>this.melee(hit));bus.on('enemy:hit',({crit})=>this.hit(crit));bus.on('player:hit',()=>this.playerHit());bus.on('enemy:alerted',()=>this.alert())}
  audio(){if(!this.ctx)this.ctx=new (window.AudioContext||window.webkitAudioContext)();return this.ctx}
  tone(freq,dur=.05,type='square',gain=.02,slide=0,delay=0){if(!this.enabled)return;try{const c=this.audio(),o=c.createOscillator(),g=c.createGain(),t=c.currentTime+delay;o.type=type;o.frequency.setValueAtTime(freq,t);if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(35,freq+slide),t+dur);g.gain.setValueAtTime(gain,t);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+dur)}catch{}}
  shot(w){const heavy=(w.damage||0)>80;this.tone(heavy?120:205,heavy?.06:.035,'square',heavy?.045:.027,heavy?-55:-100);this.tone(heavy?52:72,.07,'triangle',heavy?.03:.017,-18,.004)}
  reload(){this.tone(520,.025,'square',.014,-170);this.tone(300,.03,'square',.013,-80,.055);this.tone(760,.02,'triangle',.012,-230,.13);this.tone(430,.028,'square',.012,-120,.2)}
  melee(hit){this.tone(hit?155:190,.075,'sawtooth',.025,-90);this.tone(hit?72:100,.05,'triangle',.015,-35,.022)}
  hit(crit){this.tone(crit?920:640,.025,'square',crit?.022:.013,-280);if(crit)this.tone(1180,.018,'triangle',.012,-340,.015)}
  playerHit(){this.tone(82,.11,'sawtooth',.035,-35);this.tone(45,.15,'triangle',.028,-8,.01)}
  alert(){this.tone(360,.035,'triangle',.006,90);this.tone(470,.03,'triangle',.005,80,.04)}
}
