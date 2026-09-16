export const BIOMES=[
 {name:'Ash Crypt',floor:'#171821',wall:'#4d4a5a',accent:0xff6b6b,bg:0x090a10},
 {name:'Fungal Catacomb',floor:'#13201b',wall:'#355b49',accent:0x76f0a0,bg:0x07100d},
 {name:'Sunken Archive',floor:'#101d2a',wall:'#34546f',accent:0x63c7ff,bg:0x07101a},
 {name:'Clockwork Vault',floor:'#241d12',wall:'#74603c',accent:0xffcb66,bg:0x120e08},
 {name:'Blood Basilica',floor:'#241216',wall:'#6e323e',accent:0xff4f70,bg:0x12070a},
 {name:'Null Palace',floor:'#18151f',wall:'#5d4a73',accent:0xc08cff,bg:0x0a0810}
];

export const WEAPONS=[
 {id:'pistol',name:'Rust Pistol',kind:'gun',damage:22,rate:4.5,speed:800,spread:.025,pellets:1,mag:14,reload:.85,color:0x8fe8ff},
 {id:'smg',name:'Needle Rain',kind:'gun',damage:9,rate:15,speed:900,spread:.11,pellets:1,mag:48,reload:1.25,color:0x7ddcff},
 {id:'shotgun',name:'Gravedigger',kind:'gun',damage:9,rate:1.35,speed:650,spread:.38,pellets:9,mag:7,reload:1.4,color:0xffc87d},
 {id:'lance',name:'Void Lance',kind:'gun',damage:105,rate:.75,speed:1400,spread:0,pellets:1,mag:4,reload:1.9,pierce:7,color:0xc88cff},
 {id:'homing',name:'Cherub Swarm',kind:'homing',damage:19,rate:5.5,speed:460,turn:5.2,spread:.06,pellets:1,mag:24,reload:1.25,color:0xffef8a},
 {id:'comet',name:'Black Comet',kind:'gun',damage:31,rate:.7,speed:800,spread:.42,pellets:10,mag:4,reload:2.0,pierce:1,color:0xff86bf},
 {id:'blade',name:'Cathedral Blade',kind:'melee',damage:88,rate:2.1,range:92,arc:1.45,color:0xfff1c4},
 {id:'scythe',name:'Moon Scythe',kind:'melee',damage:135,rate:1.15,range:135,arc:2.35,color:0xc993ff},
 {id:'hammer',name:'Saintbreaker',kind:'melee',damage:225,rate:.62,range:105,arc:1.0,color:0xffa269}
];

export const ENEMIES=[
 {name:'Crawler',hp:48,speed:115,r:16,color:0x7bdb76,ai:'chase',damage:16,xp:16},
 {name:'Ash Bat',hp:35,speed:180,r:13,color:0xaa8cff,ai:'swoop',damage:12,xp:15},
 {name:'Bone Archer',hp:60,speed:72,r:17,color:0xe0d8bd,ai:'shooter',damage:15,xp:22},
 {name:'Cultist',hp:78,speed:80,r:18,color:0xd75873,ai:'radial',damage:16,xp:26},
 {name:'Spitter',hp:95,speed:64,r:20,color:0xb9dd56,ai:'triple',damage:16,xp:30},
 {name:'Wisp',hp:64,speed:105,r:14,color:0x65c2ff,ai:'orbit',damage:14,xp:26},
 {name:'Brute',hp:235,speed:54,r:30,color:0xb3754a,ai:'charge',damage:28,xp:58},
 {name:'Mirror Knight',hp:280,speed:76,r:25,color:0x9eafd0,ai:'burst',damage:22,xp:70},
 {name:'Maw',hp:180,speed:120,r:24,color:0x963f4a,ai:'chase',damage:26,xp:48},
 {name:'Bell Keeper',hp:210,speed:55,r:27,color:0xd3a149,ai:'rings',damage:19,xp:62},
 {name:'Shade',hp:120,speed:140,r:19,color:0x67527f,ai:'blink',damage:21,xp:45},
 {name:'Glass Seraph',hp:150,speed:92,r:21,color:0x93f1ea,ai:'spiral',damage:20,xp:55}
];

export const BOSSES=[
 {name:'THE RED ABBOT',hp:1900,r:58,color:0xcf3f57,pattern:'abbot'},
 {name:'CLOCK EATER',hp:2700,r:64,color:0xd2af4b,pattern:'clock'},
 {name:'THE PALE WIDOW',hp:3400,r:66,color:0xe7e7f2,pattern:'widow'},
 {name:'CHOIR BELOW',hp:4200,r:74,color:0x7452c6,pattern:'choir'},
 {name:'THE IRON SAINT',hp:5100,r:78,color:0xb98c65,pattern:'saint'},
 {name:'THE NULL KING',hp:6500,r:86,color:0xdedff0,pattern:'null'},
 {name:'MOTHER OF EYES',hp:7800,r:92,color:0x73d6bb,pattern:'eyes'},
 {name:'LAST CATHEDRAL',hp:9800,r:104,color:0xffc86b,pattern:'cathedral'}
];

export const UPGRADES=[
 {name:'Glass Cannon',desc:'+22% damage, -8% max HP',apply:p=>{p.damage*=1.22;p.maxHp*=.92;p.hp=Math.min(p.hp,p.maxHp)}},
 {name:'Quickblood',desc:'+13% fire/attack speed',apply:p=>p.fireRate*=1.13},
 {name:'Long Step',desc:'dash cooldown -18%',apply:p=>p.dashMax*=.82},
 {name:'Iron Marrow',desc:'+30 max HP, heal 30',apply:p=>{p.maxHp+=30;p.hp=Math.min(p.maxHp,p.hp+30)}},
 {name:'Predator Lens',desc:'+9% crit chance',apply:p=>p.crit+=.09},
 {name:'Magnet Heart',desc:'+35% pickup radius',apply:p=>p.pickup*=1.35},
 {name:'Overpressure',desc:'+16% projectile speed and +10% damage',apply:p=>{p.projectile*=1.16;p.damage*=1.10}},
 {name:'Second Mouth',desc:'+1 projectile/pellet',apply:p=>p.extraProjectiles++},
 {name:'Blood Interest',desc:'kill heal chance +10%',apply:p=>p.lifeSteal+=.10},
 {name:'Royal Purse',desc:'+35 coins now',apply:p=>p.coins+=35},
 {name:'Executioner',desc:'+30% damage to bosses',apply:p=>p.bossDamage*=1.30},
 {name:'Mercury Boots',desc:'+11% movement speed',apply:p=>p.speed*=1.11}
];
