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
Character.prototype.PICK_UP   = util.charCode('E');
Character.prototype.USE_HP    = util.charCode('V');
Character.prototype.USE_EP    = util.charCode('B');

Character.prototype.marginBottom = 7;

Character.prototype.direction = FACE_DOWN; // default direction

Character.prototype.KEY_ATTACK = util.charCode(' ');

// NEEDS REFINEMENT
Character.prototype.isCasting    = false;
Character.prototype.coolDown     = 0;
//

Character.prototype.str          = 12;
Character.prototype.dex          = 12;
Character.prototype.wis          = 12;
Character.prototype.spirit       = 12;

Character.prototype.lvl          = 1;
Character.prototype.experience   = 0;

Character.prototype.hp           = 100;
Character.prototype.armor        = 25;
Character.prototype.missChange   = 0;
Character.prototype.energy       = 100;
Character.prototype.damage       = 0;

Character.prototype.critChance   = 0;
Character.prototype.critModifier = 0;
Character.prototype.spellCritChance = 0;
Character.prototype.spellCritModifier = 0;

Character.prototype.lifeRegen    = 0;
Character.prototype.energyRegen  = 0;

Character.prototype.damageTaken  = 0;
Character.prototype.energyUsed   = 0;
Character.prototype.doingDamage  = 0;

Character.prototype.backpack = new Backpack();

Character.prototype.update = function (du) {
    
    if (this.doingDamage <  0 ) this.doingDamage -= du;
    if (this.doingDamage >= 0 ) this.doingDamage  = 0;

    spatialManager.unregister(this);
    renderingManager.unregister(this);

    if (this._isDeadNow) return entityManager.KILL_ME_NOW;

    this.move(du);
    this.pickUp(du);
    this.abilities(du);
    this.model.update(du);
    if (this.backpack) this.backpack.update(this);

    this.energyUsed = Math.max(0, this.energyUsed-this.energyRegen/SECS_TO_NOMINALS*du);
    this.damageTaken = Math.max(0, this.damageTaken-this.lifeRegen/SECS_TO_NOMINALS*du);
    
    spatialManager.register(this);
    renderingManager.register(this);
};

Character.prototype.strike = function(){
    var strikeX = 16*Math.cos(util.getRadFromDir(this.direction));
    var strikeY = 16*Math.sin(util.getRadFromDir(this.direction));
    var target = spatialManager.findEntityInRange(this.cx+strikeX,this.cy+strikeY,15);

    if ( target && this.doingDamage <= 0){
        g_audio.strike.play()
        var totalDamage = this.critCheck();
        this.doingDamage = 0.5*SECS_TO_NOMINALS;
        target.takeDamage(totalDamage);
    }
};

Character.prototype.cast = function(spell) {
    this.isCasting = true;
    spell.cast(this);
    this.coolDown = spell.descr.coolDown;
    this.model.attack(); //should be model.cast();
};


Character.prototype.critCheck = function(){
    if (this.critChance >= (Math.random() * 100)){
        return ((this.damage + this.str) * this.critModifier);
    }
    else return (this.damage + this.str);
};

Character.prototype.spellCritCheck = function(damage,cx,cy){
    if (this.critChance >= (Math.random() * 100)) {
        particleManager.generateTextParticle(cx, cy, "Critical Hit!");
        return damage * this.critModifier;
    }
    else return damage;
};

Character.prototype.move = function (du) {

    this.model.halt(); // if nothing is done, model halts
    
    var oldX = this.cx;
    var oldY = this.cy;

    if ( keys[this.KEY_UP] ){
        this.cy -= this.baseVel*du;
        this.direction = FACE_UP;

        this.model.walk();
        this.model.faceUp();
    }
    if ( keys[this.KEY_DOWN] ){
        this.cy += this.baseVel*du;
        this.direction = FACE_DOWN;

        this.model.walk();
        this.model.faceDown();
    }
    if ( keys[this.KEY_LEFT] ){
        this.cx -= this.baseVel*du;
        this.direction = FACE_LEFT;

        this.model.walk();
        this.model.faceLeft();
    }
    if ( keys[this.KEY_RIGHT] ){
        this.cx += this.baseVel*du;
        this.direction = FACE_RIGHT;

        this.model.walk();
        this.model.faceRight();
    }

    if ( keys[this.KEY_ATTACK] ) {
        this.model.attack();
        this.strike();
    }

    var collisionX = spatialManager.findEntityInRange(this.cx, oldY, this.getRadius());
    var collisionY = spatialManager.findEntityInRange(oldX, this.cy, this.getRadius());

    var collision = collisionX || collisionY;
    if (collision && collision.setDirection) 
        collision.setDirection(this.direction+2);
    

    if (world.collidesWith(oldX, this.cy, this.getRadius()) || (collisionY && collisionY.isEnemy)) 
        this.cy = oldY;
    

    if (world.collidesWith(this.cx, oldY, this.getRadius()) || (collisionX && collisionX.isEnemy)) 
        this.cx = oldX;
    

};

Character.prototype.pickUp = function(du) {
    if ( eatKey(this.PICK_UP) ){
        var loot = entityManager.findNearestItem(this.cx, this.cy);
        if (loot && loot.theDistanceSq<25*25) loot.theItem.pickUp(this);
    }
};

Character.prototype.render = function (ctx) {
    this.model.drawCentredAt(ctx, this.cx, this.cy-this.marginBottom);
};

Character.prototype.getRadius = function () {
    return (ANIMATION_FRAME_SIZE / 2) * 0.6;
};

Character.prototype.getModel = function () {
    return this.playerClass;
};

Character.prototype.lvlup = function () {
    this.lvl++;
    particleManager.generateTextParticle(this.cx, this.cy, "level "+this.lvl, '#FFFF00', 1000);
    this.updateStats();
    this.nextExp = this.nextLvl(this.lvl);
    entityManager.updateSoldiers(this.lvl);
};

Character.prototype.addExp = function (expReward) {
    this.experience = this.experience + expReward;
    particleManager.generateTextParticle(this.cx, this.cy, expReward + " exp", '#FFFF00');
    if (this.experience >= this.nextExp) {
        this.lvlup();
    }
};

Character.prototype.nextLvl = function(lvl) {
    return ((lvl * lvl * 1000) + lvl * 2000);
};

Character.prototype.getLvl = function() {
    return this.lvl;
};

Character.prototype.takeDamage = function (damage, ignoreArmor) {
    if ( ignoreArmor === undefined ) ignoreArmor = false;

    var damageReduction = ignoreArmor ? 0 : this.armor/this.hp;
    var totalDamage = damage * (1 - damageReduction);
     
    if (this.missChange <= Math.random()){
        this.damageTaken += totalDamage;
        particleManager.generateSplash(this.cx, this.cy, 20);
    }
    else particleManager.generateTextParticle(this.cx, this.cy, 'Miss', '#FF0000');

    if ( this.damageTaken > this.hp ) this.kill();
};

Character.prototype.heal = function (hpBoost) {
    this.damageTaken = Math.max(0, this.damageTaken-hpBoost);
    particleManager.generateTextParticle(this.cx, this.cy, hpBoost, '#00FF00');
};

Character.prototype.energyBoost = function (energyBoost) {
    this.energyUsed = Math.max(0, this.energyUsed-energyBoost);
    particleManager.generateTextParticle(this.cx, this.cy, energyBoost, '#0000FF');
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
