"use strict";

// Region class, renders map and checks for collitions on hightmap

function Region(map, heightmap, dynamicObjects) {

    this._map = map;
    this._heightmap = heightmap;
    this._dynamicObjects = dynamicObjects;

    this._mapHeight = map.length;
    var minLength = map[0].length;
    for (var i=0; i<map.length; i++) {
        minLength = minLength>map[i].length ? 
                        map[i].length :
                        minLength;
    }
    this._mapWidth = minLength;

    this.height = map.length*tilesheet.tileSize;
    this.width = map[0].length*tilesheet.tileSize;

    this.drawHeightmap = false;
}

Region.prototype.setHeightmap = function (heightmap) {
    this._heightmap = heightmap;
};

Region.prototype.getHeightmap = function () {
    return this._heightmap;
};

Region.prototype.setMap = function (map) {
    this._map = map;
};

Region.prototype.update = function (du) {
    
};

Region.prototype.findTile = function (x, y) {

    var tileSize = tilesheet.tileSize;
    var tileX = util.keepBetween(Math.floor(x/tileSize),0,this._mapHeight);
    var tileY = util.keepBetween(Math.floor(y/tileSize),0,this._mapWidth);

    return {x: tileX, y: tileY};
};

Region.prototype.collidesWith = function (x, y, r, h) {

    return this.collidePoint(x-r,y,h) ||
           this.collidePoint(x+r,y,h) ||
           this.collidePoint(x,y-r,h) ||
           this.collidePoint(x,y+r,h);
};

Region.prototype.collidePoint = function (x, y, h) {

    if (h===undefined) h = 0;

    var tile = this.findTile(x,y);
    if (this._heightmap[tile.y][tile.x]<=h) return false;

    return true;
};

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

    // debugger
    if (this.drawHeightmap) {
        var oldAlpha = ctx.globalAlpha;
        var oldStyle = ctx.fillStyle;
        ctx.fillStyle = 'red';
        ctx.globalAlpha = 0.5;
        for(var i = startY; i<endY; i++) {
            var row = this._heightmap[i];
            for (var j = startX; j<endX; j++) {
                var posX = j*tileSize;
                var posY = i*tileSize;
                if (row[j]>0)
                    util.fillBox(ctx, posX, posY, tileSize, tileSize);
            }
        }
        ctx.fillStyle = oldStyle;
        ctx.globalAlpha = oldAlpha;
    }
};
