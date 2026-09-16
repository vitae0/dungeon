export class InputSystem {
  constructor(canvas){this.canvas=canvas;this.keys=new Set();this.mouse={left:false,right:false,dx:0,dy:0};this.bound=[]}
  start(){
    const on=(t,n,f,o)=>{t.addEventListener(n,f,o);this.bound.push(()=>t.removeEventListener(n,f,o))};
    on(window,'keydown',e=>this.keys.add(e.code));on(window,'keyup',e=>this.keys.delete(e.code));
    on(this.canvas,'mousedown',e=>{if(e.button===0)this.mouse.left=true;if(e.button===2)this.mouse.right=true;if(document.pointerLockElement!==this.canvas)this.canvas.requestPointerLock?.()});
    on(window,'mouseup',e=>{if(e.button===0)this.mouse.left=false;if(e.button===2)this.mouse.right=false});
    on(window,'mousemove',e=>{if(document.pointerLockElement===this.canvas){this.mouse.dx+=e.movementX;this.mouse.dy+=e.movementY}});
    this.canvas.oncontextmenu=e=>e.preventDefault();
  }
  down(code){return this.keys.has(code)}
  consumeMouse(){const d={dx:this.mouse.dx,dy:this.mouse.dy};this.mouse.dx=this.mouse.dy=0;return d}
  dispose(){for(const fn of this.bound)fn();this.bound=[]}
}
