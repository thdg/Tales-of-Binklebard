// ==========
// Hero STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Hero(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.rememberResets();
    
    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.Hero;
    
    // Set normal drawing scale, and warp state off
    this._scale = 1;
    this._isWarping = false;
};

Hero.prototype = new Entity();

Hero.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_rotation = this.rotation;
};

Hero.prototype.KEY_UP    = charCode('W');
Hero.prototype.KEY_DOWN  = charCode('S');
Hero.prototype.KEY_LEFT  = charCode('A');
Hero.prototype.KEY_RIGHT = charCode('D');

Hero.prototype.KEY_ATTACK = charCode(' ');
    
Hero.prototype.update = function (du) {
    
    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);
    if (this._isDeadNow) return entityManager.KILL_ME_NOW;

    // Perform movement substeps
    var steps = this.numSubSteps;
    var dStep = du / steps;
    for (var i = 0; i < steps; ++i) {
        this.computeSubStep(dStep);
    }

    // Handle firing
    this.maybeFireBullet();

    // TODO: YOUR STUFF HERE! --- Warp if isColliding, otherwise Register
    var hitEntity = this.findHitEntity();
    if (hitEntity) {
        this.warp();
        var canWarp = hitEntity.warp;
        if (canWarp) canWarp.call(hitEntity); 
    } else {
        spatialManager.register(this);
    }

};

Hero.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9;
};

Hero.prototype.reset = function () {
    this.setPos(this.reset_cx, this.reset_cy);
    this.rotation = this.reset_rotation;
    
    this.halt();
};

Hero.prototype.updateRotation = function (du) {
    
};

Hero.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this._scale;
    this.sprite.drawWrappedCentredAt(
	   ctx, this.cx, this.cy, this.rotation
    );
    this.sprite.scale = origScale;
};
