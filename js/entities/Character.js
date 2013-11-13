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

Character.prototype.str  = 12;
Character.prototype.dex  = 12;
Character.prototype.wis  = 12;
Character.prototype.spirit = 12;

Character.prototype.lvl = 1;
Character.prototype.experience = 0;

Character.prototype.hp = 100;
Character.prototype.armor = 25;
Character.prototype.energy = 100;
Character.prototype.damage = 10;

Character.prototype.damageTaken = 0;
Character.prototype.energyUsed = 0;

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

Character.prototype.drainEnergy = function(energy)
{
    return true;
};

Character.prototype.strike = function()
{
    var strikeX = 16*Math.cos(util.getRadFromDir(this.direction));
    var strikeY = 16*Math.sin(util.getRadFromDir(this.direction));
    var target = spatialManager.findEntityInRange(this.cx+strikeX,this.cy+strikeY,15);
    if ( target )
    {
        target.kill();
    }
}

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
    {
        this.model.attack();
        this.strike();
    }

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

Character.prototype.lvlup = function () {
    this.lvl++;
    this.updateStats();
};

Character.prototype.addExp = function (expReward) {

    this.experience = this.experience + expReward;
    if (this.experience >= (lvl * lvl * 1000) + lvl * 2000) {
        this.lvlup();
    }
};

Character.prototype.takeDamage = function (damage, ignoreArmor) {

    if (ignoreArmor===undefined) ignoreArmor = false;

    var damageReduction = ignoreArmor ? 1 : this.armor/this.hp;
    this.damageTaken -= damage * damageReduction;

    if (this.damageTaken<this.hp) this._isDeadNow = true;
}

Character.prototype.getHpRatio = function () {

    return (this.hp-this.damageTaken)/this.hp;
};

Character.prototype.getEnergyRatio = function () {

    return (this.energy-this.energyUsed)/this.energy;
};
