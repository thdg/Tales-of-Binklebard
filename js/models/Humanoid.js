"use strict";

/*jslint browser: true, devel: true, white: true */

/************************************************************************\

 Character - "inherits" from Entity
 Keeps track of the main character and it's stats and actions

\************************************************************************/

function Humanoid(sprite) {

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

	this._animations[this.FACE_DOWN][this.HALT] =
		new Animation(sprite, frameSize*0, frameSize*0, 1);
	this._animations[this.FACE_RIGHT][this.HALT] =
		new Animation(sprite, frameSize*1, frameSize*0, 1);
	this._animations[this.FACE_LEFT][this.HALT] =
		new Animation(sprite, frameSize*2, frameSize*0, 1);
	this._animations[this.FACE_UP][this.HALT] =
		new Animation(sprite, frameSize*3, frameSize*0, 1);
	
	this._animations[this.FACE_LEFT][this.WALKING] =
		new Animation(sprite, frameSize*0, frameSize*1, 7, 200);
	this._animations[this.FACE_RIGHT][this.WALKING] =
		new Animation(sprite, frameSize*0, frameSize*2, 7, 200);
	this._animations[this.FACE_DOWN][this.WALKING] =
		new Animation(sprite, frameSize*0, frameSize*3, 7, 200);
	this._animations[this.FACE_UP][this.WALKING] =
		new Animation(sprite, frameSize*0, frameSize*4, 7, 200);

	this._animations[this.FACE_DOWN][this.ATTACKING] =
		new Animation(sprite, frameSize*0, frameSize*5, 5, 50);
	this._animations[this.FACE_LEFT][this.ATTACKING] =
		new Animation(sprite, frameSize*0, frameSize*6, 5, 50);
	this._animations[this.FACE_RIGHT][this.ATTACKING] =
		new Animation(sprite, frameSize*0, frameSize*7, 5, 50);
	this._animations[this.FACE_UP][this.ATTACKING] =
		new Animation(sprite, frameSize*0, frameSize*8, 5, 50);

	this._activeAnimation = this._animations[this._rotation][this._state];

}

// Humanoid.prototype = new Model();

Humanoid.prototype.update = function(du) {

	var finishedAnimation = this._activeAnimation.update(du);
	if (this._frozen) this._frozen = !finishedAnimation;
	else this._activeAnimation = this._animations[this._rotation][this._state];
};

Humanoid.prototype.drawCentredAt = function(ctx, cx, cy) {
	this._activeAnimation.drawCentredAt(ctx, cx, cy);
};

Humanoid.prototype._setState = function(state) {
	if (this._state === state || this._frozen ) return;
	this._state = state;
};

Humanoid.prototype._setRotation = function(rotation) {
	if (this._rotation === rotation || this._frozen ) return;
	this._rotation = rotation;
};

Humanoid.prototype._freezInState = function() {
	this._activeAnimation = this._animations[this._rotation][this._state];
	this._frozen = true;
};

Humanoid.prototype.faceUp = function() {
	this._setRotation(this.FACE_UP);
};

Humanoid.prototype.faceDown = function() {
	this._setRotation(this.FACE_DOWN);
};

Humanoid.prototype.faceLeft = function() {
	this._setRotation(this.FACE_LEFT);
};

Humanoid.prototype.faceRight = function() {
	this._setRotation(this.FACE_RIGHT);
};

Humanoid.prototype.halt = function() {
	this._setState(this.HALT);
};

Humanoid.prototype.attack = function() {
	this._setState(this.ATTACKING);
	this._freezInState();
};

Humanoid.prototype.walk = function() {
	this._setState(this.WALKING);
};
