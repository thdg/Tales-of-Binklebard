"use strict";

/*jslint browser: true, devel: true, white: true*/

/************************************************************************\

 Character - "inherits" from Entity
 Keeps track of the main character and it's stats and actions

\************************************************************************/

function Humanoid(sprite) {
    
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
        new Animation(sprite, frameSize * 0, frameSize * 0, frameSize);
    this._animations[this.FACE_RIGHT][this.HALT] =
        new Animation(sprite, frameSize * 1, frameSize * 0, frameSize);
    this._animations[this.FACE_LEFT][this.HALT] =
        new Animation(sprite, frameSize * 2, frameSize * 0, frameSize);
    this._animations[this.FACE_UP][this.HALT] =
        new Animation(sprite, frameSize * 3, frameSize * 0, frameSize);
    
    this._animations[this.FACE_LEFT][this.WALKING] =
        new Animation(sprite, frameSize * 0, frameSize * 2, frameSize, 8, 120, 0, true);
    this._animations[this.FACE_RIGHT][this.WALKING] =
        new Animation(sprite, frameSize * 0, frameSize * 2, frameSize, 8, 120);
    this._animations[this.FACE_DOWN][this.WALKING] =
        new Animation(sprite, frameSize * 0, frameSize * 3, frameSize, 8, 120);
    this._animations[this.FACE_UP][this.WALKING] =
        new Animation(sprite, frameSize * 0, frameSize * 4, frameSize, 8, 120);

    this._animations[this.FACE_DOWN][this.ATTACKING] =
        new Animation(sprite, frameSize * 0, frameSize * 5, frameSize, 7, 50);
    this._animations[this.FACE_LEFT][this.ATTACKING] =
        new Animation(sprite, frameSize * 0, frameSize * 6, frameSize, 7, 50);
    this._animations[this.FACE_RIGHT][this.ATTACKING] =
        new Animation(sprite, frameSize * 0, frameSize * 6, frameSize, 7, 50, 0, true);
    this._animations[this.FACE_UP][this.ATTACKING] =
        new Animation(sprite, frameSize * 0, frameSize * 8, frameSize, 6, 50);

    this._activeAnimation = this._animations[this._rotation][this._state];

}

Humanoid.prototype = new Model();
