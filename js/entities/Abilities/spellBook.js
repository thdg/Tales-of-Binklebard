// ----------
// SPELL BOOK
// ----------

var spellbook = 
{
	heal: function(lvl, wis)
    {
        var spell =
        {
            descr: {
				range       : TILE_SIZE*1,
				aoe         : 1,
				model       : new Animation ( g_sprites.sparcles, 0, 0, 48, 3, 200),
				duration    : SECS_TO_NOMINALS,
                coolDown    : 0.5*SECS_TO_NOMINALS,
				vel         : 0,
                direction   : 0,
            },

            cast: function (caster)
            {
                var manacost = caster.energy*0.1; // blah, until later
                if(!caster.drainEnergy(manacost)) return;

                this.descr.findTarget = function(){ return caster; };
                this.descr.move   = function() {this.cx = caster.cx;this.cy = caster.cy;};
                this.descr.target = function (entity) { 
                    entity.heal(this.hpBoost); 
                };
                this.descr.cx = caster.cx;
                this.descr.cy = caster.cy;
                this.descr.hpBoost = 20+caster.wis;
                entityManager.createEffect(this.descr);
				
            }
			
        };
        return spell;
		
    },

    magicMissile: function(lvl, wis)
    {
        var spell = 
        {
            descr: {
                range       : TILE_SIZE*12,
                aoe         : 1.1*TILE_SIZE/3,
                model       : new Animation ( g_sprites.magicMissile, 0, 0, 48 ),
                duration    : SECS_TO_NOMINALS*100,
                coolDown    : SECS_TO_NOMINALS/2,
                vel         : 360/SECS_TO_NOMINALS,
            },

            cast : function(caster)
            {
                var manacost = caster.energy*0.1; // blah, until later
                if(!caster.drainEnergy(manacost)) return;

                this.descr.target         = function (entity) { 
                    entity.takeDamage(this.damage);
                    particleManager.generateSplash(this.cx, this.cy, 20, '#FF00FF');
                };

                var distance 			  = caster.getRadius()+this.descr.aoe;
                var rad                   = util.getRadFromDir(caster.direction);
                this.descr.cx             = caster.cx+distance*Math.cos(rad);
                this.descr.cy             = caster.cy+distance*Math.sin(rad);
                this.descr.direction      = caster.direction;
                this.descr.model.rotation = util.getRadFromDir(caster.direction);
                this.descr.damage         = 40+Math.floor(caster.lvl/3)*40+caster.wis;
                entityManager.createEffect(this.descr);
            }
        }
        return spell;
    }
	
}