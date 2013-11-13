"use strict";

/************************************************************************\

 Character - "inherits" from Entity
 Keeps track of the main character and it's stats and actions

\************************************************************************/

function Character(descr) {

	this.setup(descr);
	this.rotation = 0;

    // TEMPORARY
    // =========
	this.Heal         = spellBook.heal(1,1);
    this.MagicMissile = spellBook.magicMissile(1,1);
    this.hp = this.Str*4;
    // =========

}

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

Character.prototype.margin = 7;

Character.prototype.direction = FACE_DOWN;

// TEMPROARY
Character.prototype.KEY_HEAL         = '1'.charCodeAt(0);
Character.prototype.KEY_MAGIC_MISSLE = '2'.charCodeAt(0);

// NEEDS REFINEMENT
Character.prototype.isCasting  = false;
Character.prototype.coolDown   = 0;

//Charactercters attributes, level and experience
Character.prototype.Str  = 12;
Character.prototype.Dex  = 12;
Character.prototype.Wis  = 12;
Character.prototype.Spir = 12;

Character.prototype.lvl = 0;
Character.prototype.experience = 0;





/*
//Charactercters Hit points, armor, energy and main attribute
Character.prototype.hp;
Character.prototype.armor;
Character.prototype.energy;
Character.prototype.maxEnergy;
Character.prototype.damage;
*/



Character.prototype.update = function (du) {
    
    spatialManager.unregister(this);
    renderingManager.unregister(this);
    if (this._isDeadNow) return entityManager.KILL_ME_NOW;


    
    this.move(du);
    this.abilities(du);
    this.model.update(du);

    spatialManager.register(this);
    renderingManager.register(this);

};

Character.prototype.abilities = function(du)
{
    // CONSIDER CHANGING THIS
    // ======================
    if (keys[this.KEY_HEAL] && !this.isCasting) 
    {
        this.isCasting = true;
        this.Heal.cast(this);
        this.coolDown = this.Heal.descr.coolDown;

        this.model.attack();    //should be model.cast();

    } else if(this.isCasting)
    {
        this.coolDown -= du;
        if( this.coolDown <= 0)
        {
            this.coolDown = 0;
            this.isCasting = false;
        }
    }

    if (keys[this.KEY_MAGIC_MISSLE] && !this.isCasting) 
    {
        this.isCasting = true;
        this.MagicMissile.cast(this);
        this.coolDown = this.MagicMissile.descr.coolDown;

        this.model.attack();    //should be model.cast();

    } else if(this.isCasting)
    {
        this.coolDown -= du;
        if( this.coolDown <= 0)
        {
            this.coolDown = 0;
            this.isCasting = false;
        }
    }
    // ======================
}

Character.prototype.move = function (du) {

    this.model.halt(); // if nothing is done, model halts
    
    var oldX = this.cx;
    var oldY = this.cy;

    if (keys[this.KEY_UP]){
        this.cy -= this.baseVel*du;
        this.direction = FACE_UP;

        this.model.walk();
        this.model.faceUp();
    }
    if (keys[this.KEY_DOWN]){
        this.cy += this.baseVel*du;
        this.direction = FACE_DOWN;

        this.model.walk();
        this.model.faceDown();
    }
    if (keys[this.KEY_LEFT]){
        this.cx -= this.baseVel*du;
        this.direction = FACE_LEFT;

        this.model.walk();
        this.model.faceLeft();
    }
    if (keys[this.KEY_RIGHT]){
        this.cx += this.baseVel*du;
        this.direction = FACE_RIGHT;

        this.model.walk();
        this.model.faceRight();
    }

    if (keys[this.KEY_ATTACK])
        this.model.attack();

    if (world.getRegion().collidesWith({ posX: this.cx, posY: this.cy}, this.getRadius())) {
        this.cx = oldX;
        this.cy = oldY;
    }

};

Character.prototype.render = function (ctx) {
    this.model.drawCentredAt(ctx, this.cx, this.cy-this.margin);
};

Character.prototype.getRadius = function () {
    return (ANIMATION_FRAME_SIZE / 2) * 0.6;
};

Character.prototype.reset = function () {
    
};

Character.prototype.lvlup = function () {
    this.lvl++;
};
