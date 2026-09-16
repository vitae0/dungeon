export const CLASSES={
 vanguard:{name:'Vanguard',color:0x5da9ff,desc:'Daha dayanıklı. Shotgun + blade başlangıcı.',hp:170,speed:8.2,damage:1.05,slots:['gravedigger','cathedral_blade','needle_rain']},
 ranger:{name:'Ranger',color:0x64e6a6,desc:'Uzak menzil ve güçlü aim assist.',hp:120,speed:9.3,damage:1.0,aim:1.65,slots:['void_lance','needle_rain','cherub_swarm']},
 occultist:{name:'Occultist',color:0xc387ff,desc:'Homing, kritik ve bullet-hell kontrolü.',hp:110,speed:8.8,damage:1.12,crit:.14,slots:['cherub_swarm','hex_orbit','moon_scythe']},
 berserker:{name:'Berserker',color:0xff6b6b,desc:'Yakın dövüş, yüksek hasar, kısa cooldown.',hp:145,speed:9.0,damage:1.18,melee:1.35,slots:['saintbreaker','cathedral_blade','black_comet']}
};
export const RARITY={common:{mul:1,color:'#d8dbe3'},uncommon:{mul:1.12,color:'#6ee7a1'},rare:{mul:1.28,color:'#65a9ff'},epic:{mul:1.48,color:'#c888ff'},legendary:{mul:1.75,color:'#ffd166'},mythic:{mul:2.15,color:'#ff6fae'}};
export const WEAPONS=[
 {id:'needle_rain',name:'Needle Rain',rarity:'common',type:'SMG',kind:'gun',desc:'Hızlı, düşük recoil, yakın-orta menzil.',damage:10,rate:13,mag:54,reload:1.1,speed:32,spread:.045,range:34},
 {id:'gravedigger',name:'Gravedigger',rarity:'uncommon',type:'Shotgun',kind:'gun',desc:'Kısa menzilde dokuz pellet. Kalabalığı biçer.',damage:13,rate:1.35,mag:7,reload:1.45,speed:27,spread:.17,pellets:9,range:23},
 {id:'void_lance',name:'Void Lance',rarity:'epic',type:'Anti-Materiel Lance',kind:'gun',desc:'Çok uzak menzil, ağır hasar, güçlü aim assist, delici.',damage:150,rate:.62,mag:4,reload:1.95,speed:50,spread:0,range:80,pierce:5,aimAssist:2.4},
 {id:'cherub_swarm',name:'Cherub Swarm',rarity:'rare',type:'Homing Launcher',kind:'homing',desc:'Yavaş fakat agresif takip eden küresel mermiler.',damage:34,rate:3.2,mag:18,reload:1.35,speed:19,turn:5.4,range:55},
 {id:'black_comet',name:'Black Comet',rarity:'legendary',type:'Heavy Scattergun',kind:'gun',desc:'Dev saçılma konisi, ağır pelletler ve geri tepme.',damage:36,rate:.7,mag:4,reload:2.1,speed:30,spread:.24,pellets:12,range:28},
 {id:'hex_orbit',name:'Hex Orbit',rarity:'epic',type:'Orbital Caster',kind:'orbit',desc:'Etrafında dönen küreler üretir; temas edenleri parçalar.',damage:28,rate:.9,mag:7,reload:1.5,range:12},
 {id:'rail_prayer',name:'Rail Prayer',rarity:'legendary',type:'Rail Rifle',kind:'gun',desc:'Charge hissi veren, aşırı güçlü tek çizgi atış. Aim assist yüksek.',damage:245,rate:.38,mag:3,reload:2.4,speed:62,spread:0,range:95,pierce:9,aimAssist:3.2},
 {id:'ember_mortar',name:'Ember Mortar',rarity:'rare',type:'Grenade Mortar',kind:'grenade',desc:'Yere çarpınca patlayan ağır küre. Alan hasarı.',damage:88,rate:.8,mag:5,reload:1.8,speed:18,range:38,blast:5.5},
 {id:'frost_needles',name:'Frost Needles',rarity:'uncommon',type:'Burst Rifle',kind:'burst',desc:'Üçlü burst. İsabet alan düşmanı kısa süre yavaşlatır.',damage:24,rate:3.5,mag:30,reload:1.3,speed:40,spread:.02,burst:3,slow:.45,range:52},
 {id:'sunbeam',name:'Sunbeam',rarity:'mythic',type:'Beam Cannon',kind:'beam',desc:'Kısa süreli sürekli ışın. Düşük hareket kabiliyeti, korkunç DPS.',damage:70,rate:5.5,mag:36,reload:2.1,range:65,aimAssist:2.8},
 {id:'cathedral_blade',name:'Cathedral Blade',rarity:'uncommon',type:'Longsword',kind:'melee',desc:'Geniş yay, hızlı toparlanma.',damage:105,rate:2.0,range:3.2,arc:1.55},
 {id:'moon_scythe',name:'Moon Scythe',rarity:'epic',type:'Scythe',kind:'melee',desc:'Çok geniş yay ve uzun menzil.',damage:170,rate:1.05,range:4.6,arc:2.5},
 {id:'saintbreaker',name:'Saintbreaker',rarity:'legendary',type:'Warhammer',kind:'melee',desc:'Yavaş ama vurduğu yerde küçük şok dalgası.',damage:300,rate:.56,range:3.6,arc:1.05,blast:3.4},
 {id:'twin_seraph',name:'Twin Seraph',rarity:'rare',type:'Dual Pistols',kind:'gun',desc:'İki hızlı mermi, yüksek hareketli oynanış.',damage:22,rate:7.5,mag:32,reload:.95,speed:38,spread:.035,pellets:2,range:45}
];
export const ENEMIES=[
 {id:'crawler',name:'Crawler',hp:80,speed:4.6,r:.7,ai:'chase',color:0x71d66f,damage:13},
 {id:'archer',name:'Bone Archer',hp:95,speed:3.1,r:.75,ai:'shooter',color:0xe0d7b8,damage:14},
 {id:'cultist',name:'Cultist',hp:115,speed:3.0,r:.8,ai:'radial',color:0xd95872,damage:15},
 {id:'wisp',name:'Wisp',hp:70,speed:5.0,r:.55,ai:'orbit',color:0x67c8ff,damage:12,flying:true},
 {id:'brute',name:'Brute',hp:340,speed:2.4,r:1.05,ai:'charge',color:0xb57749,damage:28},
 {id:'seraph',name:'Glass Seraph',hp:180,speed:3.6,r:.8,ai:'spiral',color:0x96f1e8,damage:16,flying:true},
 {id:'shade',name:'Shade',hp:145,speed:5.4,r:.7,ai:'blink',color:0x6e5786,damage:18},
 {id:'keeper',name:'Bell Keeper',hp:260,speed:2.3,r:1.0,ai:'rings',color:0xd1a149,damage:18},
 {id:'knight',name:'Mirror Knight',hp:300,speed:3.2,r:.9,ai:'burst',color:0x9eaed0,damage:20},
 {id:'spitter',name:'Spitter',hp:125,speed:2.8,r:.78,ai:'triple',color:0xb9dd56,damage:15},
 {id:'maw',name:'Maw',hp:210,speed:4.2,r:.95,ai:'chase',color:0x993e4b,damage:24},
 {id:'orbiter',name:'Orbiter',hp:155,speed:3.5,r:.72,ai:'satellite',color:0xffa26f,damage:17},
 {id:'sniper',name:'Hollow Sniper',hp:120,speed:2.6,r:.74,ai:'sniper',color:0xc4d8ff,damage:32},
 {id:'summoner',name:'Ash Summoner',hp:230,speed:2.2,r:.85,ai:'summoner',color:0xec7fa9,damage:16},
 {id:'mine',name:'Walking Mine',hp:75,speed:5.6,r:.62,ai:'mine',color:0xff8d57,damage:38},
 {id:'prism',name:'Prism Eye',hp:190,speed:2.7,r:.82,ai:'fan',color:0x9f8cff,damage:18,flying:true}
];
export const BOSSES=[
 {name:'THE RED ABBOT',hp:2600,color:0xcf3f57,pattern:'abbot'}, {name:'CLOCK EATER',hp:3900,color:0xd2af4b,pattern:'clock'},
 {name:'PALE WIDOW',hp:5200,color:0xe8e8f0,pattern:'widow'}, {name:'CHOIR BELOW',hp:6800,color:0x7452c6,pattern:'choir'},
 {name:'IRON SAINT',hp:8500,color:0xb98c65,pattern:'saint'}, {name:'NULL KING',hp:11000,color:0xdcdfea,pattern:'null'},
 {name:'MOTHER OF EYES',hp:14500,color:0x73d6bb,pattern:'eyes'}, {name:'LAST CATHEDRAL',hp:19000,color:0xffc86b,pattern:'cathedral'}
];
export const UPGRADES=[
 {name:'Glass Cannon',desc:'+24% damage, -8% max HP',apply:p=>{p.damage*=1.24;p.maxHp*=.92;p.hp=Math.min(p.hp,p.maxHp)}},
 {name:'Quickblood',desc:'+16% fire/attack speed',apply:p=>p.attackSpeed*=1.16},
 {name:'Mercury Boots',desc:'+10% movement speed',apply:p=>p.speed*=1.10},
 {name:'Predator Lens',desc:'+8% critical chance',apply:p=>p.crit+=.08},
 {name:'Magnet Heart',desc:'+60% coin pickup radius',apply:p=>p.pickup*=1.6},
 {name:'Iron Marrow',desc:'+30 max HP, heal 30',apply:p=>{p.maxHp+=30;p.hp=Math.min(p.maxHp,p.hp+30)}},
 {name:'Executioner',desc:'+28% boss damage',apply:p=>p.bossDamage*=1.28},
 {name:'Ricochet Doctrine',desc:'+1 projectile pierce',apply:p=>p.pierceBonus++},
 {name:'Blink Step',desc:'Dash cooldown -18%',apply:p=>p.dashMax*=.82},
 {name:'Gravitic Coin',desc:'+30 coins now',apply:p=>p.coins+=30},
 {name:'Red Feast',desc:'Kills heal 2 HP',apply:p=>p.killHeal+=2},
 {name:'Thick Air',desc:'Enemy bullets move 8% slower',apply:p=>p.enemyBulletSlow*=.92}
];
export const ROOM_THEMES=[
 {name:'Cross Vault',shape:'cross'}, {name:'Pillar Hall',shape:'pillars'}, {name:'Broken Gallery',shape:'gallery'}, {name:'Twin Courts',shape:'twin'}, {name:'Sunken Ring',shape:'ring'}, {name:'Narrow Chapel',shape:'chapel'}
];