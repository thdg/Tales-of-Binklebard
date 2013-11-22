"use strict";

// current tilesheet in use

var tilesheet = {

    // "PRIVATE" DATA

    _tilesInRow: undefined,
    _tileset: undefined,

    // PUBLIC DATA

    tileSize: TILE_SIZE,

    // PUBLIC METHODS

    setTileset: function(tileset, tilesInRow) {

        this._tilesInRow = tilesInRow;
        this._tileset = tileset;
        this.tileSize = Math.floor(tileset.width/tilesInRow);
    },

    render: function(ctx, tile, posX, posY) {

        var tileS = this.tileSize,
            tileX = (tile%this._tilesInRow)*tileS,
            tileY = Math.floor(tile/this._tilesInRow)*tileS;
        this._tileset.drawFrameCenterdAt(
            ctx,
            posX+tileS/2, posY+tileS/2,
            tileX, tileY, 
            tileS, tileS
        );
    }

};