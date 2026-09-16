import {MeshBuilder,StandardMaterial,Color3,TransformNode,Vector3} from '@babylonjs/core';

const mat=(scene,name,color,emissive=null)=>{const m=new StandardMaterial(name,scene);m.diffuseColor=Color3.FromHexString(color);m.specularColor=new Color3(.12,.12,.12);if(emissive)m.emissiveColor=Color3.FromHexString(emissive);return m};

export class EntityFactory{
  constructor(scene){this.scene=scene;this.materials={dark:mat(scene,'dark','#0a0d12'),cloth:mat(scene,'cloth','#171d26'),metal:mat(scene,'metal','#536170'),skinless:mat(scene,'void','#020304')}}
  createPlayer(classDef){
    const root=new TransformNode('player',this.scene), cloth=mat(this.scene,'class-cloth','#'+classDef.color.toString(16).padStart(6,'0'));
    const body=MeshBuilder.CreateCapsule('torso',{radius:.34,height:1.28,tessellation:10},this.scene);body.parent=root;body.position.y=1.3;body.scaling=new Vector3(1.12,1,.8);body.material=cloth;
    const voidFace=MeshBuilder.CreateSphere('void-face',{diameter:.58,segments:12},this.scene);voidFace.parent=root;voidFace.position.set(0,2.08,.02);voidFace.material=this.materials.skinless;
    const hood=MeshBuilder.CreateCylinder('hood',{diameterTop:.08,diameterBottom:1.02,height:.88,tessellation:12},this.scene);hood.parent=root;hood.position.set(0,2.35,-.08);hood.material=this.materials.dark;
    const cowl=MeshBuilder.CreateCylinder('cowl',{diameterTop:.72,diameterBottom:1.12,height:.42,tessellation:12},this.scene);cowl.parent=root;cowl.position.set(0,1.82,-.02);cowl.material=this.materials.cloth;
    for(const sx of [-1,1]){const arm=MeshBuilder.CreateCapsule('arm',{radius:.095,height:.76,tessellation:8},this.scene);arm.parent=root;arm.position.set(.48*sx,1.28,0);arm.material=cloth;const leg=MeshBuilder.CreateCapsule('leg',{radius:.13,height:.9,tessellation:8},this.scene);leg.parent=root;leg.position.set(.2*sx,.48,0);leg.material=this.materials.cloth}
    for(const sx of [-1,1]){const tail=MeshBuilder.CreateBox('cloak-tail',{width:.34,height:.95,depth:.06},this.scene);tail.parent=root;tail.position.set(.2*sx,.72,-.35);tail.rotation.x=.18;tail.rotation.z=sx*.08;tail.material=this.materials.dark}
    root.metadata={type:'player'};return root;
  }
  createEnemy(def,boss=false){
    const root=new TransformNode('enemy',this.scene), main=mat(this.scene,'enemy-mat-'+Math.random(), '#'+def.color.toString(16).padStart(6,'0'));
    const scale=boss?1.8:1, body=MeshBuilder.CreateCapsule('body',{radius:.48*scale,height:1.35*scale,tessellation:8},this.scene);body.parent=root;body.position.y=.9*scale;body.material=main;
    const head=MeshBuilder.CreateSphere('head',{diameter:.72*scale,segments:10},this.scene);head.parent=root;head.position.y=1.75*scale;head.material=main;
    for(const sx of [-1,1]){const eye=MeshBuilder.CreateSphere('eye',{diameter:.12*scale,segments:6},this.scene);eye.parent=root;eye.position.set(.14*scale*sx,1.8*scale,.34*scale);eye.material=mat(this.scene,'eye-'+Math.random(),'#ffffff','#ffffff');const limb=MeshBuilder.CreateCapsule('limb',{radius:.08*scale,height:.62*scale,tessellation:6},this.scene);limb.parent=root;limb.position.set(.48*scale*sx,.9*scale,0);limb.material=this.materials.metal}
    root.metadata={type:'enemy',def,boss};return root;
  }
  createProjectile(color='#ffffff',radius=.09){const m=MeshBuilder.CreateSphere('projectile',{diameter:radius*2,segments:6},this.scene);m.material=mat(this.scene,'p-'+Math.random(),color,color);return m}
  createHealthPickup(){const root=new TransformNode('health',this.scene),m=mat(this.scene,'health-mat','#39ff88','#39ff88');const a=MeshBuilder.CreateBox('health-a',{width:.22,height:.7,depth:.16},this.scene),b=MeshBuilder.CreateBox('health-b',{width:.7,height:.22,depth:.16},this.scene);a.parent=b.parent=root;a.material=b.material=m;root.metadata={type:'health'};return root}
}
