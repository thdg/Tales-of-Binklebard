"use strict";

var UIManager = {
/*
_cx : 0,
_cy : 508,
*/
init : function() {
	this.sprite = g_sprites.uibar;
	this._cx = 0;
	this._cy = 0;
	
},

update: function(du) {
	var pos = camera.getPos();
	this._cx = pos.posX;
	this._cy = pos.posY;
},

render : function (ctx) {
	this.sprite.drawAt(ctx, this._cx, this._cy);
},

getPos : function() {
	return {posX : this._cx, posY : this._cy};
}
};