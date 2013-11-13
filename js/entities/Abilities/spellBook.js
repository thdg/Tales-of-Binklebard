// ----------
// SPELL BOOK
// ----------

var spellbook = 
{
	heal: function(lvl, wis)
    {
        var spell =
        {
            manacost: 20,

            descr: {
				range       : TILE_SIZE*1,
				aoe         : 1,
				model       : new Animation ( g_sprites.sparcles, 0, 0, 48, 3, 200),
				duration    : 2*SECS_TO_NOMINALS,
                coolDown    : 2*SECS_TO_NOMINALS,
				vel         : 0,
                direction   : 0,
            },

            cast: function (caster)
            {
                if(!caster.drainEnergy(this.manaCost)) return;

                this.descr.findTarget = function(){ return caster; };
                this.descr.move   = function() {this.cx = caster.cx;this.cy = caster.cy;};
                this.descr.target = function (entity) { entity.takeDamage(-(20+caster.wis), false); };
                this.descr.cx = caster.cx;
                this.descr.cy = caster.cy;
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

                this.descr.target         = function (entity) { entity.takeDamage(this.damage); };
                var distance              = caster.getRadius()+this.descr.aoe;
                this.descr.cx             = caster.cx+distance*Math.cos(util.getRadFromDir(caster.direction));
                this.descr.cy             = caster.cy+distance*Math.sin(util.getRadFromDir(caster.direction));
                this.descr.direction      = caster.direction;
                this.descr.model.rotation = util.getRadFromDir(caster.direction);
                this.descr.damage         = 40+Math.floor(caster.lvl/3)*40+caster.wis;\
                entityManager.createEffect(this.descr);
            }
        }
        return spell;
    }
}