import {UniversalCamera,Vector3} from '@babylonjs/core';

const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

export class CameraSystem{
  constructor(scene,input){
    this.scene=scene;
    this.input=input;
    this.camera=new UniversalCamera('third-person',new Vector3(0,4,-9),scene);
    scene.activeCamera=this.camera;
    this.camera.inputs.clear();
    this.camera.minZ=.08;
    this.camera.maxZ=1200;
    this.camera.fov=.92;
    this.yaw=0;
    this.pitch=.08;
    this.locked=null;
    this.shake=0;
    this.distance=10;
    this.height=2.5;
    this.initialized=false;
  }

  snapToPlayer(player){
    if(!player?.node)return;
    const target=player.node.position.add(new Vector3(0,1.32,0));
    const flat=new Vector3(Math.sin(this.yaw),0,Math.cos(this.yaw));
    this.camera.position.copyFrom(target.subtract(flat.scale(this.distance)).add(new Vector3(0,this.height,0)));
    const dir=this.viewDirection();
    this.camera.setTarget(target.add(dir.scale(30)));
    this.initialized=true;
  }

  update(dt,player,enemies=[]){
    if(!player?.node)return;
    if(!this.initialized)this.snapToPlayer(player);

    const m=this.input.consumeMouse();
    const locking=this.input.mouse.right;
    if(!locking){
      this.locked=null;
      this.yaw-=m.dx*.00235;
      this.pitch=clamp(this.pitch-m.dy*.00205,-.52,.62);
    }else{
      if(!this.locked||this.locked.dead||!this.visible(this.locked))this.locked=this.pickTarget(enemies);
      if(this.locked){
        const eye=player.node.position.add(new Vector3(0,1.35,0));
        const aim=this.locked.node.position.add(new Vector3(0,this.locked.boss?1.8:1.05,0));
        const v=aim.subtract(eye);
        this.yaw=Math.atan2(v.x,v.z);
        this.pitch=Math.atan2(v.y,Math.max(.001,Math.hypot(v.x,v.z)));
      }
    }

    const target=player.node.position.add(new Vector3(0,1.32,0));
    const flat=new Vector3(Math.sin(this.yaw),0,Math.cos(this.yaw));
    const right=new Vector3(flat.z,0,-flat.x);
    let desired=target.subtract(flat.scale(locking?7.2:this.distance)).add(new Vector3(0,locking?2.35:this.height,0));
    if(locking)desired.addInPlace(right.scale(1.0));

    if(this.shake>.001){
      desired.addInPlace(new Vector3((Math.random()-.5)*this.shake,(Math.random()-.5)*this.shake*.55,(Math.random()-.5)*this.shake));
      this.shake*=Math.pow(.018,dt);
      if(this.shake<.002)this.shake=0;
    }

    const follow=1-Math.pow(.00045,dt);
    this.camera.position.copyFrom(Vector3.Lerp(this.camera.position,desired,follow));
    const look=locking&&this.locked
      ? this.locked.node.position.add(new Vector3(0,this.locked.boss?1.8:1.05,0))
      : target.add(this.viewDirection().scale(30));
    this.camera.setTarget(look);
  }

  viewDirection(){
    return new Vector3(
      Math.sin(this.yaw)*Math.cos(this.pitch),
      Math.sin(this.pitch),
      Math.cos(this.yaw)*Math.cos(this.pitch)
    ).normalize();
  }

  visible(enemy){
    if(!enemy||enemy.dead)return false;
    const aim=enemy.node.position.add(new Vector3(0,enemy.boss?1.8:1.05,0));
    const to=aim.subtract(this.camera.position),d=to.length();
    if(d>80||d<.001)return false;
    return Vector3.Dot(to.scale(1/d),this.viewDirection())>.28;
  }

  pickTarget(enemies){
    let best=null,bestScore=Infinity;
    const forward=this.viewDirection();
    for(const e of enemies){
      if(e.dead)continue;
      const aim=e.node.position.add(new Vector3(0,e.boss?1.8:1.05,0));
      const to=aim.subtract(this.camera.position),d=to.length();
      if(d>80||d<.001)continue;
      const dir=to.scale(1/d),dot=Vector3.Dot(dir,forward);
      if(dot<.28)continue;
      const score=(1-dot)*45+d*.18;
      if(score<bestScore){bestScore=score;best=e}
    }
    return best;
  }

  forward(){return new Vector3(Math.sin(this.yaw),0,Math.cos(this.yaw)).normalize()}
  kick(amount=.08){this.shake=Math.max(this.shake,amount)}
}
