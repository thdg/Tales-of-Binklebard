var mapEditor = {
	
	_activeTile: tiles.GRASS,
	brushSize: 1,

	KEY_GRASS: util.charCode('1'),
	KEY_FOREST: util.charCode('2'),
	KEY_WATER: util.charCode('3'),
	KEY_MUD: util.charCode('4'),

	update: function(du) {

		if (keys[this.KEY_GRASS]) {
			this._activeTile = tiles.GRASS;
    	}
		if (keys[this.KEY_FOREST]) {
			this._activeTile = tiles.FOREST.FILL;
    	}
		if (keys[this.KEY_WATER]) {
			this._activeTile = tiles.WATER.FILL;
    	}
		if (keys[this.KEY_MUD]) {
			this._activeTile = tiles.MUD.FILL;
    	}

		if (this.brushSize<0) this.brushSize = 0;

		fixChunks(world.getMap(), tiles.FOREST);
		fixChunks(world.getMap(), tiles.WATER);
		fixChunks(world.getMap(), tiles.MUD);
	},

	changeTile: function() {

	    var offset = camera.getPos();
	    var tile = world.findTile(offset.posX+g_mouseX, offset.posY+g_mouseY);
	    var map = world.getMap();
	    
	    for (var i=-this.brushSize; i<this.brushSize+1; i++) {
	    	for (var j=-this.brushSize; j<this.brushSize+1; j++) {
	    		var x = Math.max(0,tile.x+j);
	    		var y = Math.max(0,tile.y+i);
		    	map[y][x] = this._activeTile;
		    }
		}
	},
}