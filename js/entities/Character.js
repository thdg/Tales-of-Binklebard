// ==========
// Character
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Chara(descr) {


};

Chara.prototype = new Entity();

Chara.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_rotation = this.rotation;
};

//Setting keys for movement and attack,
Chara.prototype.KEY_UP    = charCode('W');
Chara.prototype.KEY_DOWN  = charCode('S');
Chara.prototype.KEY_LEFT  = charCode('A');
Chara.prototype.KEY_RIGHT = charCode('D');

Chara.prototype.KEY_ATTACK = charCode(' ');

//Characters attributes, level and experience
Chara.prototype.Str = 12;
Chara.prototype.Dex = 12;
Chara.prototype.Wis = 12;
Chara.prototype.Spir = 12;

Chara.prototype.lvl = 0;
Chara.prototype.experience = 0;

//Characters Hit points, armor, energy and main attribute
Chara.prototype.hp;
Chara.prototype.armor;
Chara.prototype.energy;
Chara.prototype.maxEnergy;
Chara.prototype.damage;

Chara.prototype.mainAtt;
Chara.prototype.secAtt;
Chara.prototype.weakAtt;

Chara.prototype.update = function (du) {
    
    spatialManager.unregister(this);
    if (this._isDeadNow) return entityManager.KILL_ME_NOW;
	
};

Chara.prototype.render = function (ctx) {
};

Chara.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9;
};

Chara.prototype.reset = function () {
    
};

Chara.prototype.setAtt = function () {
	this.mainAtt++;
	this.Spir;
	
	if(lvl%2 === 0){
		this.secAtt++;
	}
	if(lvl%3 === 0){
		this.weakAtt++;
	}
	
};

Chara.prototype.setlvl = function () {
	this.lvl++;
};