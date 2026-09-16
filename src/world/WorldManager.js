import {MeshBuilder,StandardMaterial,Color3,Vector3} from '@babylonjs/core';

export class WorldManager{
  constructor(scene){this.scene=scene;this.size=320;this.bounds=this.size/2;this.meshes=[];this.obstacles=[]}
  material(name,color,emissive=null){const m=new StandardMaterial(name,this.scene);m.diffuseColor=Color3.FromHexString(color);m.specularColor=new Color3(.05,.05,.05);if(emissive)m.emissiveColor=Color3.FromHexString(emissive);return m}
  clear(){for(const m of this.meshes)m.dispose();this.meshes=[];this.obstacles=[]}
  build(room=0,floor=1){
    this.clear();this.size=320+Math.min(180,floor*18);this.bounds=this.size/2;
    const fm=this.material('floor','#263447'),wm=this.material('wall','#374557'),tm=this.material('trim','#607189'),accent=this.material('accent','#2b536d','#163246');
    const floorMesh=MeshBuilder.CreateGround('floor',{width:this.size,height:this.size,subdivisions:4},this.scene);floorMesh.material=fm;floorMesh.receiveShadows=true;this.meshes.push(floorMesh);
    const addWall=(x,z,w,d,h=8)=>{const wall=MeshBuilder.CreateBox('wall',{width:w,depth:d,height:h},this.scene);wall.position.set(x,h/2,z);wall.material=wm;wall.checkCollisions=true;this.meshes.push(wall);this.obstacles.push({x,z,w,d,h});const trim=MeshBuilder.CreateBox('trim',{width:w+.08,depth:d+.08,height:.18},this.scene);trim.position.set(x,.11,z);trim.material=tm;this.meshes.push(trim);return wall};
    const addPillar=(x,z,r=2.6,h=10)=>{const p=MeshBuilder.CreateCylinder('pillar',{diameter:r*2,height:h,tessellation:12},this.scene);p.position.set(x,h/2,z);p.material=wm;p.checkCollisions=true;this.meshes.push(p);this.obstacles.push({x,z,w:r*2,d:r*2,h});const ring=MeshBuilder.CreateTorus('pillar-ring',{diameter:r*2.25,thickness:.25,tessellation:16},this.scene);ring.position.set(x,1,z);ring.rotation.x=Math.PI/2;ring.material=accent;this.meshes.push(ring)};
    const b=this.bounds;addWall(0,b,this.size,2,10);addWall(-b,0,2,this.size,10);addWall(b,0,2,this.size,10);addWall(-b*.69,-b,this.size*.29,2,10);addWall(b*.69,-b,this.size*.29,2,10);
    const v=room%6;
    if(v===0){for(const x of [-70,-35,35,70])for(const z of [-58,0,58])addPillar(x,z,2.8,11);}
    if(v===1){for(const x of [-72,72]){addWall(x,0,4,110,8);for(const z of [-48,0,48])addPillar(x*.48,z,2.5,9)}}
    if(v===2){for(const z of [-62,62]){addWall(0,z,105,4,8);for(const x of [-52,0,52])addPillar(x,z*.48,2.8,10)}}
    if(v===3){for(const x of [-80,-40,0,40,80])addWall(x,(Math.abs(x/40)%2?26:-26),18,5,5);for(const z of [-76,76])addPillar(-52,z,3,12),addPillar(52,z,3,12)}
    if(v===4){for(let i=0;i<14;i++){const a=i*Math.PI*2/14,r=62+(i%2)*24;addPillar(Math.cos(a)*r,Math.sin(a)*r,2.4+(i%3)*.35,9+(i%2)*2)}}
    if(v===5){for(const x of [-82,-28,28,82])for(const z of [-72,0,72])if(Math.abs(x)+Math.abs(z)>40)addWall(x,z,16,4,5);addWall(0,0,4,72,7)}
    for(const x of [-b+14,b-14])for(let z=-b+28;z<b-20;z+=44){const lamp=MeshBuilder.CreateBox('wall-lamp',{width:1.8,height:.18,depth:.5},this.scene);lamp.position.set(x,5.8,z);lamp.material=accent;this.meshes.push(lamp)}
    return {spawn:new Vector3(0,0,b-18),exitZ:-b+7};
  }
  clamp(pos,r=.8){const b=this.bounds-r;pos.x=Math.max(-b,Math.min(b,pos.x));pos.z=Math.max(-b,Math.min(b,pos.z))}
  blocked(pos,r=.9){return this.obstacles.some(o=>Math.abs(pos.x-o.x)<o.w/2+r&&Math.abs(pos.z-o.z)<o.d/2+r)}
}
