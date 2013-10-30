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

// Initial, inheritable, default values
Hero.prototype.rotation = 0;
Hero.prototype.cx = 300;
Hero.prototype.cy = 300;
Hero.prototype.velX = 0;
Hero.prototype.velY = 0;
Hero.prototype.launchVel = 2;
Hero.prototype.numSubSteps = 1;

// HACKED-IN AUDIO (no preloading)
Hero.prototype.warpSound = new Audio("sounds/HeroWarp.ogg");
    
Hero.prototype.update = function (du) {

    // Handle warping
    if (this._isWarping) {
        this._updateWarp(du);
        return;
    }
    
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

Hero.prototype.computeSubStep = function (du) {
    
    var thrust = this.computeThrustMag();

    // Apply thrust directionally, based on our rotation
    var accelX = +Math.sin(this.rotation) * thrust;
    var accelY = -Math.cos(this.rotation) * thrust;
    
    accelY += this.computeGravity();

    this.applyAccel(accelX, accelY, du);
    
    this.wrapPosition();
    
    if (thrust === 0 || g_allowMixedActions) {
        this.updateRotation(du);
    }
};

Hero.prototype.computeGravity = function () {
    return g_useGravity ? consts.NOMINAL_GRAVITY : 0;
};

var NOMINAL_THRUST = +0.2;
var NOMINAL_RETRO  = -0.1;

Hero.prototype.computeThrustMag = function () {
    
    var thrust = 0;
    
    if (keys[this.KEY_THRUST]) {
        thrust += NOMINAL_THRUST;
    }
    if (keys[this.KEY_RETRO]) {
        thrust += NOMINAL_RETRO;
    }
    
    return thrust;
};

Hero.prototype.applyAccel = function (accelX, accelY, du) {
    
    // u = original velocity
    var oldVelX = this.velX;
    var oldVelY = this.velY;
    
    // v = u + at
    this.velX += accelX * du;
    this.velY += accelY * du; 

    // v_ave = (u + v) / 2
    var aveVelX = (oldVelX + this.velX) / 2;
    var aveVelY = (oldVelY + this.velY) / 2;
    
    // Decide whether to use the average or not (average is best!)
    var intervalVelX = g_useAveVel ? aveVelX : this.velX;
    var intervalVelY = g_useAveVel ? aveVelY : this.velY;
    
    // s = s + v_ave * t
    var nextX = this.cx + intervalVelX * du;
    var nextY = this.cy + intervalVelY * du;
    
    // bounce
    if (g_useGravity) {

	var minY = g_sprites.Hero.height / 2;
	var maxY = g_canvas.height - minY;

	// Ignore the bounce if the Hero is already in
	// the "border zone" (to avoid trapping them there)
	if (this.cy > maxY || this.cy < minY) {
	    // do nothing
	} else if (nextY > maxY || nextY < minY) {
            this.velY = oldVelY * -0.9;
            intervalVelY = this.velY;
        }
    }
    
    // s = s + v_ave * t
    this.cx += du * intervalVelX;
    this.cy += du * intervalVelY;
};

Hero.prototype.maybeFireBullet = function () {

    if (keys[this.KEY_FIRE]) {
    
        var dX = +Math.sin(this.rotation);
        var dY = -Math.cos(this.rotation);
        var launchDist = this.getRadius() * 1.2;
        
        var relVel = this.launchVel;
        var relVelX = dX * relVel;
        var relVelY = dY * relVel;

        entityManager.fireBullet(
           this.cx + dX * launchDist, this.cy + dY * launchDist,
           this.velX + relVelX, this.velY + relVelY,
           this.rotation);
           
    }
    
};

Hero.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9;
};

Hero.prototype.takeBulletHit = function () {
    this.warp();
};

Hero.prototype.reset = function () {
    this.setPos(this.reset_cx, this.reset_cy);
    this.rotation = this.reset_rotation;
    
    this.halt();
};

Hero.prototype.halt = function () {
    this.velX = 0;
    this.velY = 0;
};

var NOMINAL_ROTATE_RATE = 0.1;

Hero.prototype.updateRotation = function (du) {
    if (keys[this.KEY_LEFT]) {
        this.rotation -= NOMINAL_ROTATE_RATE * du;
    }
    if (keys[this.KEY_RIGHT]) {
        this.rotation += NOMINAL_ROTATE_RATE * du;
    }
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
