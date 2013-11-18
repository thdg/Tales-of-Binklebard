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

	getRegion: function() {
	    return this._activeRegion;
	},

	getMap: function() {
		return this._activeRegion._map;
	},

	findTile: function(x,y) {
		return this._activeRegion.findTile(x,y);
	},

	collidesWith: function(x, y, r) {
		return this._activeRegion.collidesWith(x, y, r);
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
	},

	exportMap: function() {
		return {map: this._activeRegion._map, heightmap: this._activeRegion._heightmap}
	},

	importMap: function(map, heightmap) {
		this._activeRegion = new Region(map, heightmap);
	},

};
