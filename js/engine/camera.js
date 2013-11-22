"use strict";

// A module that handles the camera view and position

var camera = {

    // "PRIVATE" DATA

    _posX: 0, // top left corner, relative to wor1ld
    _posY: 0,

    _speed: 512/SECS_TO_NOMINALS, // speed in px/sec in flying mode

    _width: g_canvas.width,
    _height: g_canvas.height,

    _centerdEntity: undefined,

    _margin: 32,

    KEY_UP: util.charCode('W'),
    KEY_DOWN: util.charCode('S'),
    KEY_LEFT: util.charCode('A'),
    KEY_RIGHT: util.charCode('D'),

    // PUBLIC DATA

    flyingMode: false,

    // PRIVATE METHODS

    _fly : function(du) {

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
        this._posX = Math.floor(this._posX);
        this._posY = Math.floor(this._posY);
    },

    // PUBLIC METHODS

    centerAt : function(entity) {

        if (entity.getPos) {
            this._centerdEntity = entity;
        } else {
            console.log("Object to center at must have getPos function.");
        }
    },

    getPos: function() {
        return {posX: this._posX, posY: this._posY};
    },

    getDimensions: function() {
        return {width: this._width, height: this._height};
    },

    setDimensions: function(width, height) {
        this._width = width;
        this._height = height;
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
            this._fly(du);
            return;
        }

        // if not in flying mode nor centered, stay pot
        if (!this._centerdEntity) return; 
        
        var pos = this._centerdEntity.getPos();
        this._posX = util.keepBetween(
            Math.floor(pos.posX),
            this._width/2,
            world.getWidth()-this._width/2
        );

        this._posY = util.keepBetween(
            Math.floor(pos.posY),
            this._height/2,
            world.getHeight()-this._height/2
        );

        this._posX-=this._width/2;
        this._posY-=this._height/2;
    },

    render : function(ctx) {

        var margin = 2;
        var oldStyle = ctx.strokeStyle;
        ctx.strokeStyle = "orange";
        
        util.strokeBox(
            ctx,
            this._posX+margin,
            this._posY+margin,
            this._width-2*margin,
            this._height-2*margin
        );
        ctx.strokeStyle = oldStyle;

    }
    
};
