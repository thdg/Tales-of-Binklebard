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
        this.default   = content.haltForward;
        this._thrust    = content.thrustForward;
        this._setValues(this.default);
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

Sprite.prototype.FACE_RIGHT   = 0;
Sprite.prototype.FACE_BACK    = 1;
Sprite.prototype.FACE_LEFT    = 2;
Sprite.prototype.FACE_FORWARD = 3;

Sprite.prototype.setDefault  = function (dir)
{
    switch (dir)
    {
        case 0:
            this.default = this.motion.haltRight;
            this._thrust  = this.motion.thrustRight;
            //this.default.reflect = false;
            break;
        case 2:
            this.default = this.motion.haltLeft;
            this._thrust  = this.motion.thrustLeft;
            //this.default.reflect = true;
            break;
        case 3:
            this.default = this.motion.haltForward;
            this._thrust  = this.motion.thrustForward;
            break;
        case 1:
            this.default = this.motion.haltBack;
            this._thrust  = this.motion.thrustBack;
            break;

    }
}

Sprite.prototype.moveForward = function ()
{
    this._setValues(this.motion.forward);
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

Sprite.prototype.moveBack = function ()
{
    this._setValues(this.motion.back);
}

Sprite.prototype.halt = function ()
{
    this._setValues(this.default);
}

Sprite.prototype.thrust = function ()
{
    this._setValues(this._thrust);
}

Sprite.prototype.makeAnimationArray = function()
{
    var animationArray = [];
    var numCols = 5;
    var numRows = 6;
    console.log("width = "+this.width);
    var celWidth = this.width/numCols;
    var celHeight = this.height/numRows;
    for (var row = 0; row < numRows; ++row) {
        for (var col = 0; col  < numCols; ++col) {
            var sprite = new Sprite(this.image, 
                                    col * celWidth,
                                    row * celHeight,
                                    celWidth, celHeight);
            animationArray.push(sprite);
        }
    }
    console.dir(animationArray);
    return animationArray;
};

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
