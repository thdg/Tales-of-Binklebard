"use strict";

/************************************************************************\


\************************************************************************/

function Animation(sprite, startX, startY, frames, interval, reflect) {

    if (interval === undefined) interval = 0;
    if (reflect === undefined)  reflect = false;

    this._sprite    = sprite
    this._frames    = frames;
    this._startX    = startX;
    this._startY    = startY;
    this._reflect   = reflect;
    this._interval  = interval; // time beetween frames in ms
    this._frameSize = ANIMATION_FRAME_SIZE;

    this._timeTilNextFrame = interval;
    this._activeFrame = 0;

}

Animation.prototype.update = function(du) {

    if (this._interval===0) return; // static model, no need to update

    this._timeTilNextFrame -= du * NOMINAL_UPDATE_INTERVAL;
    if (this._timeTilNextFrame>0) return;

    this._timeTilNextFrame += this._interval;
    this._activeFrame = this._activeFrame+1;

    if (this._activeFrame>=this._frames) {
        this._activeFrame = 0;
        return true;
    }

    return false;
};

Animation.prototype.drawCentredAt = function(ctx, cx, cy) {
    var startX = this._startX+this._activeFrame*this._frameSize;
    this._sprite.drawFrameCenterdAt(ctx, cx, cy, startX, this._startY,
        this._frameSize, this._frameSize, this._reflect);
}

