/*

world.js

A module which handles world in the simulation

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var world = {

// "PRIVATE" DATA

_regions : [],
_activeRegion : undefined,

// "PRIVATE" METHODS



// PUBLIC METHODS

addRegion: function(region) {
    this._regions.push(region);
    this._activeRegion = region;
},

getHeight: function() {
    return this._activeRegion.height;
},

getWidth: function() {
    return this._activeRegion.width;
},

update: function(du) {
    this._activeRegion.update(du);
    tiles.update(du);
},

render: function(ctx) {
    this._activeRegion.render(ctx);
}

}
