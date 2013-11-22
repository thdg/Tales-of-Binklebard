"use strict";

/*

 A module that handles what entities are inside the camera borders
 to render only visible entities

*/

var renderingManager = {

    // "PRIVATE" DATA

    _nextID : 1,    // make all valid IDs non-falsey (i.e. don't start at 0)
    _entities : [], // list of entities that are visible on camera

    // "PRIVATE" METHODS

    _isRegistered: function(id) {

        for (var i=0; i<this._entities.length; i++) {
            if (this._entities[i].getRenderingID() === id)
                return true;
        }
        return false;
    },

    _addToQue : function(entity) {

        // entities should be sorted by posY value to be rendered in that order
        var posY = entity.getPos().posY;
        var i = 0; 
        while (this._entities[i] && this._entities[i].getPos().posY<posY) i++;
        this._entities.splice(i,0,entity);
    },

    // PUBLIC METHODS

    init : function() {
        // nothing 
    },

    getNewRenderingID : function() {

        return this._nextID++;
    },

    register: function(entity) {
        
        var visible = this.isVisible(entity.getPos());
        if (visible) this._addToQue(entity);
    },

    // this function should be overwritten to change visibility
    isVisible: function(pos) {
        return camera.isOnCamera(pos);
    },

    unregister: function(entity) {

        var renderingID = entity.getRenderingID();
        var i = 0;
        while (this._entities[i]) {
            if (this._entities[i].getRenderingID() === renderingID) {
                this._entities.splice(i,1);
                break;
            }
            i++;
        }
    },

    flush: function() {
        this._entities = [];
    },

    render: function(ctx) {

        for (var i=0; i<this._entities.length; i++) {
            this._entities[i].render(ctx);
        }
    }

};
