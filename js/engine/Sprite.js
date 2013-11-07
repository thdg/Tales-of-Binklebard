// ============
// SPRITE STUFF
// ============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// Construct a "sprite" from the given `image`,
//
function Sprite(content, common) {
    //this.image = image;
    if (arguments.length === 1)
    {    
        this.image = content;
        this.width = content.width;
        this.height = content.height;
        this.scale = 1;
        this.animation = false;
        this.reflect = false;
    }
    else
    {
        console.log(content);
        this.motion    = content;
        this._default   = content.haltDown;
        this._thrust    = content.thrustDown;
        this._setValues(this._default);
        this._setValues(common);
        this.stripx    = 0;
        this.animation = true;
    }
}

Sprite.prototype._setValues = function(descr)
{
    for (var property in descr) {
        this[property] = descr[property];
    }
}

Sprite.prototype.setDefault  = function (dir)
{
    switch (dir)
    {
        case FACE_RIGHT:
            this._default = this.motion.haltRight;
            this._thrust  = this.motion.thrustRight;
            break;
        case FACE_LEFT:
            this._default = this.motion.haltLeft;
            this._thrust  = this.motion.thrustLeft;
            break;
        case FACE_DOWN:
            this._default = this.motion.haltDown;
            this._thrust  = this.motion.thrustDown;
            break;
        case FACE_UP:
            this._default = this.motion.haltUp;
            this._thrust  = this.motion.thrustUp;
            break;

    }
}

Sprite.prototype.moveUp = function ()
{
    this._setValues(this.motion.up);
}

Sprite.prototype.moveLeft = function ()
{
    this._setValues(this.motion.left);
    //this.reflect = true;
}

Sprite.prototype.moveRight = function ()
{
    this._setValues(this.motion.right);
}

Sprite.prototype.moveDown = function ()
{
    this._setValues(this.motion.down);
}

Sprite.prototype.halt = function ()
{
    this._setValues(this._default);
}

Sprite.prototype.thrust = function ()
{
    this._setValues(this._thrust);
}

Sprite.prototype.dist  = 0;
Sprite.prototype.state = 0;
Sprite.prototype.hz   = SECS_TO_NOMINALS/12;

Sprite.prototype.configureAnimation = function(vel,rotation,thrusting)
{
    this.halt(); 

    if (vel !== 0) this.computeMovement(rotation);

    if (thrusting) this.thrust();

    this.dist += vel;
    console.log(this.dist);
    if(this.dist >= this.hz)
    {
        
        this.state += 1;
        if (this.state >= this.strips)
        {
            this.state = 0;
        }
        
        this.dist  %= this.hz;
    }

    this.state %= this.strips;
    this.stripx = this.next * this.state;
}

Sprite.prototype.computeMovement = function(rotation)
{
    switch (rotation)
    {
        case FACE_RIGHT:
            this.moveRight();
            this.setDefault(FACE_RIGHT);
            break;
        case FACE_UP:
            this.moveUp();
            this.setDefault(FACE_UP);
            break;
        case FACE_LEFT:
            this.moveLeft();
            this.setDefault(FACE_LEFT);
            break;
        case FACE_DOWN:
            this.moveDown();
            this.setDefault(FACE_DOWN);
            break;
    }
}


Sprite.prototype.drawAt = function (ctx, x, y) {
    ctx.drawImage(this.image, x, y);
};

Sprite.prototype.drawCentredAt = function (ctx, cx, cy, rotation) {

    if (rotation === undefined) rotation = 0;
    
    var w = this.width,
        h = this.height;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);

    if (this.reflect)
        ctx.scale(-this.scale, this.scale);
    else
        ctx.scale(this.scale, this.scale);
    
    // drawImage expects "top-left" coords, so we offset our destination
    // coords accordingly, to draw our sprite centred at the origin
    if (this.animation)
    {
        ctx.drawImage(this.image,
                  this.stripx,
                  0,
                  w,h, 
                  -w/2, -h/2,
                  w,h
        );
    }
    else
    {
        ctx.drawImage(this.image, -w/2, -h/2);
    }
    
    ctx.restore();
};

