"use strict";

/************************************************************************\

 Character - "inherits" from Entity
 Keeps track of the main character and it's stats and actions

\************************************************************************/

function Character(descr) {

}

Character.prototype = new Entity();

//Setting keys for movement and attack,
Character.prototype.KEY_UP    = UP_ARROW;
Character.prototype.KEY_DOWN  = DOWN_ARROW;
Character.prototype.KEY_LEFT  = LEFT_ARROW;
Character.prototype.KEY_RIGHT = RIGHT_ARROW;

Character.prototype.marginBottom = 7;

Character.prototype.direction = FACE_DOWN; // default direction

Character.prototype.KEY_ATTACK = ' '.charCodeAt(0);

// NEEDS REFINEMENT
Character.prototype.isCasting    = false;
Character.prototype.coolDown     = 0;

Character.prototype.str          = 12;
Character.prototype.dex          = 12;
Character.prototype.wis          = 12;
Character.prototype.spirit       = 12;

Character.prototype.lvl          = 1;
Character.prototype.experience   = 0;

Character.prototype.hp           = 100;
Character.prototype.armor        = 25;
Character.prototype.energy       = 100;
Character.prototype.damage       = 10;

Character.prototype.damageTaken  = 0;
Character.prototype.energyUsed   = 0;
Character.prototype.doingDamage  = 0;

Character.prototype.update = function (du) {
    
    if (this.doingDamage <  0 ) this.doingDamage -= du;
    if (this.doingDamage >= 0 ) this.doingDamage  = 0;

    spatialManager.unregister(this);
    renderingManager.unregister(this);
    if (this._isDeadNow) return entityManager.KILL_ME_NOW;

    this.move(du);
    this.abilities(du);
    this.model.update(du);

    var energyRegen = 0.5*this.spirit/SECS_TO_NOMINALS*du;
    this.energyUsed = Math.max(0, this.energyUsed-energyRegen);

    spatialManager.register(this);
    renderingManager.register(this);
};

Character.prototype.strike = function()
{
    var strikeX = 16*Math.cos(util.getRadFromDir(this.direction));
    var strikeY = 16*Math.sin(util.getRadFromDir(this.direction));
    var target = spatialManager.findEntityInRange(this.cx+strikeX,this.cy+strikeY,15);

    if ( target && this.doingDamage <= 0)
    {
        var totalDamage = this.damage + this.str+this.dex;
        this.doingDamage = 0.5*SECS_TO_NOMINALS;
        target.takeDamage(totalDamage);
    }
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

    if (world.collidesWith(this.cx, this.cy, this.getRadius())) {
        this.cx = oldX;
        this.cy = oldY;
    }

};

Character.prototype.render = function (ctx) {
    this.model.drawCentredAt(ctx, this.cx, this.cy-this.marginBottom);
};

Character.prototype.getRadius = function () {
    return (ANIMATION_FRAME_SIZE / 2) * 0.6;
};

Character.prototype.lvlup = function () {
    this.lvl++;
	particleManager.generateTextParticle(this.cx, this.cy, "lvl up!", '#FFFF00', 1000);
	this.nextExp = this.nextLvl(this.lvl);
};

Character.prototype.nextLvl = function(lvl) {

    return ((lvl * lvl * 1000) + lvl * 2000);
};

Character.prototype.takeDamage = function (damage, ignoreArmor) {

    if (ignoreArmor===undefined) ignoreArmor = false;

    var damageReduction = ignoreArmor ? 1 : this.armor/this.hp;
    var totalDamage = damage * damageReduction;
    this.damageTaken += totalDamage;
    particleManager.generateSplash(this.cx, this.cy, 20);

    if (this.damageTaken>this.hp) this.kill();
};

Character.prototype.heal = function (hpBoost) {
    this.damageTaken = Math.max(0, this.damageTaken-hpBoost);
    particleManager.generateTextParticle(this.cx, this.cy, hpBoost, '#00FF00');
};

Character.prototype.getHpRatio = function () {

    return Math.max(0,(this.hp-this.damageTaken)/this.hp);
};

Character.prototype.getEnergyRatio = function () {

    return Math.max(0,(this.energy-this.energyUsed)/this.energy);
};

Character.prototype.drainEnergy = function (cost) {

    if (this.energyUsed+cost>this.energy) return false;

    this.energyUsed += cost;
    return true;
};
