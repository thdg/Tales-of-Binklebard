"use strict";

/*jslint browser: true, devel: true, white: true*/

/************************************************************************\

 Character - "inherits" from Entity
 Keeps track of the main character and it's stats and actions

\************************************************************************/

function GreenSoldier(sprite) {

    this._interval = 200; // time beetween frames in ms

    // rotations
    this.FACE_RIGHT = 0;
    this.FACE_UP    = 1;
    this.FACE_LEFT  = 2;
    this.FACE_DOWN  = 3;

    // states
    this.HALT = 0;
    this.ATTACKING = 1;
    this.WALKING = 2;

    // initialize
    this._rotation = this.FACE_DOWN;
    this._state = this.HALT;
    this._frozen = false;

    // animation matrix
    var frameSize = ANIMATION_FRAME_SIZE;
    this._animations = [[],[],[],[]];

    this._animations[this.FACE_LEFT][this.HALT] =
        new Animation(sprite, frameSize * 0, frameSize * 0, 1);
    this._animations[this.FACE_DOWN][this.HALT] =
        new Animation(sprite, frameSize * 0, frameSize * 1, 1);
    this._animations[this.FACE_UP][this.HALT] =
        new Animation(sprite, frameSize * 0, frameSize * 2, 1);
    this._animations[this.FACE_RIGHT][this.HALT] =
        new Animation(sprite, frameSize * 0, frameSize * 3, 1);
    
    this._animations[this.FACE_LEFT][this.WALKING] =
        new Animation(sprite, frameSize * 0, frameSize * 0, 4, 200);
    this._animations[this.FACE_DOWN][this.WALKING] =
        new Animation(sprite, frameSize * 0, frameSize * 1, 5, 200);
    this._animations[this.FACE_UP][this.WALKING] =
        new Animation(sprite, frameSize * 0, frameSize * 2, 5, 200);
    this._animations[this.FACE_RIGHT][this.WALKING] =
        new Animation(sprite, frameSize * 0, frameSize * 3, 4, 200);
    
    this._animations[this.FACE_LEFT][this.ATTACKING] =
        new Animation(sprite, frameSize * 0, frameSize * 0, 4, 50);
    this._animations[this.FACE_DOWN][this.ATTACKING] =
        new Animation(sprite, frameSize * 0, frameSize * 1, 5, 50);
    this._animations[this.FACE_UP][this.ATTACKING] =
        new Animation(sprite, frameSize * 0, frameSize * 2, 5, 50);
    this._animations[this.FACE_RIGHT][this.ATTACKING] =
        new Animation(sprite, frameSize * 0, frameSize * 3, 4, 50);
    

    this._activeAnimation = this._animations[this._rotation][this._state];

}

// GreenSoldier.prototype = new Model();

GreenSoldier.prototype.update = function(du) {

    var finishedAnimation = this._activeAnimation.update(du);
    if (this._frozen) this._frozen = !finishedAnimation;
    else this._activeAnimation = this._animations[this._rotation][this._state];
};

GreenSoldier.prototype.drawCentredAt = function(ctx, cx, cy) {
    this._activeAnimation.drawCentredAt(ctx, cx, cy);
};

GreenSoldier.prototype._setState = function(state) {
    if (this._state === state || this._frozen ) return;
    this._state = state;
};

GreenSoldier.prototype._setRotation = function(rotation) {
    if (this._rotation === rotation || this._frozen ) return;
    this._rotation = rotation;
};

GreenSoldier.prototype._freezInState = function() {
    this._activeAnimation = this._animations[this._rotation][this._state];
    this._frozen = true;
};

GreenSoldier.prototype.faceUp = function() {
    this._setRotation(this.FACE_UP);
};

GreenSoldier.prototype.faceDown = function() {
    this._setRotation(this.FACE_DOWN);
};

GreenSoldier.prototype.faceLeft = function() {
    this._setRotation(this.FACE_LEFT);
};

GreenSoldier.prototype.faceRight = function() {
    this._setRotation(this.FACE_RIGHT);
};

GreenSoldier.prototype.halt = function() {
    this._setState(this.HALT);
};

GreenSoldier.prototype.attack = function() {
    this._setState(this.ATTACKING);
    this._freezInState();
};

GreenSoldier.prototype.walk = function() {
    this._setState(this.WALKING);
};
