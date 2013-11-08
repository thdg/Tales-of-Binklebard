// ====
// Monster
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Monster(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
    this.rotation = 0;

    this.randomisePosition();
    this.randomiseVelocity();
      
    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite || g_sprites.Monster;
    this.scale  = this.scale  || 1;


    // Diagnostics to check inheritance stuff
    /*
    this._MonsterProperty = true;
    console.dir(this); */


}

Monster.prototype = new Entity();

Monster.prototype.randomisePosition = function () {
    var MIN = 0,
        MAX = 3;
    // Monster randomisation defaults (if nothing otherwise specified)
    this.cx = this.cx || Math.random() * g_canvas.width;
    this.cy = this.cy || Math.random() * g_canvas.height;
    this.rotation = util.randRange(MIN, MAX);
};


Monster.prototype.update = function (du) {

    spatialManager.unregister(this);
    if(this._isDeadNow)
        return entityManager.KILL_ME_NOW;

    this.cx += this.vel * du;
    this.cy += this.vel * du;

    spatialManager.register(this);

};

Monster.prototype.getRadius = function () {
    return this.scale * (this.sprite.width / 2) * 0.9;
};

// HACKED-IN AUDIO (no preloading)
/*
Monster.prototype.hitSound = new Audio(
  "sounds/MonsterSplit.ogg");
Monster.prototype.killSound = new Audio(
  "sounds/MonsterEvaporate.ogg");
*/

Monster.prototype.takeHit = function () {
    this.kill();
    this.dropLoot();
};

Monster.prototype._dropLoot = function () {
    entityManager.generateLoot({
        cx : this.cx,
        cy : this.cy,
    });
};

Monster.prototype.render = function (ctx) {
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};
