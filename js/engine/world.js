"use strict";

// A module which handles world in the simulation
// and renders/updates the current active Region

var world = {

    // "PRIVATE" DATA

    _regions : [],
    _activeRegion : undefined,

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

    setMap: function(map) {
        this._activeRegion.setMap(map);
    },

    setHeightmap: function(heightmap) {
        this._activeRegion.setHeightmap(heightmap);
    },

    getHeightMap: function() {
        return this._activeRegion._heightmap;
    },

    findTile: function(x,y) {
        return this._activeRegion.findTile(x,y);
    },

    collidesWith: function(x, y, r, h) {
        return this._activeRegion.collidesWith(x, y, r, h);
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
        return {map: this._activeRegion._map, heightmap: this._activeRegion._heightmap};
    },

    importMap: function(map, heightmap) {
        this._activeRegion = new Region(map, heightmap);
    },

};
