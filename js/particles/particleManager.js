 "use strict";

/************************************************************************\

 A module which handles all particle effects ,
 with object pooling witch we really don't need
 but is extremely cool to have

\************************************************************************/

var particleManager = {

    // "PRIVATE" DATA

    _textParticles     : [],
    _textParticlePool  : [],
    _dropParticles     : [],
    _dropParticlePool  : [],

    // "PRIVATE" METHODS

    // gets particle from pool if it's not empty
    // if it is, return new Object
    _getFromPool: function(pool, Object) {

        var particle;
        if (pool[0]) {
            particle = pool[0];
            pool.splice(0,1);
        } else {
            particle = new Object();
        }

        return particle;
    },

    // PUBLIC METHODS
	
    KILL_ME_NOW : -1,

    deferredSetup : function () {
        this._categories = [this._textParticles, this._dropParticles];
        this._categoriePools = [this._textParticlePool, this._dropParticlePool];
    },

    init: function() {

        ctx.lineWidth = 2;
        ctx.font = "20px irish-grover, sans-serif";
    },

    generateTextParticle: function(posX, posY, text, style, lifespan) {

        var particle = this._getFromPool(this._textParticlePool, TextParticle);
        particle.setup(posX, posY, text, style, lifespan);
        this._textParticles.push(particle);
    },

    generateSplash: function(posX, posY, drops, style, radius) {

        for (var i=0; i<drops; i++) {
            var particle = this._getFromPool(this._dropParticlePool, DropParticle);
            var lifespan = util.randRange(100,150);
            particle.setup(posX, posY, style, radius, lifespan);
            this._dropParticles.push(particle);
        }
    },

    update: function(du) {

        for (var c = 0; c < this._categories.length; ++c) {

            var aCategory = this._categories[c];
            var i = 0;

            while (i < aCategory.length) {

                var status = aCategory[i].update(du);

                if (status === this.KILL_ME_NOW) {
                    this._categoriePools[c].push(aCategory[i]);
                    aCategory.splice(i,1);
                }
                else {
                    ++i;
                }
            }
        }
    },

    // particles have a small lifespan and are generated by the player
    // so 99% of the time they are on screen, thus we can just render
    // them here instead of bothering to use the renderingManager
    render: function(ctx) {
        
        for (var c = 0; c < this._categories.length; ++c) {

            var aCategory = this._categories[c];
            for (var i=0; i<aCategory.length; i++) {
                aCategory[i].render(ctx);
            }
        }
    }

};

particleManager.deferredSetup();
