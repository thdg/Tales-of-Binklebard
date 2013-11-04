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

var region = {

// "PRIVATE" DATA

_map : [],           // ground (grass, water, mud, rocks, hills, ...)
_staticObjects: [],  // unmoveable objects (trees, houses, ...)
_dynamicObjects: [], // moveable objects (monsters, mobveable things, stuff, ...) (just for initialation, put into entityManager)
_heightmap : [],     // 0: empty, 1: occupied -- put circles in spatial manager for every 1 with same center as tile :D

// PUBLIC DATA

width: 1000,
height: 1000,

// "PRIVATE" METHODS



// PUBLIC METHODS

}

var world = {

// "PRIVATE" DATA

_regions : [],
_activeRegion : undefined,

// "PRIVATE" METHODS



// PUBLIC METHODS

width: 1000,
height: 1000,

addRegion: function(region) {
    this._regions.push(region);
},

getHeight: function() {
    return this._activeRegion.height;
},

getWidth: function() {
    return this._activeRegion.width;
}

}
