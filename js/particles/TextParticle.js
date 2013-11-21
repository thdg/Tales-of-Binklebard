"use strict";

/************************************************************************\

 TextParticle class

\************************************************************************/

function TextParticle() { }

TextParticle.prototype = new Particle();

TextParticle.prototype.setup = function(posX, posY, text, style, lifespan) {
    
    this.setupSuper(posX, posY, lifespan);

    if (style===undefined) style = 'red';

    this.text = text;
    this.style = style;

};

TextParticle.prototype.render = function (ctx) {

    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = 'black';
    ctx.strokeText(this.text,this.posX,this.posY);
    ctx.fillStyle = this.style;
    ctx.fillText(this.text,this.posX,this.posY);
    ctx.fillStyle = oldStyle;
};
