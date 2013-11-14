"use strict";

/*************************************************************************\

Provides a set of common functions which can be "inherited" by all other
game Entities.

JavaScript's prototype-based inheritance system is unusual, and requires 
some care in use. In particular, this "base" should only provide shared
functions... shared data properties are potentially quite confusing.

\************************************************************************/

function Entity() {

/*
    // Diagnostics to check inheritance stuff
    this._entityProperty = true;
    console.dir(this);
*/

}

Entity.prototype.setup = function (descr) {

    // Apply all setup properies from the (optional) descriptor
    for (var property in descr) {
        this[property] = descr[property];
    }
    
    // Get my (unique) IDs
    this._spatialID = spatialManager.getNewSpatialID();
    this._renderingID = renderingManager.getNewRenderingID();
    
    // I am not dead yet!
    this._isDeadNow = false;
};

Entity.prototype.baseVel = 256/SECS_TO_NOMINALS;

Entity.prototype.attacking = false;

Entity.prototype.setPos = function (cx, cy) {
    spatialManager.unregister(this);
    this.cx = cx;
    this.cy = cy;
    spatialManager.register(this);
};

Entity.prototype.randomizePos = function () {
    
    this.cx = this.cx || Math.random() * world.getWidth();
    this.cy = this.cy || Math.random() * world.getHeight();

    while (world.getRegion().collidesWith({ posX: this.cx, posY: this.cy}, this.getRadius())) {
        this.cx = Math.random() * world.getWidth();
        this.cy = Math.random() * world.getHeight();
    }

};

Entity.prototype.getPos = function () {
    return {posX : this.cx, posY : this.cy};
};

// this method is "abstract"
Entity.prototype.getRadius = function () {
    return 0;
};

Entity.prototype.getSpatialID = function () {
    return this._spatialID;
};

Entity.prototype.getRenderingID = function () {
    return this._renderingID;
};

Entity.prototype.kill = function () {
    this._isDeadNow = true;
};

Entity.prototype.findHitEntity = function () {
    var pos = this.getPos();
    return spatialManager.findEntityInRange(
        pos.posX, pos.posY, this.getRadius()
    );
};

Entity.prototype.isColliding = function () {
    return this.findHitEntity();
};