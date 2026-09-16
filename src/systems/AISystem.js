import {Vector3} from '@babylonjs/core';

const RANGED=new Set(['shooter','sniper','burst','fan','radial','rings','satellite','orbit','spiral']);
const awarenessFor=e=>e.boss?110:e.def.ai==='sniper'?72:RANGED.has(e.def.ai)?58:e.def.ai==='charge'?50:42;
const idealFor=role=>role==='sniper'?34:(role==='radial'||role==='rings'?23:(role==='burst'||role==='fan'?19:15));

export class AISystem{
  update(dt,state){
    const now=performance.now()/1000;
    for(const e of state.enemies){
      if(e.dead)continue;
      e.think=(e.think||0)-dt;e.shotCd=(e.shotCd??Math.random())-dt;e.phase=e.phase||Math.random()*6.28;e.awareness=e.awareness||awarenessFor(e);e.home=e.home||e.node.position.clone();e.patrolAngle=e.patrolAngle??Math.random()*Math.PI*2;e.alerted=!!e.alerted;e.lastSeen=e.lastSeen||0;
      const to=state.player.node.position.subtract(e.node.position),dist=to.length(),dir=dist>.001?to.scale(1/dist):Vector3.Forward(),role=e.def.ai||'boss',side=new Vector3(-dir.z,0,dir.x);
      if(e.alerted){if(dist<e.awareness*1.65)e.lastSeen=now;else if(now-e.lastSeen>4.5)e.alerted=false}else if(dist<e.awareness){e.alerted=true;e.lastSeen=now;state.bus.emit('enemy:alerted',e)}
      if(!e.alerted){this.patrol(e,dt,state);continue}
      let move=Vector3.Zero();
      if(RANGED.has(role)){const ideal=idealFor(role);if(dist>ideal+5)move.addInPlace(dir);else if(dist<ideal-4)move.subtractInPlace(dir);move.addInPlace(side.scale(Math.sin(now*1.2+e.phase)*.82));}
      else if(role==='charge'){move.copyFrom(dir);if(dist<10)move.scaleInPlace(1.8)}
      else if(role==='blink'){move.copyFrom(side).scaleInPlace(.9);if(e.think<=0){e.think=2.4;const jump=side.scale((Math.random()>.5?1:-1)*(7+Math.random()*5));const target=e.node.position.add(jump);if(!state.world.blocked(target,e.radius))e.node.position.copyFrom(target)}}
      else{move.copyFrom(dir);if(dist<5)move.addInPlace(side.scale(Math.sin(now*2+e.phase)*.35))}
      if(move.lengthSquared()>0){move.normalize().scaleInPlace(e.speed*dt);const before=e.node.position.clone(),candidate=before.add(move);if(!state.world.blocked(candidate,e.radius)){e.node.position.copyFrom(candidate)}else{e.phase+=1.7;const dodge=before.add(side.scale((Math.random()>.5?1:-1)*e.speed*dt*1.4));if(!state.world.blocked(dodge,e.radius))e.node.position.copyFrom(dodge)}state.world.clamp(e.node.position,e.radius)}
      e.node.rotation.y=Math.atan2(dir.x,dir.z);
      const canShoot=RANGED.has(role)||e.boss;
      if(canShoot&&e.shotCd<=0&&dist<Math.min(e.awareness*1.15,68)){e.shotCd=role==='sniper'?1.75:(role==='burst'?.78:(e.boss?.62:1.12));state.bus.emit('enemy:fire',{enemy:e,dir})}
    }
  }
  patrol(e,dt,state){
    e.patrolAngle+=dt*(.22+(e.phase%1)*.12);const radius=e.boss?0:6+(e.phase%5),target=e.home.add(new Vector3(Math.cos(e.patrolAngle)*radius,0,Math.sin(e.patrolAngle)*radius)),v=target.subtract(e.node.position);v.y=0;if(v.lengthSquared()<1)return;v.normalize().scaleInPlace(e.speed*dt*.28);const candidate=e.node.position.add(v);if(!state.world.blocked(candidate,e.radius)){e.node.position.copyFrom(candidate);e.node.rotation.y=Math.atan2(v.x,v.z)}else e.patrolAngle+=1.4;state.world.clamp(e.node.position,e.radius)
  }
}
