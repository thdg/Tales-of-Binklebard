// ---------
// FIREPLACE
// ---------

function Fireplace(descr)
{
	this.animation = new Animation(g_sprites.campfire,0,0,50,5,200);
	this.setup(descr);
}

Fireplace.prototype = new Entity();


Fireplace.prototype.update = function(du)
{
    spatialManager.unregister(this);
    renderingManager.unregister(this);
    this.animation.update(du);
    renderingManager.register(this);
    spatialManager.register(this);
};

Fireplace.prototype.render = function(ctx)
{
    this.animation.drawCentredAt(ctx,this.cx,this.cy);
};
