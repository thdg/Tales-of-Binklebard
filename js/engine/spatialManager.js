/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],

// "PRIVATE" METHODS
//
// <none yet>


// PUBLIC METHODS

getNewSpatialID : function() {

    // TODO: YOUR STUFF HERE!
    return this._nextSpatialID++;

},

register: function(entity) {
    var pos = entity.getPos();
    var spatialID = entity.getSpatialID();
    
    // TODO: YOUR STUFF HERE!
    this._entities.push({
        entity: entity,
        posX: pos.posX,
        posY: pos.posY,
        radius: entity.getRadius()
    });

},

unregister: function(entity) {
    var spatialID = entity.getSpatialID();

    // TODO: YOUR STUFF HERE!
    var i = 0;
    while (this._entities[i]) {
        if (this._entities[i].entity.getSpatialID() === spatialID) {
            this._entities.splice(i,1);
            break;
        }
        i++;
    }

},

findEntityInRange: function(posX, posY, radius) {

    // TODO: YOUR STUFF HERE!
    for (var i=0; i<this._entities.length; i++) {
        var pos = this._entities[i].entity.getPos();
        var rad = this._entities[i].entity.getRadius();
        if (this.doCollide(pos, rad, posX, posY, radius)) {
            return this._entities[i].entity;
        }
    }

},

doCollide: function(pos, rad, posX, posY, radius) {
    var dist = util.wrappedDistSq(
        pos.posX, 
        pos.posY, 
        posX, 
        posY, 
        g_canvas.width, 
        g_canvas.height
    );
    return dist < util.square(rad+radius);
},

render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";
    
    for (var ID in this._entities) {
        var e = this._entities[ID];
        util.strokeCircle(ctx, e.posX, e.posY, e.radius);
    }
    ctx.strokeStyle = oldStyle;
}

}
