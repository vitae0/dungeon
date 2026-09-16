import {Game} from './game/Game.js';

const canvas=document.getElementById('game-canvas');
const hud=document.getElementById('hud');
const modal=document.getElementById('modal');
const game=new Game(canvas,hud,modal);
game.chooseClass();

if(import.meta.env.DEV) window.__game=game;
