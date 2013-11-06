/*

camera.js

A module which handles the camera and the screen

*/

"use strict";

var camera = {

    // "PRIVATE" DATA

    _posX: 0, // top left corner
    _posY: 0, // relative to wor1ld

    _speed: 160/SECS_TO_NOMINALS,

    _width: 600,
    _height: 600,

    _centerdEntity: undefined,

    _margin: 0,

    // PUBLIC DATA

    flyingMode: false,

    KEY_UP: util.charCode('W'),
    KEY_DOWN: util.charCode('S'),
    KEY_LEFT: util.charCode('A'),
    KEY_RIGHT: util.charCode('D'),

    // "PRIVATE" METHODS


    // PUBLIC METHODS

    centerAt : function(entity) {
    	
    	if (entity.getPos) {
    		this._centerdEntity = entity
    	} else {
    		console.log("Object to center at must have getPos function.");
    	}
    },

    getPos: function() {
        return {posX: this._posX, posY: this._posY};
    },

    getDimentions: function() {
        return {width: this._width, height: this._height};
    },

    isOnCamera: function(pos) {

        var inX = util.isBetween(
            pos.posX,
            this._posX-this._margin,
            this._posX+this._width+this._margin
        );

        var inY = util.isBetween(
            pos.posY,
            this._posY-this._margin,
            this._posY+this._height+this._margin
        );

        if (inX && inY)
            return true;
        
        return false;
    },

    update : function(du) {

        if (this.flyingMode) {
            if (keys[this.KEY_LEFT]) {
                this._posX -= this._speed*du;
            }
            if (keys[this.KEY_RIGHT]) {
                this._posX += this._speed*du;
            }
            if (keys[this.KEY_UP]) {
                this._posY -= this._speed*du;
            }
            if (keys[this.KEY_DOWN]) {
                this._posY += this._speed*du;
            }

            return;
        }

        if (!this._centerdEntity) return;
        
    	var pos = this._centerdEntity.getPos();
    	this._posX = util.keepBetween(
            pos.posX, 
            this._width/2, 
            world.getWidth()-this._width/2
        );

    	this._posY = util.keepBetween(
            pos.posY, 
            this._height/2, 
            world.getHeight()-this._height/2
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
