"use strict";

/************************************************************************\

 Character - "inherits" from Entity
 Keeps track of the main character and it's stats and actions

\************************************************************************/

function Character(descr) {
	this.setup(descr);
	this.rotation = 0;
	this.Heal = clericSpells.heal(1,1);
    this.hp = this.Str*4;

};

Character.prototype = new Entity();

Character.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_rotation = this.rotation;
};

//Setting keys for movement and attack,
Character.prototype.KEY_UP    = UP_ARROW;
Character.prototype.KEY_DOWN  = DOWN_ARROW;
Character.prototype.KEY_LEFT  = LEFT_ARROW;
Character.prototype.KEY_RIGHT = RIGHT_ARROW;

Character.prototype.KEY_ATTACK = ' '.charCodeAt(0);
Character.prototype.KEY_HEAL   = '1'.charCodeAt(0);

//Charactercters attributes, level and experience
Character.prototype.Str  = 12;
Character.prototype.Dex  = 12;
Character.prototype.Wis  = 12;
Character.prototype.Spir = 12;

Character.prototype.lvl = 0;
Character.prototype.experience = 0;

Character.prototype.isCasting  = false;
Character.prototype.coolDown   = 0;



/*
//Charactercters Hit points, armor, energy and main attribute
Character.prototype.hp;
Character.prototype.armor;
Character.prototype.energy;
Character.prototype.maxEnergy;
Character.prototype.damage;

Character.prototype.mainAtt;
Character.prototype.secAtt;
Character.prototype.weakAtt;
*/



Character.prototype.update = function (du) {
    
    spatialManager.unregister(this);
    renderingManager.unregister(this);
    if (this._isDeadNow) return entityManager.KILL_ME_NOW;

    if (keys[this.KEY_HEAL] && !this.isCasting) 
    {
		this.isCasting = true;
		this.Heal.cast(this);
		this.coolDown = this.Heal.descr.duration;
    } else if(this.isCasting)
    {
    	this.coolDown -= du;
    	if( this.coolDown <= 0)
    	{
            this.coolDown = 0;
            this.isCasting = false;
    	}
    }
    
	this.move(du);
	this.model.update(du);

	spatialManager.register(this);
    renderingManager.register(this);

};

Character.prototype.move = function (du) {

	this.model.halt(); // if nothing is done, model halts
	
	if (keys[this.KEY_UP]){
		this.cy -= this.baseVel;

		this.model.walk();
		this.model.faceUp();
	}
	if (keys[this.KEY_DOWN]){
		this.cy += this.baseVel;

		this.model.walk();
		this.model.faceDown();
	}
	if (keys[this.KEY_LEFT]){
		this.cx -= this.baseVel;

		this.model.walk();
		this.model.faceLeft();
	}
	if (keys[this.KEY_RIGHT]){
		this.cx += this.baseVel;

		this.model.walk();
		this.model.faceRight();
	}

	if (keys[this.KEY_ATTACK])
		this.model.attack();

}

Character.prototype.render = function (ctx) {
	this.model.drawCentredAt(ctx, this.cx, this.cy);
};

Character.prototype.getRadius = function () {
    return (ANIMATION_FRAME_SIZE / 2) * 0.9;
};

Character.prototype.reset = function () {
    
};

Character.prototype.setAtt = function () {
	this.mainAtt++;
	this.Spir++;
	
	if(lvl%2 === 0){
		this.secAtt++;
	}
	if(lvl%3 === 0){
		this.weakAtt++;
	}
	
};

Character.prototype.lvlup = function () {
	this.lvl++;
};
