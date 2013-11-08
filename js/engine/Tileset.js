// ============
// REGION STUFF
// ============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// Construct a "Tile" from the given 'tiles' from the tilesheet,
//
function Tile(tiles) {

    this._tiles = tiles;
    this._activeTile = tiles[0];
    this._time = 0;
}

Tile.prototype.update = function(du) {

	this._time += du * NOMINAL_UPDATE_INTERVAL;
	this._activeTile = this._tiles[Math.floor(this._time/1000)%this._tiles.length];

};

Tile.prototype.render = function (ctx, posX, posY) {

	tilesheet.render(ctx, this._activeTile, posX, posY);

};

var tilesheet = {

	// "PRIVATE" DATA

	_tilesInRow: undefined,
	_tileset: undefined,

	// PUBLIC DATA

	tileSize: 32,

	// PUBLIC METHODS

	setTileset: function(image, tilesInRow) {

		this._tilesInRow = tilesInRow;
		this._tileset = image;
		this.tileSize = Math.floor(image.width/tilesInRow);
	},

	render: function(ctx, tile, posX, posY) {

		var tileS = this.tileSize;
		var tileX = (tile%this._tilesInRow)*tileS;
		var tileY = Math.floor(tile/this._tilesInRow)*tileS;
		ctx.drawImage(this._tileset, tileX, tileY, tileS, tileS, posX, posY, tileS, tileS);
	}

};