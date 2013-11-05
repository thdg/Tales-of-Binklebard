// ============
// REGION STUFF
// ============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// Construct a "region" from the given input arrays,
//
function Region(map, hightmap, staticObjects, dynamicObjects) {

    this._map = map;
    this._hightmap = hightmap;
    this._staticObjects = staticObjects;
    this._dynamicObjects = dynamicObjects;

    this.height = map.length*tilesheet.tileSize;
    this.width = map[0].length*tilesheet.tileSize;
}

Region.prototype.update = function (du) {
	
}

Region.prototype.render = function (ctx) {

	// render terrain, there has to be a better way of doing this...
	var tileSize = tilesheet.tileSize
	var pos = camera.getPos();
	var scr = camera.getDimentions();

	var startX = Math.floor(pos.posX/tileSize);
	var startY = Math.floor(pos.posY/tileSize);
	
	var endX = Math.ceil((pos.posX+scr.width)/tileSize);
	var endY = Math.ceil((pos.posY+scr.height)/tileSize);

	for(var i = startY; i<endY; i++) {
		var row = this._map[i];
		for (var j = startX; j<endX; j++) {
			var posX = j*tileSize;
			var posY = i*tileSize;
			tiles.render(ctx, row[j], posX, posY);
		}
	}

	// render static Objects
	// TODO
}
