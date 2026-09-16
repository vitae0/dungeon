import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

const originalAdd=THREE.Group.prototype.add;
const darkMat=new THREE.MeshStandardMaterial({color:0x0a0c10,roughness:.94,metalness:.01});
const clothMat=new THREE.MeshStandardMaterial({color:0x151922,roughness:.96,metalness:0});
const leatherMat=new THREE.MeshStandardMaterial({color:0x252a31,roughness:.78,metalness:.06});
const metalMat=new THREE.MeshStandardMaterial({color:0x606975,roughness:.42,metalness:.62});
const blackMat=new THREE.MeshStandardMaterial({color:0x040506,roughness:.98,metalness:0});
const glowMat=new THREE.MeshBasicMaterial({color:0xa9dcff});
const geomType=o=>o?.geometry?.type||'';
const dims=o=>o?.geometry?.parameters||{};
const mesh=(geo,mat,pos=[0,0,0],rot=[0,0,0],scale=[1,1,1])=>{const m=new THREE.Mesh(geo,mat);m.position.set(...pos);m.rotation.set(...rot);m.scale.set(...scale);m.castShadow=true;m.receiveShadow=true;return m};
const addRaw=(g,...objs)=>originalAdd.apply(g,objs);

function classify(g){
 if(!g||g.userData.enhancedModel||g.userData.enhancingModel)return;
 const kids=g.children||[],types=kids.map(geomType),boxes=kids.filter(k=>geomType(k)==='BoxGeometry');
 const capsules=types.filter(t=>t==='CapsuleGeometry').length,spheres=types.filter(t=>t==='SphereGeometry').length,cones=types.filter(t=>t==='ConeGeometry').length;
 if(cones&&capsules>=4)return 'player';
 if(capsules>=1&&spheres>=2&&!cones)return 'enemy';
 if(boxes.length>=2){const p=dims(boxes[0]);if((p.width||0)>1.4&&(p.height||0)<1.1)return 'chest'}
 if(kids.length>=2&&kids.length<=10&&(types.includes('CylinderGeometry')||types.includes('BoxGeometry'))&&!capsules&&!spheres)return 'weapon';
 return null;
}

function decoratePlayer(g){
 const source=g.children.find(c=>c.material?.color&&geomType(c)==='CapsuleGeometry');
 const cloth=source?.material?.clone?.()||clothMat.clone();cloth.roughness=.96;cloth.metalness=0;
 // Deep hood: large cloth shell, forward beak and black face cavity. This intentionally reads as cloth, not helmet.
 const hoodShell=mesh(new THREE.SphereGeometry(.49,14,10,0,Math.PI*2,0,Math.PI*.7),cloth,[0,2.27,-.08],[0,0,0],[1.03,1.08,1.05]);
 const hoodPeak=mesh(new THREE.ConeGeometry(.49,.82,12),cloth,[0,2.47,.02],[.18,0,0],[1.05,1,1.15]);
 const faceVoid=mesh(new THREE.SphereGeometry(.325,12,8),blackMat,[0,2.16,.19],[0,0,0],[.96,.92,.72]);
 const brow=mesh(new THREE.BoxGeometry(.58,.11,.18),cloth,[0,2.32,.31],[.15,0,0]);
 const hoodRim=mesh(new THREE.TorusGeometry(.405,.06,7,20,Math.PI*1.38),darkMat,[0,2.18,.28],[Math.PI/2,0,.31]);
 // Mantle and layered tails remove the "high gear soldier" silhouette.
 const mantle=mesh(new THREE.CylinderGeometry(.48,.62,.38,12,1,true),cloth,[0,1.83,-.02]);
 const scarf=mesh(new THREE.TorusGeometry(.34,.09,7,16),darkMat,[0,1.92,.02],[Math.PI/2,0,0]);
 const capeCenter=mesh(new THREE.BoxGeometry(.48,1.18,.06),cloth,[0,.92,-.39],[.15,0,0]);
 const capeL=mesh(new THREE.BoxGeometry(.34,1.04,.06),cloth,[-.29,.92,-.36],[.18,.05,.12]);
 const capeR=mesh(new THREE.BoxGeometry(.34,1.04,.06),cloth,[.29,.92,-.36],[.18,-.05,-.12]);
 const belt=mesh(new THREE.TorusGeometry(.35,.04,6,16),leatherMat,[0,.94,0],[Math.PI/2,0,0]);
 const buckle=mesh(new THREE.BoxGeometry(.14,.12,.07),metalMat,[0,.95,.35]);
 const strap1=mesh(new THREE.BoxGeometry(.065,.9,.045),leatherMat,[.17,1.38,.34],[0,0,.46]);
 const strap2=mesh(new THREE.BoxGeometry(.065,.9,.045),leatherMat,[-.17,1.38,.34],[0,0,-.46]);
 const bracerL=mesh(new THREE.CylinderGeometry(.11,.1,.25,8),leatherMat,[-.5,.93,.02]);
 const bracerR=mesh(new THREE.CylinderGeometry(.11,.1,.25,8),leatherMat,[.5,.93,.02]);
 const sheath=mesh(new THREE.BoxGeometry(.11,.11,1.0),darkMat,[-.39,.69,-.28],[0,.43,-.34]);
 addRaw(g,hoodShell,hoodPeak,faceVoid,brow,hoodRim,mantle,scarf,capeCenter,capeL,capeR,belt,buckle,strap1,strap2,bracerL,bracerR,sheath);
}

function decorateEnemy(g){
 const body=g.children.find(c=>geomType(c)==='CapsuleGeometry'),head=g.children.find(c=>geomType(c)==='SphereGeometry'&&c.position.y>1.4);if(!body||!head)return;
 const base=body.material?.clone?.()||clothMat.clone();base.roughness=.55;base.metalness=.1;
 const scale=head.position.y>2.5?1.65:1,armGeo=new THREE.CapsuleGeometry(.1*scale,.38*scale,3,6),legGeo=new THREE.CapsuleGeometry(.11*scale,.42*scale,3,6);
 for(const sx of [-1,1])addRaw(g,
   mesh(armGeo,base,[.48*scale*sx,1.05*scale,0],[0,0,sx*.12]),
   mesh(legGeo,darkMat,[.22*scale*sx,.35*scale,0]),
   mesh(new THREE.ConeGeometry(.1*scale,.35*scale,6),metalMat,[.42*scale*sx,1.65*scale,-.06],[0,0,sx*.35])
 );
 addRaw(g,
   mesh(new THREE.TorusGeometry(.36*scale,.06*scale,6,12),darkMat,[0,1.45*scale,0],[Math.PI/2,0,0]),
   mesh(new THREE.BoxGeometry(.62*scale,.14*scale,.44*scale),metalMat,[0,1.25*scale,.18]),
   mesh(new THREE.ConeGeometry(.055*scale,.38*scale,6),base,[-.18*scale,2.05*scale,-.08],[0,0,-.24]),
   mesh(new THREE.ConeGeometry(.055*scale,.38*scale,6),base,[.18*scale,2.05*scale,-.08],[0,0,.24])
 );
 if(scale>1)addRaw(g,mesh(new THREE.TorusGeometry(.48*scale,.08*scale,6,12),metalMat,[0,2.08*scale,0],[Math.PI/2,0,0]),mesh(new THREE.OctahedronGeometry(.16*scale,0),glowMat,[0,1.28*scale,.42]));
}

function decorateChest(g){
 const bandMat=metalMat.clone();bandMat.color.setHex(0x7a8594);
 addRaw(g,mesh(new THREE.BoxGeometry(.16,.95,1.18),bandMat,[-.52,.52,0]),mesh(new THREE.BoxGeometry(.16,.95,1.18),bandMat,[.52,.52,0]),mesh(new THREE.BoxGeometry(.28,.3,.12),metalMat,[0,.55,.61]),mesh(new THREE.CylinderGeometry(.035,.035,.1,8),blackMat,[0,.55,.69],[Math.PI/2,0,0]));
 for(const sx of [-1,1])for(const sz of [-1,1])addRaw(g,mesh(new THREE.BoxGeometry(.16,.16,.16),metalMat,[.75*sx,.12,.48*sz]));
}

function decorateWeapon(g){
 const boxes=g.children.filter(c=>geomType(c)==='BoxGeometry'),cyls=g.children.filter(c=>geomType(c)==='CylinderGeometry'),isMelee=cyls.length&&boxes.some(b=>(dims(b).depth||0)>.9);
 if(isMelee)addRaw(g,mesh(new THREE.BoxGeometry(.5,.07,.08),metalMat,[0,0,-.24]),mesh(new THREE.IcosahedronGeometry(.09,0),metalMat,[0,0,.28]),mesh(new THREE.TorusGeometry(.06,.018,5,8),leatherMat,[0,0,.07],[Math.PI/2,0,0]),mesh(new THREE.TorusGeometry(.06,.018,5,8),leatherMat,[0,0,.16],[Math.PI/2,0,0]));
 else addRaw(g,mesh(new THREE.BoxGeometry(.14,.12,.22),metalMat,[0,.17,-.36]),mesh(new THREE.BoxGeometry(.13,.3,.18),blackMat,[0,-.2,-.16],[-.18,0,0]),mesh(new THREE.BoxGeometry(.22,.22,.38),darkMat,[0,0,.22]),mesh(new THREE.BoxGeometry(.1,.045,.56),metalMat,[0,.13,-.37]),mesh(new THREE.CylinderGeometry(.075,.075,.16,8),metalMat,[0,0,-1.23],[Math.PI/2,0,0]));
}

function decorate(g){if(!g||g.userData.enhancedModel||g.userData.enhancingModel)return;const type=classify(g);if(!type)return;g.userData.enhancingModel=true;try{if(type==='player')decoratePlayer(g);else if(type==='enemy')decorateEnemy(g);else if(type==='chest')decorateChest(g);else if(type==='weapon')decorateWeapon(g);g.userData.enhancedModel=type}finally{g.userData.enhancingModel=false}}
THREE.Group.prototype.add=function(...objs){const r=originalAdd.apply(this,objs);queueMicrotask(()=>decorate(this));for(const o of objs)if(o?.isGroup)queueMicrotask(()=>decorate(o));return r};
