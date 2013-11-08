"use strict";

// ----------------
// current tilesheet in use
// ----------------

var tilesheet = {

	// "PRIVATE" DATA

	_tilesInRow: undefined,
	_tileset: undefined,

	// PUBLIC DATA

	tileSize: TILE_SIZE,

	// PUBLIC METHODS

	setTileset: function(image, tilesInRow) {

		this._tilesInRow = tilesInRow;
		this._tileset = image;
		this.tileSize = Math.floor(image.width/tilesInRow);
	},

	render: function(ctx, tile, posX, posY) {

		var tileS = this.tileSize,
			tileX = (tile%this._tilesInRow)*tileS,
			tileY = Math.floor(tile/this._tilesInRow)*tileS;
		ctx.drawImage(
			this._tileset, 
			tileX, tileY, 
			tileS, tileS, 
			posX, posY, 
			tileS, tileS
		);
	}

};