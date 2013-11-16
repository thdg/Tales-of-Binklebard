"use strict";

/************************************************************************\

 Region class

\************************************************************************/

function Region(map, heightmap, dynamicObjects) {

    this._map = map;
    this._hightmap = heightmap;
    this._dynamicObjects = dynamicObjects;

    this._mapHeight = map.length,
    this._mapWidth = map[0].length,

    this.height = map.length*tilesheet.tileSize;
    this.width = map[0].length*tilesheet.tileSize;

    this.drawHeightmap = false;
}

Region.prototype.update = function (du) {
    
}

Region.prototype.collidesWith = function (x, y, r) {

    return this.collidePoint(x-r,y) ||
           this.collidePoint(x+r,y) ||
           this.collidePoint(x,y-r) ||
           this.collidePoint(x,y+r);
}

Region.prototype.collidePoint = function (x, y) {

    var tileSize = tilesheet.tileSize;
    var tileX = Math.floor(x/tileSize);
    var tileY = Math.floor(y/tileSize);

    if (this._hightmap[tileY][tileX]===0) return false;

    return true;
}

Region.prototype.render = function (ctx) {

    // render terrain, there has to be a better way of doing this...
    var tileSize = tilesheet.tileSize;
    var pos = camera.getPos();
    var scr = camera.getDimensions();

    var startX = Math.max(Math.floor(pos.posX/tileSize),0);
    var startY = Math.max(Math.floor(pos.posY/tileSize),0);

    var endX = Math.min(
        Math.ceil((pos.posX+scr.width)/tileSize),
        this._mapWidth
    );
    var endY = Math.min(
        Math.ceil((pos.posY+scr.height)/tileSize),
        this._mapHeight
    );

    for(var i = startY; i<endY; i++) {
        var row = this._map[i];
        for (var j = startX; j<endX; j++) {
            var posX = j*tileSize;
            var posY = i*tileSize;
            tiles.render(ctx, row[j], posX, posY);
        }
    }

    if (this.drawHeightmap) {
        var oldAlpha = ctx.globalAlpha;
        var oldStyle = ctx.fillStyle;
        ctx.fillStyle = 'red';
        ctx.globalAlpha = 0.5;
        for(var i = startY; i<endY; i++) {
            var row = this._hightmap[i];
            for (var j = startX; j<endX; j++) {
                var posX = j*tileSize;
                var posY = i*tileSize;
                if (row[j]===1)
                    util.fillBox(ctx, posX, posY, tileSize, tileSize);
            }
        }
        ctx.fillStyle = oldStyle;
        ctx.globalAlpha = oldAlpha;
    }

    // render static Objects
    // TODO
};
