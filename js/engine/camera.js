/*

camera.js

A module which handles the camera and the screen

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var camera = {

// "PRIVATE" DATA

_posX: 0,
_posY: 0,

_width: 600,
_height: 600,

_centerAt: undefined,

// PUBLIC DATA


// "PRIVATE" METHODS


// PUBLIC METHODS

centerAt : function(entity) {
	
	if (entity.getPos) {
		this._centerAt = entity
	} else {
		console.log("Object to center at must have getPos function.");
	}
},

update : function(du) {

	var pos = this._centerAt.getPos();
	this._posX = pos.posX;
	this._posY = pos.posY;

	// TODO: dont let to close to edges
},

render : function(ctx) {

	var frame1 = spatialManager.findFrame({ 
		posX: this._posX-this._width/2,
        posY: this._posY-this._height/2 
    });

	var frame2 = spatialManager.findFrame({ 
		posX: this._posX+this._width/2,
        posY: this._posY+this._height/2 
    });

	var entities = spatialManager.getFrames(
		frame1, frame2
    );

    for (var i=0; i<entities.length; i++) {
        entities[i].entity.render(ctx);
    }

    var margin = 5;
    var oldStyle = ctx.strokeStyle = "green";
    util.strokeBox( 
    	ctx,
    	this._posX-this._width/2+margin,
    	this._posY-this._height/2+margin,
    	this._width-2*margin,
    	this._height-2*margin
    );
    ctx.strokeStyle = oldStyle;

}


}
