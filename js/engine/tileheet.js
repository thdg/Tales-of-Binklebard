"use strict";

/************************************************************************\

 A module that handles the tileset in use

\************************************************************************/

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
		ctx.drawImage(this._tileset, 
					  tileX, tileY, 
					  tileS, tileS, 
					  posX, posY, 
					  tileS, tileS
		);
	}

}