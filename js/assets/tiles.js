

var tiles = {

    // "PRIVATE" DATA

    _tiles: [],

    GRASS: 0,
    FLOWERS: 1,
    GRASS2: 2,

    WATER: {
        FILL: 3,
        B: 4,
        T: 5,
        L: 6,
        R: 7,
        TL: 8,
        TR: 9,
        BL: 10,
        BR: 11,
        ITL: 12,
        ITR: 13,
        IBL: 14,
        IBR: 15,
    },

    MUD: {
        FILL: 16,
        B: 17,
        T: 18,
        L: 19,
        R: 20,
        TL: 21,
        TR: 22,
        BL: 23,
        BR: 24,
        ITL: 25,
        ITR: 26,
        IBL: 27,
        IBR: 28,
    },

    FOREST: {
        FILL: 29,
        B: 30,
        T: 31,
        L: 32,
        R: 33,
        TL: 34,
        TR: 35,
        BL: 36,
        BR: 37,
        ITL: 38,
        ITR: 39,
        IBL: 40,
        IBR: 41,
    },
    
    // PUBLIC METHODS

    init: function() {

        // GRASS
        this.addTile(new Tile([0]));              //  0: Grass
        this.addTile(new Tile([1]));              //  1: Flowers
        this.addTile(new Tile([2]));              //  2: Grass2

        // WATER
        this.addTile(new Tile([3,11,19,27],500)); //  3: FILL
        this.addTile(new Tile([5]))               //  4: B
        this.addTile(new Tile([21]))              //  5: T
        this.addTile(new Tile([14]))              //  6: L
        this.addTile(new Tile([12]))              //  7: R
        this.addTile(new Tile([15]))              //  8: TL
        this.addTile(new Tile([23]))              //  9: TR
        this.addTile(new Tile([7]))               //  10: BL
        this.addTile(new Tile([31]))              //  11: BR
        this.addTile(new Tile([22]))              //  12: ITL
        this.addTile(new Tile([20]))              //  13: ITR
        this.addTile(new Tile([6]))               //  14: IBL
        this.addTile(new Tile([4]))               //  15: IBR

        // MUD
        this.addTile(new Tile([17]))              //  16: FILL
        this.addTile(new Tile([25]))              //  17: B
        this.addTile(new Tile([9]))               //  18: T
        this.addTile(new Tile([16]))              //  19: L
        this.addTile(new Tile([18]))              //  20: R
        this.addTile(new Tile([8]))               //  21: TL
        this.addTile(new Tile([10]))              //  22: TR
        this.addTile(new Tile([24]))              //  23: BL
        this.addTile(new Tile([26]))              //  24: BR
        this.addTile(new Tile([32]))              //  25: ITL
        this.addTile(new Tile([33]))              //  26: ITR
        this.addTile(new Tile([34]))              //  27: IBL
        this.addTile(new Tile([35]))              //  28: IBR

        // FOREST
        this.addTile(new Tile([53]))                //  29: FILL
        this.addTile(new Tile([62]))                //  30: B
        this.addTile(new Tile([63]))                //  31: T
        this.addTile(new Tile([54]))                //  32: L
        this.addTile(new Tile([55]))                //  33: R
        this.addTile(new Tile([36]))                //  34: TL
        this.addTile(new Tile([37]))                //  35: TR
        this.addTile(new Tile([44]))                //  36: BL
        this.addTile(new Tile([45]))                //  37: BR
        this.addTile(new Tile([53]))                //  38: ITL
        this.addTile(new Tile([53]))                //  39: ITR
        this.addTile(new Tile([53]))                //  40: IBL
        this.addTile(new Tile([53]))                //  41: IBR

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