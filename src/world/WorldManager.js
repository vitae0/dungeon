import {MeshBuilder,StandardMaterial,Color3,Vector3} from '@babylonjs/core';

export class WorldManager{
  constructor(scene){this.scene=scene;this.size=120;this.bounds=this.size/2;this.meshes=[]}
  material(name,color){const m=new StandardMaterial(name,this.scene);m.diffuseColor=Color3.FromHexString(color);m.specularColor=new Color3(.06,.06,.06);return m}
  clear(){for(const m of this.meshes)m.dispose();this.meshes=[]}
  build(room=0,floor=1){this.clear();this.size=112+Math.min(40,floor*4);this.bounds=this.size/2;const fm=this.material('floor','#26384a'),wm=this.material('wall','#3b4655'),tm=this.material('trim','#596779');
    const floorMesh=MeshBuilder.CreateGround('floor',{width:this.size,height:this.size,subdivisions:2},this.scene);floorMesh.material=fm;floorMesh.receiveShadows=true;this.meshes.push(floorMesh);
    const addWall=(x,z,w,d,h=5)=>{const wall=MeshBuilder.CreateBox('wall',{width:w,depth:d,height:h},this.scene);wall.position.set(x,h/2,z);wall.material=wm;wall.checkCollisions=true;this.meshes.push(wall);const trim=MeshBuilder.CreateBox('trim',{width:w+.04,depth:d+.04,height:.12},this.scene);trim.position.set(x,.08,z);trim.material=tm;this.meshes.push(trim)};
    const b=this.bounds;addWall(0,b,this.size,1);addWall(-b,0,1,this.size);addWall(b,0,1,this.size);addWall(-b*.64,-b,this.size*.31,1);addWall(b*.64,-b,this.size*.31,1);
    const v=room%4;if(v===1){for(const x of [-18,18])addWall(x,0,2,26)}else if(v===2){for(const x of [-20,0,20])for(const z of [-16,16])addWall(x,z,2,2)}else if(v===3){for(const z of [-18,0,18])addWall(0,z,30,2)}
    return {spawn:new Vector3(0,0,b-10),exitZ:-b+3};
  }
  clamp(pos,r=.8){const b=this.bounds-r;pos.x=Math.max(-b,Math.min(b,pos.x));pos.z=Math.max(-b,Math.min(b,pos.z))}
}
