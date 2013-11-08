"use strict";

/************************************************************************\

 A module that handles what entities are inside the camera borders
 to render only visible entities

\************************************************************************/


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

// PUBLIC METHODS

init : function() {
    // nothing yet
},

getNewRenderingID : function() {

    return this._nextID++;
},

register: function(entity) {
    
    var onCamera = camera.isOnCamera(entity.getPos());
    if (onCamera) this._entities.push(entity);
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
