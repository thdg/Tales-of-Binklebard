/*

entityManager.js

A module which handles arbitrary entity-management for the simulation


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops 
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


var entityManager = {

// "PRIVATE" DATA

_items   : [],
_monsters : [],


// "PRIVATE" METHODS


_generateMonsters : function(num) {
    var i,
        NUM_MONSTERS = num;

    for (i = 0; i < NUM_MONSTERS; ++i) {
        this.generateMonster();
    }
},

_findNearestItem : function(posX, posY) {
    var closestItem = null,
        closestIndex = -1,
        closestSq = 1000 * 1000;

    for (var i = 0; i < this._items.length; ++i) {

        var thisItem = this._items[i];
        var itemPos = thisItem.getPos();
        var distSq = util.wrappedDistSq(
            itemPos.posX, itemPos.posY, 
            posX, posY,
            g_canvas.width, g_canvas.height);

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
    this._categories = [this._items, this._monsters];
},

init: function() {
    //this._generateMonsters();
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


generateMonster : function(descr) {
    this._monsters.push(new Monster(descr));
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

}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();

