"use strict";

// A generic contructor which accepts an arbitrary descriptor object
function Soldier(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
    this.rotation = 0;

    this.randomizePos();
    this.randomizeVelocity();

    this.hp = 100;
    this.armor = 50;
    this.damageTaken = 0;
    this.expReward = 500;
}

Soldier.prototype = new Entity();

Soldier.prototype.margin      = 7;
Soldier.prototype.damage      = 12;
Soldier.prototype.doingDamage = 0;

Soldier.prototype.randomizeVelocity = function () {

    var MIN_SPEED = 30,
        MAX_SPEED = 60;

    var ROT = [FACE_RIGHT, FACE_UP, FACE_LEFT, FACE_DOWN]
    this.rotation = ROT[util.randInt(0,ROT.length)];
    this.vel = util.randRange(MIN_SPEED, MAX_SPEED) / SECS_TO_NOMINALS;
};


Soldier.prototype.update = function (du) {

    spatialManager.unregister(this);
    renderingManager.unregister(this);

    if ( this.doingDamage >  0 ) this.doingDamage -= du;
    if ( this.doingDamage <= 0 ) this.doingDamage = 0;
    if ( this._isDeadNow ) {
        entityManager.getCharacter().addExp(this.expReward);
        return entityManager.KILL_ME_NOW;
    }

    this.move(du);
    this.model.update(du);

    spatialManager.register(this);
    renderingManager.register(this);
};

Soldier.prototype.move = function (du) {
    //this.model.halt(); // if nothing is done, model halts

    var speed = this.vel * du;

    var oldX = this.cx;
    var oldY = this.cy;


    if (this.rotation === FACE_RIGHT) {
        this.cx += this.vel * du;
        this.model.walk();
        this.model.faceRight();
    }
    else if (this.rotation === FACE_UP) {
        this.cy -= this.vel * du;
        this.model.walk();
        this.model.faceUp();
    }
    else if (this.rotation === FACE_LEFT) {
        this.cx -= this.vel * du;
        this.model.walk();
        this.model.faceLeft();
    }
    else if (this.rotation === FACE_DOWN) {
        this.cy += this.vel * du;
        this.model.walk();
        this.model.faceDown();
    }
    else this.randomizeVelocity();

    var collision  = spatialManager.findEntityInRange(this.cx, this.cy, this.getRadius());
    if (collision) this.hit(collision);

    if (world.collidesWith(this.cx, this.cy, this.getRadius())) {
        this.cx = oldX;
        this.cy = oldY;
        this.randomizeVelocity();
    }
};

Soldier.prototype.hit = function(collision)
{
    var characterID = entityManager.getCharacter().getSpatialID();
    
    if (characterID === collision.getSpatialID() && this.doingDamage <= 0)
    {
        this.doingDamage = 0.25*SECS_TO_NOMINALS;
        
        collision.takeDamage(this.damage);

    }
}

Soldier.prototype.getRadius = function () {
    return (ANIMATION_FRAME_SIZE / 2) * 0.6;
};

Soldier.prototype.takeDamage = function (damage, ignoreArmor) {

    if (ignoreArmor===undefined) ignoreArmor = false;

    var damageReduction = ignoreArmor ? 1 : this.armor/this.hp;
    var totalDamage = damage * damageReduction
    this.damageTaken += totalDamage;
    particleManager.generateTextParticle(this.cx, this.cy, totalDamage);

    if (this.damageTaken>this.hp) this.kill();
};

Soldier.prototype.getHpRatio = function () {
    return Math.max(0,(this.hp-this.damageTaken)/this.hp);
};

Soldier.prototype._dropLoot = function () {
    entityManager.generateLoot({
        cx : this.cx,
        cy : this.cy,
    });
};

Soldier.prototype.render = function (ctx) {
    this.model.drawCentredAt(ctx, this.cx, this.cy-this.margin);
    this.renderHP(ctx);
};

Soldier.prototype.renderHP = function (ctx) {
    var x = this.cx, y = this.cy;
    var w = 50, h = 6;
    var offsetY = 50;
    var padding = 1;

    var hpLeft = this.getHpRatio();
    var hpStyle = hpLeft>0.5  ? "green"  :
                  hpLeft>0.25 ? "orange" : "red";

    util.fillBox(
        ctx, 
        x-w/2-padding, 
        y-offsetY-padding, 
        w+padding*2, 
        h+padding*2,
        "black"
    );
    util.fillBox(
        ctx, 
        x-w/2, 
        y-offsetY, 
        w*hpLeft, 
        h, 
        hpStyle
    );
}
