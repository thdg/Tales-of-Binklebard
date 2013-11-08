"use strict";

/************************************************************************\

 Tile object

\************************************************************************/

function Tile(tiles, interval) {

    if (interval===undefined) interval = 0;

    this._tiles = tiles;
    this._activeTileIndex = 0;
    this._interval = interval;
    this._timeTilNext = interval;
}

Tile.prototype.update = function(du) {

    if (this._interval===0) return; // static tile, no need to update

    this._timeTilNext -= du * NOMINAL_UPDATE_INTERVAL;
    if (this._timeTilNext>0) return;

    this._timeTilNext += this._interval;
    this._activeTileIndex = (this._activeTileIndex+1)%this._tiles.length;
};

Tile.prototype.render = function (ctx, posX, posY) {

    var activeTile = this._tiles[this._activeTileIndex];
    tilesheet.render(ctx, activeTile, posX, posY);
};
