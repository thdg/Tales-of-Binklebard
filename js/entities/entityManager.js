 "use strict";

/************************************************************************\

 A module which handles arbitrary entity-management for the simulation

\************************************************************************/

var entityManager = {

    // "PRIVATE" DATA

    _items     : [],
    _soldiers  : [],
    _character : [],
    _effects   : [],


    // "PRIVATE" METHODS

    _generateSoldiers : function(num) {
        var i,
            goblin,
            NUM_SOLDIERS = num;

        for (i = 0; i < NUM_SOLDIERS; ++i) {
            goblin = new GreenSoldier(g_sprites.greenSoldier);
            this.generateSoldier({model: goblin});
        }
    },

    _findNearestItem : function(posX, posY) {
        var closestItem = null,
            closestIndex = -1,
            closestSq = 1000 * 1000;

        for (var i = 0; i < this._items.length; ++i) {

            var thisItem = this._items[i];
            var itemPos = thisItem.getPos();
            var distSq = util.distSq(
                itemPos.posX, itemPos.posY, posX, posY);

            if (distSq < closestSq) {
                closestItem = thisItem;
                closestIndex = i;
                closestSq = distSq;
            }
        }
        return {
            theItem : closestItem,
            theIndex: closestIndex
        };
    },

    _forEachOf: function(aCategory, fn) {
        for (var i = 0; i < aCategory.length; ++i) {
            fn.call(aCategory[i]);
        }
    },

    _generateCamp : function() {
        var tent = new Tent();
        var pos  = tent.getPos();
        this._items.push(tent);
        this._items.push(new Fireplace({cx:pos.posX-TILE_SIZE,cy:pos.posY}));
    },

    // PUBLIC METHODS
	
    KILL_ME_NOW : -1,

    deferredSetup : function () {
        this._categories = [this._items, this._soldiers, this._character, this._effects];
    },

    init: function() {
        var link = new Humanoid(g_sprites.link);
        var character = new Character({model: link, cx:200, cy:200});
        this._character.push(character);
        this._generateSoldiers(50);
        this._generateCamp();
        camera.centerAt(character);
		UIManager.follow(character);
    },

    createEffect: function (descr) {
        this._effects.push(new Effect(descr));
    },

    generateSoldier : function(descr) {
        var soldier = new Soldier(descr);
        this._soldiers.push(soldier);
        return soldier;
    },
	
	getCharacter : function() {
        return this._character[0];
    },

    update: function(du) {

        for (var c = 0; c < this._categories.length; ++c) {

            var aCategory = this._categories[c];
            var i = 0;

            while (i < aCategory.length) {

                var status = aCategory[i].update(du);

                if (status === this.KILL_ME_NOW) {
                    aCategory.splice(i,1);
                }
                else {
                    ++i;
                }
            }
        }
    },

    render: function(ctx) {
        
    }

};

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();

