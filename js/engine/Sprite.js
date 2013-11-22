"use strict";

function Sprite(image) {

    this.image  = image;
    this.width  = image.width;
    this.height = image.height;
    this.scale  = 1;
}

Sprite.prototype.alpha = 1.0;

Sprite.prototype.drawAt = function (ctx, x, y) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.drawImage(this.image, x, y);
    ctx.restore();
};

Sprite.prototype.drawCentredAt = function (ctx, cx, cy, rotation, reflect) {

    if (rotation === undefined) rotation = 0;
    if (reflect === undefined) reflect = false;
    
    var w = this.width,
        h = this.height;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.globalAlpha = this.alpha;

    if (reflect) ctx.scale(-this.scale, this.scale);
    else ctx.scale(this.scale, this.scale);
    
    ctx.drawImage(this.image, -w/2, -h/2);
    ctx.restore();
};


Sprite.prototype.drawFrameCenterdAt = function (ctx, cx, cy, startX, startY, sizeX, sizeY, rotation, reflect) {

    if (rotation === undefined) rotation = 0;
    if (reflect === undefined) reflect = false;


    var posX = -sizeX/2,
        posY = -sizeY/2;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.globalAlpha = this.alpha;

    if (reflect) ctx.scale(-this.scale, this.scale);
    else ctx.scale(this.scale, this.scale);
    
    ctx.drawImage(
        this.image,
        startX,
        startY,
        sizeX, 
        sizeY,
        posX, 
        posY,
        sizeX, 
        sizeY
    );
    
    ctx.restore();
};