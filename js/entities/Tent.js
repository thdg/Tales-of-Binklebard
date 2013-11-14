// --------
// BASECAMP
// --------

function Tent(descr)
{
	this.randomizePos();
	this.sprite = g_sprites.tent;
}

Tent.prototype = new Entity();


Tent.prototype.update = function(du)
{
    spatialManager.unregister(this);
    renderingManager.unregister(this);
    renderingManager.register(this);
    spatialManager.register(this);
}

Tent.prototype.render = function(ctx)
{
    this.sprite.drawCentredAt(ctx,this.cx,this.cy);
}

Tent.prototype.getRadius = function()
{
	return TILE_SIZE*4;
}
