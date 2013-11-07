"use strict";

/************************************************************************\

 Basic Model class

\************************************************************************/

function Model() {

}

Model.prototype.drawAt(ctx, x, y) {
	ctx.drawImage(this._activeSprite[this._activeFrame]);
}
