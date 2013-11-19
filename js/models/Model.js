"use strict";

/************************************************************************\

 Basic Model class

\************************************************************************/

function Model(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

Model.prototype._alpha = 1.0;

Model.prototype.update = function(du) {

    var finishedAnimation = this._activeAnimation.update(du);
    if (this._frozen) this._frozen = !finishedAnimation;
    else this._activeAnimation = this._animations[this._rotation][this._state];
};

Model.prototype.drawCentredAt = function(ctx, cx, cy) {
    this._activeAnimation.sprite.alpha = this._alpha;
    this._activeAnimation.drawCentredAt(ctx, cx, cy);
};

Model.prototype._setState = function(state) {
    if (this._state === state || this._frozen ) return;
    this._state = state;
};

Model.prototype._setRotation = function(rotation) {
    if (this._rotation === rotation || this._frozen ) return;
    this._rotation = rotation;
};

Model.prototype._freezInState = function() {
    this._activeAnimation = this._animations[this._rotation][this._state];
    this._frozen = true;
};

Model.prototype.faceUp = function() {
    this._setRotation(this.FACE_UP);
};

Model.prototype.faceDown = function() {
    this._setRotation(this.FACE_DOWN);
};

Model.prototype.faceLeft = function() {
    this._setRotation(this.FACE_LEFT);
};

Model.prototype.faceRight = function() {
    this._setRotation(this.FACE_RIGHT);
};

Model.prototype.halt = function() {
    this._setState(this.HALT);
};

Model.prototype.attack = function() {
    this._setState(this.ATTACKING);
    this._freezInState();
};

Model.prototype.walk = function() {
    this._setState(this.WALKING);
};

Model.prototype.setAlpha = function(alpha) {
    this._alpha = alpha;
};
