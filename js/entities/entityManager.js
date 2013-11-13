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

    // PUBLIC METHODS

    // A special return value, used by other objects,
    // to request the blessed release of death!
    //
    KILL_ME_NOW : -1,

    // Some things must be deferred until after initial construction
    // i.e. thing which need `this` to be defined.
    //
    deferredSetup : function () {
        this._categories = [this._items, this._soldiers, this._character, this._effects];
    },

    init: function() {
        var link = new Humanoid(g_sprites.link);
        var character = new Character({model: link, cx:200, cy:200});
        this._character.push(character);
        this._generateSoldiers(50);
        camera.centerAt(character);
    },

    createEffect: function (descr) {
        this._effects.push(new Effect(descr));
    },

    generateSoldier : function(descr) {
        var soldier = new Soldier(descr);
        this._soldiers.push(soldier);
        return soldier;
    },

    /*
    fireBullet: function(cx, cy, velX, velY, rotation) {
        this._bullets.push(new Bullet({
            cx   : cx,
            cy   : cy,
            velX : velX,
            velY : velY,

            rotation : rotation
        }));
    },

    



    generateShip : function(descr) {
        var ship = new Ship(descr);
        this._ships.push(ship);
        return ship;
    },

    killNearestShip : function(xPos, yPos) {
        var theShip = this._findNearestShip(xPos, yPos).theShip;
        if (theShip) {
            theShip.kill();
        }
    },

    yoinkNearestShip : function(xPos, yPos) {
        var theShip = this._findNearestShip(xPos, yPos).theShip;
        if (theShip) {
            theShip.setPos(xPos, yPos);
        }
    },

    resetShips: function() {
        this._forEachOf(this._ships, Ship.prototype.reset);
    },

    haltShips: function() {
        this._forEachOf(this._ships, Ship.prototype.halt);
    },  

    toggleRocks: function() {
        this._bShowRocks = !this._bShowRocks;
    },
    */
    update: function(du) {

        for (var c = 0; c < this._categories.length; ++c) {

            var aCategory = this._categories[c];
            var i = 0;

            while (i < aCategory.length) {

                var status = aCategory[i].update(du);

                if (status === this.KILL_ME_NOW) {
                    // remove the dead guy, and shuffle the others down to
                    // prevent a confusing gap from appearing in the array
                    aCategory.splice(i,1);
                }
                else {
                    ++i;
                }
            }
        }
        
        //if (this._rocks.length === 0) this._generateRocks();

    },

    render: function(ctx) {
        
    }

};

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();

