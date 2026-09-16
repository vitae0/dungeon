import {MeshBuilder,StandardMaterial,Color3,TransformNode,Vector3} from '@babylonjs/core';

const mat=(scene,name,color,emissive=null)=>{const m=new StandardMaterial(name,scene);m.diffuseColor=Color3.FromHexString(color);m.specularColor=new Color3(.1,.1,.1);if(emissive)m.emissiveColor=Color3.FromHexString(emissive);return m};
const parent=(mesh,root,pos=null)=>{mesh.parent=root;if(pos)mesh.position.copyFrom(pos);return mesh};

export class EntityFactory{
  constructor(scene){this.scene=scene;this.materials={dark:mat(scene,'dark','#0b0e13'),cloth:mat(scene,'cloth','#1b222c'),cloth2:mat(scene,'cloth2','#252e39'),leather:mat(scene,'leather','#302b29'),metal:mat(scene,'metal','#566575'),void:mat(scene,'void','#030405'),boot:mat(scene,'boot','#111318')}}
  createPlayer(classDef){
    const root=new TransformNode('player',this.scene),accent=mat(this.scene,'class-accent','#'+classDef.color.toString(16).padStart(6,'0'));
    const coat=parent(MeshBuilder.CreateCapsule('coat',{radius:.34,height:1.25,tessellation:12},this.scene),root,new Vector3(0,1.28,0));coat.scaling=new Vector3(1.08,1,.82);coat.material=this.materials.cloth;
    const chest=parent(MeshBuilder.CreateBox('chest-panel',{width:.62,height:.46,depth:.2},this.scene),root,new Vector3(0,1.38,.25));chest.material=this.materials.cloth2;
    const sash=parent(MeshBuilder.CreateBox('sash',{width:.72,height:.1,depth:.08},this.scene),root,new Vector3(0,1.2,.37));sash.rotation.z=-.3;sash.material=accent;
    const neck=parent(MeshBuilder.CreateCylinder('neck',{diameter:.22,height:.22,tessellation:10},this.scene),root,new Vector3(0,1.89,0));neck.material=this.materials.void;
    const face=parent(MeshBuilder.CreateSphere('shadowed-face',{diameter:.5,segments:14},this.scene),root,new Vector3(0,2.12,.04));face.scaling=new Vector3(.86,1,.78);face.material=this.materials.void;
    const hoodBack=parent(MeshBuilder.CreateSphere('soft-hood-back',{diameter:.84,segments:14},this.scene),root,new Vector3(0,2.2,-.11));hoodBack.scaling=new Vector3(1,.98,.82);hoodBack.material=this.materials.dark;
    const hoodTop=parent(MeshBuilder.CreateSphere('soft-hood-top',{diameter:.72,segments:12},this.scene),root,new Vector3(0,2.38,-.03));hoodTop.scaling=new Vector3(.9,.58,.92);hoodTop.material=this.materials.dark;
    const brim=parent(MeshBuilder.CreateTorus('hood-brim',{diameter:.64,thickness:.08,tessellation:20},this.scene),root,new Vector3(0,2.14,.18));brim.rotation.x=Math.PI/2;brim.scaling.z=.75;brim.material=this.materials.dark;
    const cowl=parent(MeshBuilder.CreateTorus('cowl',{diameter:.84,thickness:.2,tessellation:18},this.scene),root,new Vector3(0,1.85,-.02));cowl.rotation.x=Math.PI/2;cowl.scaling=new Vector3(1.2,1,.72);cowl.material=this.materials.cloth2;
    for(const sx of [-1,1]){
      const shoulder=parent(MeshBuilder.CreateSphere('shoulder',{diameter:.3,segments:10},this.scene),root,new Vector3(.45*sx,1.58,0));shoulder.scaling=new Vector3(1,.7,.95);shoulder.material=this.materials.cloth;
      const upper=parent(MeshBuilder.CreateCapsule('upper-arm',{radius:.085,height:.46,tessellation:8},this.scene),root,new Vector3(.48*sx,1.28,.01));upper.material=this.materials.cloth;
      const fore=parent(MeshBuilder.CreateCapsule('forearm',{radius:.078,height:.38,tessellation:8},this.scene),root,new Vector3(.49*sx,.91,.03));fore.material=this.materials.leather;
      const hand=parent(MeshBuilder.CreateSphere('glove',{diameter:.18,segments:8},this.scene),root,new Vector3(.49*sx,.68,.05));hand.material=this.materials.dark;
      const thigh=parent(MeshBuilder.CreateCapsule('thigh',{radius:.12,height:.5,tessellation:8},this.scene),root,new Vector3(.2*sx,.53,0));thigh.material=this.materials.cloth2;
      const shin=parent(MeshBuilder.CreateCapsule('shin',{radius:.1,height:.4,tessellation:8},this.scene),root,new Vector3(.2*sx,.18,.02));shin.material=this.materials.leather;
      const boot=parent(MeshBuilder.CreateBox('boot',{width:.26,height:.16,depth:.42},this.scene),root,new Vector3(.2*sx,.06,.09));boot.material=this.materials.boot;
      const tail=parent(MeshBuilder.CreateBox('coat-tail',{width:.31,height:.78,depth:.055},this.scene),root,new Vector3(.18*sx,.72,-.34));tail.rotation.x=.14;tail.rotation.z=sx*.06;tail.material=this.materials.cloth;
    }
    const belt=parent(MeshBuilder.CreateTorus('belt',{diameter:.65,thickness:.055,tessellation:18},this.scene),root,new Vector3(0,.96,0));belt.rotation.x=Math.PI/2;belt.material=this.materials.leather;
    const buckle=parent(MeshBuilder.CreateBox('buckle',{width:.14,height:.12,depth:.06},this.scene),root,new Vector3(0,.96,.34));buckle.material=this.materials.metal;
    root.metadata={type:'player'};return root;
  }
  createEnemy(def,boss=false){
    const root=new TransformNode('enemy',this.scene),baseHex='#'+def.color.toString(16).padStart(6,'0'),main=mat(this.scene,'enemy-mat-'+Math.random(),baseHex),dark=mat(this.scene,'enemy-dark-'+Math.random(),'#252c36');
    const scale=boss?1.8:1, body=MeshBuilder.CreateCapsule('body',{radius:.48*scale,height:1.35*scale,tessellation:10},this.scene);body.parent=root;body.position.y=.9*scale;body.material=main;
    const chest=MeshBuilder.CreateBox('enemy-chest',{width:.72*scale,height:.28*scale,depth:.44*scale},this.scene);chest.parent=root;chest.position.set(0,1.08*scale,.08);chest.material=dark;
    const head=MeshBuilder.CreateSphere('head',{diameter:.72*scale,segments:12},this.scene);head.parent=root;head.position.y=1.75*scale;head.material=main;
    for(const sx of [-1,1]){const eye=MeshBuilder.CreateSphere('eye',{diameter:.11*scale,segments:6},this.scene);eye.parent=root;eye.position.set(.14*scale*sx,1.8*scale,.34*scale);eye.material=mat(this.scene,'eye-'+Math.random(),'#d9f1ff','#d9f1ff');const arm=MeshBuilder.CreateCapsule('arm',{radius:.08*scale,height:.6*scale,tessellation:6},this.scene);arm.parent=root;arm.position.set(.48*scale*sx,.9*scale,0);arm.material=dark;const leg=MeshBuilder.CreateCapsule('leg',{radius:.1*scale,height:.62*scale,tessellation:6},this.scene);leg.parent=root;leg.position.set(.22*scale*sx,.3*scale,0);leg.material=dark}
    if(boss){const crown=MeshBuilder.CreateTorus('boss-crown',{diameter:1.05*scale,thickness:.08*scale,tessellation:20},this.scene);crown.parent=root;crown.position.y=2.18*scale;crown.rotation.x=Math.PI/2;crown.material=dark}
    root.metadata={type:'enemy',def,boss,baseColor:baseHex,flashMaterials:[main]};return root;
  }
  createProjectile(color='#ffffff',radius=.09){const m=MeshBuilder.CreateSphere('projectile',{diameter:radius*2,segments:7},this.scene);m.material=mat(this.scene,'p-'+Math.random(),color,color);return m}
  createHealthPickup(){const root=new TransformNode('health',this.scene),m=mat(this.scene,'health-mat','#39ff88','#39ff88');const a=MeshBuilder.CreateBox('health-a',{width:.22,height:.7,depth:.16},this.scene),b=MeshBuilder.CreateBox('health-b',{width:.7,height:.22,depth:.16},this.scene);a.parent=b.parent=root;a.material=b.material=m;root.metadata={type:'health'};return root}
}
