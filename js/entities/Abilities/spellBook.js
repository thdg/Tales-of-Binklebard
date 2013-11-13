// ----------
// SPELL BOOK
// ----------

var spellBook = 
{
	heal: function(lvl, wis)
    {
        var spell =  /*{effect:1,cast:10};*/
        {
            descr: {
				range       : TILE_SIZE*1,
				aoe         : 1,
				model       : new Animation ( g_sprites.sparcles, 0, 0, 48, 3, 200),
				duration    : 2*SECS_TO_NOMINALS,
                coolDown    : 2*SECS_TO_NOMINALS,
				vel         : 0,
                direction   : 0
            },

            cast: function (caster)
            {
                this.descr.findTarget = function(){ return caster; };
                this.descr.move   = function() {this.cx = caster.cx;this.cy = caster.cy;};
                this.descr.target = function (entity) { entity.hp+= caster.Wis*2; };
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
                aoe         : 1.2*TILE_SIZE/3,
                model       : new Animation ( g_sprites.fireball, 0, 0, 48 ),
                duration    : SECS_TO_NOMINALS*100,
                coolDown    : SECS_TO_NOMINALS/2,
                vel         : 360/SECS_TO_NOMINALS,
                
            },

            cast : function(caster)
            {
                this.descr.target         = function (entity) { entity.kill(); };
                var distance = caster.getRadius()+this.descr.aoe;
                this.descr.cx             = caster.cx+distance*Math.cos(util.getRadFromDir(caster.direction));
                this.descr.cy             = caster.cy+distance*Math.sin(util.getRadFromDir(caster.direction));
                this.descr.direction      = caster.direction;
                this.descr.model.rotation = util.getRadFromDir(caster.direction);
                entityManager.createEffect(this.descr);
            }
        }
        return spell;
    }
}