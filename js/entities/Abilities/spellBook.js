// ----------
// SPELL BOOK
// ----------

var _inFrontOf = function(that,distance) {
    var rad      = util.getRadFromDir(that.direction);
    var ret = {
        cx        : that.cx+distance*Math.cos(rad),
        cy        : that.cy+distance*Math.sin(rad),
        direction : that.direction
    };
    return ret;
};

var spellbook =  {
	heal: function(lvl, wis) {
        var spell = {
            descr: {
				range       : TILE_SIZE*1,
				aoe         : 1,
				model       : new Animation ( g_sprites.sparcles, 0, 0, 48, 3, 200),
				duration    : SECS_TO_NOMINALS,
                coolDown    : 0.5*SECS_TO_NOMINALS,
				vel         : 0,
                direction   : 0,
            },

            cast: function (caster) {
                var manacost = caster.energy*0.1; // blah, until later
                if(!caster.drainEnergy(manacost)) return;

                this.descr.findTarget = function(){ return caster; };
                this.descr.move   = function() { this.cx = caster.cx;this.cy = caster.cy; };
                this.descr.target = function (entity) { 
                    entity.heal(this.hpBoost);
                    this.removeFromScope();
                };
                this.descr.cx = caster.cx;
                this.descr.cy = caster.cy;
                this.descr.hpBoost = 20+caster.wis;
                entityManager.createEffect(this.descr);
				
            }
			
        };
        return spell;
		
    },

    magicMissile: function(lvl, wis) {
        var spell =  {
            descr: {
                range          : TILE_SIZE*12,
                aoe            : 1.1*TILE_SIZE/3,
                model          : new Animation ( g_sprites.magicMissile, 0, 0, 48 ),
                height         : 7, 
                duration       : SECS_TO_NOMINALS,
                coolDown       : 0.5*SECS_TO_NOMINALS,
				vel            : 300/SECS_TO_NOMINALS,
                responseToFind : function() { this.kill(); },
            },

            cast : function(caster) {
                var manacost = caster.energy*0.1; // blah, until later
                if(!caster.drainEnergy(manacost)) return;

                this.descr.target         = function (entity) { 
                    entity.takeDamage(this.damage,true);
                    particleManager.generateSplash(this.cx, this.cy, 20, '#FF00FF');
                };

                var distance = caster.getRadius() + this.descr.aoe + 1;
                var pos = _inFrontOf(caster,distance);
                for (var property in pos) { this.descr[property] = pos[property]; }          
                
                this.descr.model.rotation = util.getRadFromDir(caster.direction);
                this.descr.damage         = 40+Math.floor(caster.lvl/3)*40+caster.wis;
                entityManager.createEffect(this.descr);
            }
        }
        return spell;
    },
	
    rake: function(lvl, dex) {
        var spell =  {
            descr: {
                range          : TILE_SIZE*1,
				aoe            : 1.1*TILE_SIZE/3,
				model          : new Animation ( g_sprites.rake, 0, 0, 48, 3, 50),
				duration       : 0.15*SECS_TO_NOMINALS,
                coolDown       : 0.5*SECS_TO_NOMINALS,
                vel            : 0,
                direction      : 0,
                responseToFind : function() {}
            },

            cast : function(caster) {
                var energycost = caster.energy*0.4; // blah, until later
                if(!caster.drainEnergy(energycost)) return;

                this.descr.target = function (entity) { 
                    if ( entity.isEnemy)
                    {
                        entity.takeDamage(this.damage,true);
                        this.removeFromScope();
                    }
                };

                this.descr.move = function() { return; };

                var distance = caster.getRadius() + this.descr.aoe + 1;
                var pos = _inFrontOf(caster,distance);
                for (var property in pos) { this.descr[property] = pos[property]; }          
            				
                this.descr.damage = caster.damage + dex;
                entityManager.createEffect(this.descr);
            }
        }
        return spell;
    },

    fade: function(lvl,dex) {
        var spell = {
            descr: {
                render      : function () {},
                aoe         : 1,
                duration    : lvl * 2 * SECS_TO_NOMINALS,
                coolDown    : 0.5 * SECS_TO_NOMINALS,
                update      : function(du) {
                                this.duration -= du;

                                if (this.duration <= 0)
                                {
                                    this.kill();
                                }
                                if (this._isDeadNow) 
                                    return entityManager.KILL_ME_NOW;
                              }
            },

            cast : function(caster)
            {
                var energycost = caster.energy*0.2; // blah, until later

                if( !caster.drainEnergy( energycost ) ) return;

				caster.missChange += 0.33;
				caster.model.setAlpha( 0.5 );
				
                this.descr.kill = function() {
                    this._isDeadNow = true;
                    caster.missChange = 0.01 * this.dex;
					caster.model.setAlpha( 1.0 );
                }
                entityManager.createEffect(this.descr);
            }
        };
        return spell;
    },

    armor: function(lvl,wis) {

        var spell = {
            descr: {
                range       : TILE_SIZE*1,
                aoe         : 1,
                armor       : lvl*10,
                model       : new Animation ( g_sprites.armor, 0, 0, 48),
                duration    : 10*SECS_TO_NOMINALS,
                coolDown    : 0.5*SECS_TO_NOMINALS,
                vel         : 0,
                target      : function() {},
                findTarget  : function() {},
                takeDamage  : function(dmg) {
                    this.hp -= dmg;
                    if (this.hp <= 0) this.kill();
                }
            },

            cast: function (caster) {
                var manacost = 40;

                if(!caster.drainEnergy(manacost)) return;
                
                caster.armor += this.descr.armor;
                this.descr.move   = function() { this.cx = caster.cx; this.cy = caster.cy; };
                this.descr.cx     = caster.cx;
                this.descr.cy     = caster.cy;
                this.descr.kill   = function() {
                    caster.armor -= this.armor;
                    this._isDeadNow = true;
                };
                entityManager.createEffect(this.descr);
                
            }
            
        };
        return spell;
    }
	
};