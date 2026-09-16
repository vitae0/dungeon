import {Vector3} from '@babylonjs/core';

export class AISystem{
  update(dt,state){for(const e of state.enemies){if(e.dead)continue;e.think=(e.think||0)-dt;e.shotCd=(e.shotCd||Math.random())-dt;const to=state.player.node.position.subtract(e.node.position),dist=to.length(),dir=to.normalize(),side=new Vector3(-dir.z,0,dir.x);let move=Vector3.Zero();const role=e.def.ai;
    if(['shooter','sniper','burst','fan','radial','rings','satellite','orbit'].includes(role)){const ideal=role==='sniper'?30:role==='radial'||role==='rings'?20:15;if(dist>ideal+3)move.addInPlace(dir);else if(dist<ideal-3)move.subtractInPlace(dir);move.addInPlace(side.scale(Math.sin((e.phase||0)+performance.now()/700)*.7));}
    else if(role==='charge'){move.copyFrom(dir);if(dist<8)move.scaleInPlace(1.8)}
    else if(role==='blink'){move.copyFrom(side).scaleInPlace(.9);if(e.think<=0){e.think=2.2;e.node.position.addInPlace(side.scale((Math.random()>.5?1:-1)*7))}}
    else move.copyFrom(dir);
    if(move.lengthSquared()>0){move.normalize().scaleInPlace(e.speed*dt);const before=e.node.position.clone();e.node.position.addInPlace(move);state.world.clamp(e.node.position,e.radius);if(Vector3.DistanceSquared(before,e.node.position)<.0001)e.phase=(e.phase||0)+Math.PI*.7}e.node.rotation.y=Math.atan2(dir.x,dir.z);
    if(role!=='chase'&&role!=='charge'&&e.shotCd<=0&&dist<42){e.shotCd=role==='sniper'?1.7:(role==='burst'?.8:1.15);state.bus.emit('enemy:fire',{enemy:e,dir})}}
  }
}
