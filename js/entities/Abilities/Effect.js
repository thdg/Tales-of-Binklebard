// ============
// SPELLEFFECT OBJECT
// ============

function Effect(descr)
{
    this.setup(descr);
}

Effect.prototype = new Entity();

Effect.prototype._isDeadNow = false;
Effect.prototype._inSpatial = true;

Effect.prototype.update = function(du)
{
    spatialManager.unregister(this);
    renderingManager.unregister(this);

    this.move(du);

    this.duration -= du;
    this.range    -= du*this.vel;

    if( this.duration < 0 || this.range < 0)
        this.kill();

    if (this._isDeadNow) return entityManager.KILL_ME_NOW;

    this.model.update(du);

    if (target = this.findTarget())
    {
        console.log(target);
        this.target(target);
        this.target = function(){};
    }

    if(this._inSpatial) spatialManager.register(this);
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
        case (FACE_DOWN):
            this.cy += this.vel*du;
            break;
    }

    if (world.collidesWith(this.cx, this.cy, this.getRadius())) {
        this._isDeadNow = true;
    }
}

Effect.prototype.getRadius = function () 
{
    return this.aoe;
};

Effect.prototype.render = function(ctx)
{
    this.model.drawCentredAt(ctx,this.cx,this.cy);
};

Effect.prototype.findTarget = function()
{
    var target = spatialManager.findEntityInRange(this.cx,this.cy,this.aoe);
    if (target === undefined) return;
    if (target.getSpatialID === this.doNotHit) return;
    if (target)
    {
        this.responseToFind();
    }
    return target;
};

Effect.prototype.removeFromScope = function()
{
    this._inSpatial = false;
};
