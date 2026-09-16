import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

const originalAdd=THREE.Group.prototype.add;
const darkMat=new THREE.MeshStandardMaterial({color:0x11151c,roughness:.82,metalness:.08});
const leatherMat=new THREE.MeshStandardMaterial({color:0x2d333b,roughness:.72,metalness:.12});
const metalMat=new THREE.MeshStandardMaterial({color:0x65717e,roughness:.38,metalness:.72});
const blackMat=new THREE.MeshStandardMaterial({color:0x080a0d,roughness:.92,metalness:.02});
const glowMat=new THREE.MeshBasicMaterial({color:0xa9dcff});

const geomType=o=>o?.geometry?.type||'';
const dims=o=>o?.geometry?.parameters||{};
const mesh=(geo,mat,pos=[0,0,0],rot=[0,0,0],scale=[1,1,1])=>{const m=new THREE.Mesh(geo,mat);m.position.set(...pos);m.rotation.set(...rot);m.scale.set(...scale);m.castShadow=true;m.receiveShadow=true;return m};
const addRaw=(g,...objs)=>originalAdd.apply(g,objs);

function classify(g){
 if(!g||g.userData.enhancedModel||g.userData.enhancingModel)return;
 const kids=g.children||[];
 const types=kids.map(geomType);
 const boxes=kids.filter(k=>geomType(k)==='BoxGeometry');
 const capsules=types.filter(t=>t==='CapsuleGeometry').length;
 const spheres=types.filter(t=>t==='SphereGeometry').length;
 const cones=types.filter(t=>t==='ConeGeometry').length;
 if(cones&&capsules>=4)return 'player';
 if(capsules>=1&&spheres>=2&&!cones)return 'enemy';
 if(boxes.length>=2){const p=dims(boxes[0]);if((p.width||0)>1.4&&(p.height||0)<1.1)return 'chest'}
 if(kids.length>=2&&kids.length<=8&&(types.includes('CylinderGeometry')||types.includes('BoxGeometry'))&&!capsules&&!spheres)return 'weapon';
 return null;
}

function decoratePlayer(g){
 const clothSource=g.children.find(c=>c.material?.color&&geomType(c)==='CapsuleGeometry');
 const cloth=clothSource?.material?.clone?.()||darkMat.clone();
 cloth.roughness=.82;cloth.metalness=.03;
 const hoodRim=mesh(new THREE.TorusGeometry(.39,.055,6,16,Math.PI*1.25),blackMat,[0,2.18,.24],[Math.PI/2,0,.38]);
 const capeL=mesh(new THREE.BoxGeometry(.38,.92,.07),cloth,[-.2,.9,-.36],[.2,.08,.12]);
 const capeR=mesh(new THREE.BoxGeometry(.38,.92,.07),cloth,[.2,.9,-.36],[.2,-.08,-.12]);
 const strap1=mesh(new THREE.BoxGeometry(.08,.9,.05),leatherMat,[.18,1.38,.34],[0,0,.48]);
 const strap2=mesh(new THREE.BoxGeometry(.08,.9,.05),leatherMat,[-.18,1.38,.34],[0,0,-.48]);
 const belt=mesh(new THREE.TorusGeometry(.34,.045,5,14),leatherMat,[0,.94,0],[Math.PI/2,0,0]);
 const buckle=mesh(new THREE.BoxGeometry(.18,.14,.08),metalMat,[0,.95,.34]);
 const bracerL=mesh(new THREE.CylinderGeometry(.115,.105,.28,8),metalMat,[-.5,.93,.02]);
 const bracerR=mesh(new THREE.CylinderGeometry(.115,.105,.28,8),metalMat,[.5,.93,.02]);
 const pauldronL=mesh(new THREE.SphereGeometry(.2,9,7),leatherMat,[-.5,1.63,-.01],[0,0,.08],[1.25,.65,1.15]);
 const pauldronR=mesh(new THREE.SphereGeometry(.2,9,7),leatherMat,[.5,1.63,-.01],[0,0,-.08],[1.25,.65,1.15]);
 const sheath=mesh(new THREE.BoxGeometry(.12,.12,.95),blackMat,[-.38,.72,-.28],[0,.45,-.32]);
 const sheathCap=mesh(new THREE.BoxGeometry(.18,.16,.12),metalMat,[-.6,.62,-.5],[0,.45,-.32]);
 addRaw(g,hoodRim,capeL,capeR,strap1,strap2,belt,buckle,bracerL,bracerR,pauldronL,pauldronR,sheath,sheathCap);
}

function decorateEnemy(g){
 const body=g.children.find(c=>geomType(c)==='CapsuleGeometry');
 const head=g.children.find(c=>geomType(c)==='SphereGeometry'&&c.position.y>1.4);
 if(!body||!head)return;
 const base=body.material?.clone?.()||darkMat.clone();base.roughness=.58;base.metalness=.12;
 const scale=head.position.y>2.5?1.65:1;
 const armGeo=new THREE.CapsuleGeometry(.1*scale,.38*scale,3,6);
 const legGeo=new THREE.CapsuleGeometry(.11*scale,.42*scale,3,6);
 for(const sx of [-1,1]){
  addRaw(g,
   mesh(armGeo,base,[.48*scale*sx,1.05*scale,0],[0,0,sx*.12]),
   mesh(legGeo,darkMat,[.22*scale*sx,.35*scale,0]),
   mesh(new THREE.ConeGeometry(.1*scale,.35*scale,6),metalMat,[.42*scale*sx,1.65*scale,-.06],[0,0,sx*.35])
  );
 }
 const collar=mesh(new THREE.TorusGeometry(.36*scale,.06*scale,6,12),darkMat,[0,1.45*scale,0],[Math.PI/2,0,0]);
 const chest=mesh(new THREE.BoxGeometry(.62*scale,.14*scale,.44*scale),metalMat,[0,1.25*scale,.18]);
 const antennaL=mesh(new THREE.ConeGeometry(.055*scale,.38*scale,6),base,[-.18*scale,2.05*scale,-.08],[0,0,-.24]);
 const antennaR=mesh(new THREE.ConeGeometry(.055*scale,.38*scale,6),base,[.18*scale,2.05*scale,-.08],[0,0,.24]);
 addRaw(g,collar,chest,antennaL,antennaR);
 if(scale>1){
  const crown=mesh(new THREE.TorusGeometry(.48*scale,.08*scale,6,12),metalMat,[0,2.08*scale,0],[Math.PI/2,0,0]);
  const core=mesh(new THREE.OctahedronGeometry(.16*scale,0),glowMat,[0,1.28*scale,.42]);
  addRaw(g,crown,core);
 }
}

function decorateChest(g){
 const bandMat=metalMat.clone();bandMat.color.setHex(0x7a8594);
 const band1=mesh(new THREE.BoxGeometry(.16,.95,1.18),bandMat,[-.52,.52,0]);
 const band2=mesh(new THREE.BoxGeometry(.16,.95,1.18),bandMat,[.52,.52,0]);
 const lock=mesh(new THREE.BoxGeometry(.28,.3,.12),metalMat,[0,.55,.61]);
 const key=mesh(new THREE.CylinderGeometry(.035,.035,.1,8),blackMat,[0,.55,.69],[Math.PI/2,0,0]);
 for(const sx of [-1,1])for(const sz of [-1,1])addRaw(g,mesh(new THREE.BoxGeometry(.16,.16,.16),metalMat,[.75*sx,.12,.48*sz]));
 addRaw(g,band1,band2,lock,key);
}

function decorateWeapon(g){
 const boxes=g.children.filter(c=>geomType(c)==='BoxGeometry');
 const cyls=g.children.filter(c=>geomType(c)==='CylinderGeometry');
 const isMelee=cyls.length&&boxes.some(b=>(dims(b).depth||0)>.9);
 if(isMelee){
  const guard=mesh(new THREE.BoxGeometry(.5,.07,.08),metalMat,[0,0,-.24]);
  const pommel=mesh(new THREE.IcosahedronGeometry(.09,0),metalMat,[0,0,.28]);
  const wrap1=mesh(new THREE.TorusGeometry(.06,.018,5,8),leatherMat,[0,0,.07],[Math.PI/2,0,0]);
  const wrap2=mesh(new THREE.TorusGeometry(.06,.018,5,8),leatherMat,[0,0,.16],[Math.PI/2,0,0]);
  addRaw(g,guard,pommel,wrap1,wrap2);
 }else{
  const sight=mesh(new THREE.BoxGeometry(.14,.12,.22),metalMat,[0,.17,-.36]);
  const grip=mesh(new THREE.BoxGeometry(.13,.3,.18),blackMat,[0,-.2,-.16],[-.18,0,0]);
  const stock=mesh(new THREE.BoxGeometry(.22,.22,.38),darkMat,[0,0,.22]);
  const rail=mesh(new THREE.BoxGeometry(.1,.045,.56),metalMat,[0,.13,-.37]);
  const muzzle=mesh(new THREE.CylinderGeometry(.075,.075,.16,8),metalMat,[0,0,-1.23],[Math.PI/2,0,0]);
  addRaw(g,sight,grip,stock,rail,muzzle);
 }
}

function decorate(g){
 if(!g||g.userData.enhancedModel||g.userData.enhancingModel)return;
 const type=classify(g);if(!type)return;
 g.userData.enhancingModel=true;
 try{if(type==='player')decoratePlayer(g);else if(type==='enemy')decorateEnemy(g);else if(type==='chest')decorateChest(g);else if(type==='weapon')decorateWeapon(g);g.userData.enhancedModel=type;}finally{g.userData.enhancingModel=false}
}

THREE.Group.prototype.add=function(...objs){const r=originalAdd.apply(this,objs);queueMicrotask(()=>decorate(this));for(const o of objs)if(o?.isGroup)queueMicrotask(()=>decorate(o));return r};
