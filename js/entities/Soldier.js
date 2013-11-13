// ====
// Soldier
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Soldier(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
    this.rotation = 0;

    this.randomizePosition();
    this.randomizeVelocity();
      
    // Default sprite and scale, if not otherwise specified
    //this.sprite = this.sprite || g_sprites.Soldier;
    //this.scale  = this.scale  || 1;


    // Diagnostics to check inheritance stuff
    
    /*
    this._SoldierProperty = true;
    console.dir(this); 
    */

}

Soldier.prototype = new Entity();

Soldier.prototype.margin = 7;

Soldier.prototype.randomizePosition = function () {
    
    // Soldier randomisation defaults (if nothing otherwise specified)
    this.cx = this.cx || Math.random() * world.getWidth();
    this.cy = this.cy || Math.random() * world.getHeight();

    while (world.getRegion().collidesWith({ posX: this.cx, posY: this.cy}, this.getRadius())) {
        this.cx = Math.random() * world.getWidth();
        this.cy = Math.random() * world.getHeight();
    }

};

Soldier.prototype.randomizeVelocity = function () {
    var MIN_SPEED = 30,
        MAX_SPEED = 60;

    var MIN = 0,
        MAX = 4;

    this.rotation = Math.floor(util.randRange(MIN, MAX));
    this.vel = util.randRange(MIN_SPEED, MAX_SPEED) / SECS_TO_NOMINALS;


};


Soldier.prototype.update = function (du) {

    spatialManager.unregister(this);
    renderingManager.unregister(this);
    if (this._isDeadNow)
        return entityManager.KILL_ME_NOW;

    this.move(du);
    this.model.update(du);

    spatialManager.register(this);
    renderingManager.register(this);

};

Soldier.prototype.move = function (du) {
    //this.model.halt(); // if nothing is done, model halts

    var speed = this.vel * du;
    var height  = world.getHeight();
    var width = world.getWidth();

    var oldX = this.cx;
    var oldY = this.cy;


    if (this.rotation === 0 && (this.cx + speed) < width) {
        this.cx += speed;
        this.model.walk();
        this.model.faceRight();
    }

    else if (this.rotation === 1 && (this.cy - speed ) > 0) {
        this.cy -= speed;
        this.model.walk();
        this.model.faceUp();
    }
        
    else if (this.rotation === 2 && (this.cx - speed) > 0) {
        this.cx -= speed;
        this.model.walk();
        this.model.faceLeft();
    }

    else if (this.rotation === 3 && (this.cy + speed) < height) {
        this.cy += speed;
        this.model.walk();
        this.model.faceDown();
    }
    else this.randomizeVelocity();

    if (world.getRegion().collidesWith({ posX: this.cx, posY: this.cy}, this.getRadius())) {
        this.cx = oldX;
        this.cy = oldY;
        this.randomizeVelocity();
    }


};

Soldier.prototype.getRadius = function () {
    return (ANIMATION_FRAME_SIZE / 2) * 0.6;
};

// HACKED-IN AUDIO (no preloading)
/*
Soldier.prototype.hitSound = new Audio(
  "sounds/SoldierSplit.ogg");
Soldier.prototype.killSound = new Audio(
  "sounds/SoldierEvaporate.ogg");
*/

Soldier.prototype.takeHit = function () {
    this.kill();
    //this.dropLoot();
};

Soldier.prototype._dropLoot = function () {
    entityManager.generateLoot({
        cx : this.cx,
        cy : this.cy,
    });
};

Soldier.prototype.render = function (ctx) {
    this.model.drawCentredAt(ctx, this.cx, this.cy-this.margin);
};
