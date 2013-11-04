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

_centerdEntity: undefined,

_margin: 64,

// PUBLIC DATA


// "PRIVATE" METHODS


// PUBLIC METHODS

centerAt : function(entity) {
	
	if (entity.getPos) {
		this._centerdEntity = entity
	} else {
		console.log("Object to center at must have getPos function.");
	}
},

isOnCamera: function(pos) {

    var inX = util.isBetween(
        this._posX,
        -this._margin,
        this._width+this._margin
    );

    var inY = util.isBetween(
        this._posY,
        -this._margin,
        this._height+this._margin
    );

    if (inX && inY)
        return true;
    
    return false;
},

update : function(du) {

	var pos = this._centerdEntity.getPos();
	this._posX = util.keepBetween(
        pos.posX, 
        this._width/2, 
        world.width-this._width/2
    );

	this._posY = util.keepBetween(
        pos.posY, 
        this._height/2, 
        world.height-this._height/2
    );

    this._posX-=this._width/2;
    this._posY-=this._height/2;
},

render : function(ctx) {

    var margin = 2;
    var oldStyle = ctx.strokeStyle = "orange";
    util.strokeBox( 
    	ctx,
    	this._posX+margin,
    	this._posY+margin,
    	this._width-2*margin,
    	this._height-2*margin
    );
    ctx.strokeStyle = oldStyle;

}


}
