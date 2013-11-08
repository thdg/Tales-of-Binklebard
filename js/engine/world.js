"use strict";

/************************************************************************\

 A module which handles world in the simulation

\************************************************************************/

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

};
