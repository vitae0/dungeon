import {MeshBuilder,StandardMaterial,Color3,TransformNode,Vector3} from '@babylonjs/core';

export class WeaponViewSystem{
  constructor(scene,bus){this.scene=scene;this.bus=bus;this.root=null;this.weaponId=null;this.kick=0;this.swing=0;bus.on('weapon:fired',()=>this.kick=1);bus.on('weapon:melee',()=>this.swing=1)}
  mat(name,color,metal=.5){const m=new StandardMaterial(name,this.scene);m.diffuseColor=Color3.FromHexString(color);m.specularColor=new Color3(metal,metal,metal);return m}
  rebuild(player,w,rarityColor='#ffffff'){
    if(this.root)this.root.dispose(false,true);this.weaponId=w?.id||null;if(!w)return;
    const root=new TransformNode('held-weapon',this.scene);root.parent=player.node;root.position=new Vector3(.5,.92,.16);root.rotation.y=Math.PI;this.root=root;
    const dark=this.mat('weapon-dark','#222a34',.7),accent=this.mat('weapon-accent',rarityColor,.65);
    if(w.kind==='melee'){
      const grip=MeshBuilder.CreateCylinder('grip',{diameter:.09,height:.55,tessellation:8},this.scene);grip.parent=root;grip.rotation.x=Math.PI/2;grip.material=dark;
      const guard=MeshBuilder.CreateBox('guard',{width:.42,height:.07,depth:.08},this.scene);guard.parent=root;guard.position.z=-.28;guard.material=accent;
      if(w.id==='hammer'){const head=MeshBuilder.CreateBox('hammer-head',{width:.62,height:.32,depth:.34},this.scene);head.parent=root;head.position.z=-.7;head.material=dark}else{const len=w.id==='scythe'?1.5:1.2,blade=MeshBuilder.CreateBox('blade',{width:.09,height:.1,depth:len},this.scene);blade.parent=root;blade.position.z=-.35-len/2;blade.material=accent;if(w.id==='scythe'){blade.rotation.y=.35;blade.scaling.x=1.6}}
    }else{
      const body=MeshBuilder.CreateBox('gun-body',{width:.25,height:.22,depth:.86},this.scene);body.parent=root;body.position.z=-.36;body.material=dark;
      const barrel=MeshBuilder.CreateCylinder('barrel',{diameter:.08,height:.68,tessellation:8},this.scene);barrel.parent=root;barrel.position.z=-1.0;barrel.rotation.x=Math.PI/2;barrel.material=accent;
      const grip=MeshBuilder.CreateBox('gun-grip',{width:.13,height:.32,depth:.16},this.scene);grip.parent=root;grip.position.set(0,-.24,-.15);grip.rotation.x=-.18;grip.material=dark;
      const stock=MeshBuilder.CreateBox('stock',{width:.22,height:.21,depth:.38},this.scene);stock.parent=root;stock.position.z=.28;stock.material=dark;
      const sight=MeshBuilder.CreateBox('sight',{width:.12,height:.1,depth:.2},this.scene);sight.parent=root;sight.position.set(0,.17,-.42);sight.material=accent;
    }
  }
  update(dt,player,w,rarityColor){if(!w||this.weaponId!==w.id)this.rebuild(player,w,rarityColor);if(!this.root)return;this.kick=Math.max(0,this.kick-dt*9);this.swing=Math.max(0,this.swing-dt*4.8);this.root.position.z=.16+this.kick*.2;this.root.rotation.x=-this.kick*.08;if(this.swing>0){const p=1-this.swing;this.root.rotation.z=-.9+Math.sin(p*Math.PI)*1.9}else this.root.rotation.z*=Math.pow(.001,dt)}
  dispose(){this.root?.dispose(false,true);this.root=null}
}
