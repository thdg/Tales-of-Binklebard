"use strict";

/************************************************************************\

 Particle class

\************************************************************************/

function Particle() { }

Particle.prototype.setupSuper = function (posX, posY, lifespan) {

    if (lifespan===undefined) lifespan = 500;

    this.posX = posX;
    this.posY = posY;
    this.timeLeftAlive = lifespan;

    this.velX = util.randRange(-50,50)/SECS_TO_NOMINALS;
    this.velY = -util.randRange(30,50)/SECS_TO_NOMINALS;
};

Particle.prototype.update = function (du) {
    
    this.velY += NOMINA_GRAVITY;

    this.posX += this.velX*du;
    this.posY += this.velY*du;

    this.timeLeftAlive -= NOMINAL_UPDATE_INTERVAL*du;
    if (this.timeLeftAlive<0) return particleManager.KILL_ME_NOW;
};
