// ============
// SPELLEFFECT OBJECT
// ============

function Effect(descr)
{
    this.setup(descr);
}

Effect.prototype = new Entity();

Effect.prototype._isDeadNow = false;

Effect.prototype.update = function(du)
{
    spatialManager.unregister(this);
    renderingManager.unregister(this);

    // this.sprite.configureAnimation();
    
    this.duration -= du;
    if( this.duration <= 0 )
        this._isDeadNow = true;

    if (this._isDeadNow) return entityManager.KILL_ME_NOW;

    this.move(du);
    this.model.update(du);

    if (target = this.findTarget())
    {
        this.target(target);
        this.target = function(){};
    }

    spatialManager.register(this);
    renderingManager.register(this);
};

Effect.prototype.move = function (du)
{
    switch (this.direction)
    {
        case (FACE_RIGHT):
            this.cx += this.vel*du;
            break;
        case (FACE_UP):
            this.cy -= this.vel*du;
            break;
        case (FACE_LEFT):
            this.cx -= this.vel*du;
            break;
        case (FACE_UP):
            this.cy += this.vel*du;
            break;
    }
}

Effect.prototype.render = function(ctx)
{
    this.model.drawCentredAt(ctx,this.cx,this.cy);
};

var clericSpells = 
{
    heal: function(lvl, wis)
    {
        var spell =  /*{effect:1,cast:10};*/
        {
            descr: {
				range     : TILE_SIZE*1,
				aoe       : 0,
				model     : new Animation ( g_sprites.sparcles, 0, 0, 48, 0, 3, 200),
				duration  : 2*SECS_TO_NOMINALS,
				vel       : 0,
                direction : 0
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
		
    }
};