export const CLASSES={
  vanguard:{name:'Vanguard',color:0x43d9ff,hp:190,speed:7.2,damage:1.02,aim:1.0,melee:1.18,slots:['pulse','blade','rail'],desc:'Dengeli, dayanıklı, yakın dövüşte güçlü.'},
  ghost:{name:'Ghost',color:0xff55c8,hp:125,speed:9.2,damage:1.08,aim:1.35,crit:.16,slots:['dual','needler','cherub'],desc:'Hızlı, yüksek crit ve çevik oynanış.'},
  titan:{name:'Titan',color:0xffa34a,hp:255,speed:6.1,damage:1.2,aim:.9,melee:1.32,slots:['gravedigger','hammer','mortar'],desc:'Yavaş ama ağır vurur, melee ve patlayıcı uzmanı.'},
  oracle:{name:'Oracle',color:0x9d7cff,hp:145,speed:7.7,damage:1.05,aim:1.25,slots:['sunbeam','orbit','scythe'],desc:'Enerji silahları ve alan kontrolü.'}
};

export const RARITY={
 common:{label:'COMMON',color:'#a9b4c4',mul:1},uncommon:{label:'UNCOMMON',color:'#63e6a3',mul:1.08},rare:{label:'RARE',color:'#63a7ff',mul:1.18},epic:{label:'EPIC',color:'#b56cff',mul:1.32},legendary:{label:'LEGENDARY',color:'#ffb347',mul:1.52},mythic:{label:'MYTHIC',color:'#ff4f8b',mul:1.8}
};

export const WEAPONS=[
{id:'pulse',name:'Neon Pulse',type:'Pulse Carbine',rarity:'common',kind:'gun',damage:22,rate:6.2,speed:62,range:70,mag:24,reload:1.1,spread:.02,color:0x4ce6ff,desc:'Temiz recoil, güvenilir orta menzil.'},
{id:'dual',name:'Twin Seraph',type:'Dual Pistols',rarity:'uncommon',kind:'gun',damage:15,rate:10.5,speed:58,range:54,mag:36,reload:.95,spread:.06,color:0xff82cf,desc:'İki elde hızlı, hareketli oynanış.'},
{id:'needler',name:'Needle Rain',type:'Needle SMG',rarity:'rare',kind:'gun',damage:9,rate:17,speed:72,range:50,mag:52,reload:1.18,spread:.10,color:0x78d8ff,desc:'Yakın-orta menzilde yoğun mermi yağmuru.'},
{id:'gravedigger',name:'Gravedigger',type:'Scatter Shotgun',rarity:'rare',kind:'shotgun',damage:12,rate:1.45,speed:52,range:28,mag:7,reload:1.45,spread:.24,pellets:9,color:0xffc06e,desc:'Yakında vahşi, duvar arkasına güvenmez.'},
{id:'rail',name:'Rail Prayer',type:'Anti-Materiel Rail Rifle',rarity:'legendary',kind:'rail',damage:170,rate:.58,speed:140,range:120,mag:4,reload:2.05,pierce:5,color:0xc78cff,desc:'Çok güçlü uzun menzil. Hızlı ve delici.'},
{id:'lance',name:'Void Lance',type:'Void Rifle',rarity:'epic',kind:'rail',damage:115,rate:.85,speed:120,range:105,mag:6,reload:1.7,pierce:3,color:0x8f83ff,desc:'Uzun menzilde hızlı ve hassas.'},
{id:'cherub',name:'Cherub Swarm',type:'Homing Micro-Missile',rarity:'epic',kind:'homing',damage:31,rate:4.1,speed:36,range:72,mag:18,reload:1.4,turn:4.5,color:0xffee88,desc:'Mikro füzeler en yakın hedefe kıvrılır.'},
{id:'mortar',name:'Ember Mortar',type:'Grenade Mortar',rarity:'epic',kind:'grenade',damage:92,rate:.8,speed:28,range:58,mag:5,reload:2.0,blast:3.4,color:0xff704c,desc:'Ağır küre, duvara çarptığında patlar.'},
{id:'sunbeam',name:'Sunbeam',type:'Beam Cannon',rarity:'legendary',kind:'beam',damage:58,rate:8.5,speed:150,range:90,mag:70,reload:2.1,color:0xffef9a,desc:'Sürekli enerji huzmesi.'},
{id:'orbit',name:'Hex Orbit',type:'Orbital Caster',rarity:'mythic',kind:'orbital',damage:42,rate:.62,range:7,mag:0,reload:0,color:0xa76cff,desc:'Etrafında dönen neon küreler üretir.'},
{id:'blade',name:'Cathedral Blade',type:'Monoblade',rarity:'uncommon',kind:'melee',damage:105,rate:2.25,range:3.0,arc:1.9,color:0xeaf7ff,desc:'Tam önünde geniş ve hızlı bir kesiş.'},
{id:'scythe',name:'Moon Scythe',type:'Phase Scythe',rarity:'epic',kind:'melee',damage:165,rate:1.2,range:4.1,arc:2.35,color:0xd697ff,desc:'Çok geniş ön hitbox ve uzun erişim.'},
{id:'hammer',name:'Saintbreaker',type:'Shock Hammer',rarity:'legendary',kind:'melee',damage:255,rate:.66,range:3.45,arc:1.65,shock:3.1,color:0xffad67,desc:'Ön konide ağır darbe, küçük şok dalgası.'}
];

const colors=[0x54e1ff,0xff5ca8,0x7dff85,0xffbc57,0xa985ff,0xff6b6b,0x5ff0cb,0xf2ff66,0x6e8cff,0xff8a52,0x68ffde,0xd87cff];
export const ENEMIES=[
{name:'Neon Crawler',hp:190,speed:4.6,r:.7,color:colors[0],ai:'chase',damage:22,xp:28},
{name:'Pink Warden',hp:260,speed:3.6,r:.85,color:colors[1],ai:'shooter',damage:26,xp:42},
{name:'Viridian Bat',hp:150,speed:6.2,r:.62,color:colors[2],ai:'orbit',damage:20,xp:28,flying:true},
{name:'Amber Monk',hp:310,speed:3.2,r:.9,color:colors[3],ai:'radial',damage:25,xp:48},
{name:'Violet Sniper',hp:210,speed:2.8,r:.72,color:colors[4],ai:'sniper',damage:38,xp:50},
{name:'Scarlet Charger',hp:420,speed:3.8,r:1.02,color:colors[5],ai:'charge',damage:40,xp:62},
{name:'Mint Seraph',hp:240,speed:4.2,r:.74,color:colors[6],ai:'spiral',damage:24,xp:46,flying:true},
{name:'Acid Bell',hp:380,speed:2.6,r:1.0,color:colors[7],ai:'rings',damage:28,xp:60},
{name:'Cobalt Knight',hp:520,speed:3.1,r:1.1,color:colors[8],ai:'burst',damage:32,xp:72},
{name:'Orange Shade',hp:280,speed:4.5,r:.78,color:colors[9],ai:'blink',damage:30,xp:58},
{name:'Teal Satellite',hp:340,speed:3.7,r:.9,color:colors[10],ai:'satellite',damage:28,xp:64},
{name:'Lilac Herald',hp:460,speed:2.5,r:1.0,color:colors[11],ai:'fan',damage:34,xp:76}
];

export const BOSSES=[
{name:'NEON ARCHBISHOP',hp:5200,color:0xff3e88,pattern:'abbot'},
{name:'CLOCK EATER MK.II',hp:6800,color:0xffbf45,pattern:'clock'},
{name:'VOID CHOIR ENGINE',hp:8400,color:0x8f63ff,pattern:'choir'},
{name:'THE GLASS TYRANT',hp:10400,color:0x6ffff0,pattern:'eyes'},
{name:'LAST PALACE CORE',hp:13200,color:0xff5f5f,pattern:'cathedral'}
];

export const UPGRADES=[
{name:'Overclock',desc:'+18% attack speed',apply:p=>p.attackSpeed*=1.18},
{name:'Hardlight Plating',desc:'+45 max HP ve +45 heal',apply:p=>{p.maxHp+=45;p.hp=Math.min(p.maxHp,p.hp+45)}},
{name:'Smart Optics',desc:'+8% crit chance',apply:p=>p.crit=Math.min(.65,(p.crit||0)+.08)},
{name:'Monomolecular Edge',desc:'+28% melee damage',apply:p=>p.melee*=1.28},
{name:'Boss Protocol',desc:'+30% boss damage',apply:p=>p.bossDamage*=1.3},
{name:'Mag-Coil',desc:'+60% coin çekim mesafesi',apply:p=>p.pickup*=1.6},
{name:'Execution Cache',desc:'+12 heal per kill',apply:p=>p.killHeal+=12},
{name:'Redline',desc:'+20% overall damage',apply:p=>p.damage*=1.2},
{name:'Phase Boots',desc:'+14% movement speed',apply:p=>p.speed*=1.14}
];

export const ROOM_THEMES=[
{name:'Grand Neon Nave',shape:'nave'},
{name:'Reactor Gallery',shape:'gallery'},
{name:'Royal Data Atrium',shape:'atrium'},
{name:'Hangar Basilica',shape:'hangar'},
{name:'Cryo Cloister',shape:'cloister'},
{name:'Executive Chapel',shape:'chapel'},
{name:'Orbital Throne Hall',shape:'throne'}
];
