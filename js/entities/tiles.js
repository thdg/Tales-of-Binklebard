

var tiles = {

    // "PRIVATE" DATA

    _tiles: [],
    
    // PUBLIC METHODS

    init: function() {

        this.addTile(new Tile([0]));            //  0: Grass
        this.addTile(new Tile([1]));            //  1: Flowers
        this.addTile(new Tile([2]));            //  2: Grass2
        this.addTile(new Tile([3,8,13,18]));    //  3: Water
        this.addTile(new Tile([5]));            //  4: grass/mud
        this.addTile(new Tile([6]));            //  5: grass-mud
        this.addTile(new Tile([7]));            //  6: mud\grass
        this.addTile(new Tile([10]));           //  7: grass|mud
        this.addTile(new Tile([11]));           //  8: mud
        this.addTile(new Tile([12]));           //  9: mud|grass
        this.addTile(new Tile([15]));           // 10: grass\mud
        this.addTile(new Tile([16]));           // 11: mud-grass
        this.addTile(new Tile([17]));           // 12: mud/grass
        this.addTile(new Tile([20]));           // 13: mud/grass
        this.addTile(new Tile([21]));           // 14: ...
        this.addTile(new Tile([22]));           //
        this.addTile(new Tile([23]));           //
        this.addTile(new Tile([24]));           //
    },

    addTile: function(tile) {
        this._tiles.push(tile);
    },

    update : function(du) {
    	for (var i=0; i<this._tiles.length; i++) {
    		this._tiles[i].update(du);
    	}
    },

    render : function(ctx, tile, posX, posY) {

        this._tiles[tile].render(ctx, posX, posY);

    }

}