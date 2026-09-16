import {UniversalCamera,Vector3} from '@babylonjs/core';

export class CameraSystem{
  constructor(scene,input){this.input=input;this.camera=new UniversalCamera('third-person',new Vector3(0,4,-8),scene);this.camera.minZ=.1;this.camera.fov=.95;this.yaw=0;this.pitch=.12;this.locked=null;this.shake=0}
  update(dt,player,enemies){const m=this.input.consumeMouse();if(!this.input.mouse.right){this.yaw-=m.dx*.0022;this.pitch=Math.max(-.5,Math.min(.65,this.pitch-m.dy*.0019))}else{if(!this.locked||this.locked.dead||!this.visible(this.locked))this.locked=this.pickTarget(enemies);if(this.locked){const v=this.locked.node.position.subtract(player.node.position);this.yaw=Math.atan2(v.x,v.z);this.pitch=-Math.atan2(v.y+1.2,Math.max(.001,Math.hypot(v.x,v.z)))}}
    const flat=new Vector3(Math.sin(this.yaw),0,Math.cos(this.yaw));const right=new Vector3(-flat.z,0,flat.x);const dist=this.input.mouse.right?7:10;const target=player.node.position.add(new Vector3(0,1.25,0));let desired=target.subtract(flat.scale(dist)).add(new Vector3(0,this.input.mouse.right?2.8:3.7,0));if(this.input.mouse.right)desired=desired.add(right.scale(1.15));if(this.shake>0){desired=desired.add(new Vector3((Math.random()-.5)*this.shake,(Math.random()-.5)*this.shake*.6,(Math.random()-.5)*this.shake));this.shake*=Math.pow(.02,dt)}this.camera.position=Vector3.Lerp(this.camera.position,desired,1-Math.pow(.001,dt));const look=this.locked&&this.input.mouse.right?this.locked.node.position.add(new Vector3(0,1.2,0)):target.add(new Vector3(Math.sin(this.yaw)*Math.cos(this.pitch),-Math.sin(this.pitch),Math.cos(this.yaw)*Math.cos(this.pitch)).scale(20));this.camera.setTarget(look)}
  visible(enemy){const p=enemy.node.position;const dir=p.subtract(this.camera.position);return Vector3.Dot(dir.normalize(),this.camera.getForwardRay().direction)>.25}
  pickTarget(enemies){let best=null,score=Infinity;for(const e of enemies){if(e.dead)continue;const d=Vector3.Distance(this.camera.position,e.node.position);if(d>60||!this.visible(e))continue;if(d<score){score=d;best=e}}return best}
  forward(){return new Vector3(Math.sin(this.yaw),0,Math.cos(this.yaw)).normalize()}
  kick(amount=.08){this.shake=Math.max(this.shake,amount)}
}
