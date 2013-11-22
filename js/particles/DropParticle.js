"use strict";

// DropParticle object

function DropParticle() {}

DropParticle.prototype = new Particle();

DropParticle.prototype.setup = function(posX, posY, style, radius, lifespan) {
    
    this.setupSuper(posX, posY, lifespan);

    if (style===undefined) style = 'red';
    if (radius===undefined) radius = 2; 

    var dir = util.randRange(0, Math.PI*2);
    var speed = util.randRange(0,150)/SECS_TO_NOMINALS;
    this.velX = Math.cos(dir)*speed;
    this.velY = Math.sin(dir)*speed;

    this.style = style;
    this.radius = radius;

};

DropParticle.prototype.render = function (ctx) {

    util.fillCircle(ctx, this.posX, this.posY, this.radius, this.style);
};
