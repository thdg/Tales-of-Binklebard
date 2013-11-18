

var tiles = {

    // "PRIVATE" DATA

    _tiles: [],

    GRASS: 0,
    FLOWERS: 1,
    GRASS2: 2,
    WATER: 3,
    MUD: 8,

    FOREST: {
        FILL: 32,
        B: 37,
        T: 38,
        L: 39,
        R: 40,
        TL: 33,
        TR: 34,
        BL: 35,
        BR: 36,
        ITL: 0,
        ITR: 0,
        IBL: 0,
        IBR: 0,
    },
    
    // PUBLIC METHODS

    init: function() {

        this.addTile(new Tile([0]));             //  0: Grass
        this.addTile(new Tile([1]));             //  1: Flowers
        this.addTile(new Tile([2]));             //  2: Grass2

        this.addTile(new Tile([3,11,19,27],500)); //  3: Water

        this.addTile(new Tile([8]));             //  4: grass/mud
        this.addTile(new Tile([9]));             //  5: grass-mud
        this.addTile(new Tile([10]));            //  6: mud\grass
        this.addTile(new Tile([16]));            //  7: grass|mud
        this.addTile(new Tile([17]));            //  8: mud
        this.addTile(new Tile([18]));            //  9: mud|grass
        this.addTile(new Tile([24]));            // 10: grass\mud
        this.addTile(new Tile([25]));            // 11: mud-grass
        this.addTile(new Tile([26]));            // 12: mud/grass

        this.addTile(new Tile([32]));            // 13: mud/grass
        this.addTile(new Tile([33]));            // 14: ...
        this.addTile(new Tile([35]));            //
        this.addTile(new Tile([34]));            //

        this.addTile(new Tile([4]));             //
        this.addTile(new Tile([5]));             //
        this.addTile(new Tile([6]));             //
        this.addTile(new Tile([12]));            // 20: 
        this.addTile(new Tile([14]));            //
        this.addTile(new Tile([20]));            //
        this.addTile(new Tile([21]));            //
        this.addTile(new Tile([22]));            //
        this.addTile(new Tile([7]));             // 25: 
        this.addTile(new Tile([15]));            //
        this.addTile(new Tile([23]));            //
        this.addTile(new Tile([31]));            //

        this.addTile(new Tile([28]));            // 29: water|bridge
        this.addTile(new Tile([29]));            // 30: bridge
        this.addTile(new Tile([30]));            // 31: bridge|water
        this.addTile(new Tile([53]));            // 32: forest
        this.addTile(new Tile([36]));            // 32: forest
        this.addTile(new Tile([37]));            // 32: forest
        this.addTile(new Tile([44]));            // 32: forest
        this.addTile(new Tile([45]));            // 32: forest
        this.addTile(new Tile([62]));            // 32: forest
        this.addTile(new Tile([63]));            // 32: forest
        this.addTile(new Tile([54]));            // 32: forest
        this.addTile(new Tile([55]));            // 32: forest
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

};