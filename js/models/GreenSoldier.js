"use strict";

// Description for the soldier model

function GreenSoldier(sprite) {

    // rotations
    this.FACE_RIGHT = 0;
    this.FACE_UP    = 1;
    this.FACE_LEFT  = 2;
    this.FACE_DOWN  = 3;

    // states
    this.HALT = 0;
    this.WALKING = 1;
    // this.ATTACKING = 2;

    // initialize
    this._rotation = this.FACE_DOWN;
    this._state = this.HALT;
    this._frozen = false;

    // animation matrix
    var frameSize = ANIMATION_FRAME_SIZE;
    this._animations = [[],[],[],[]];

    this._animations[this.FACE_LEFT][this.HALT] =
        new Animation(sprite, frameSize * 0, frameSize * 0,frameSize);
    this._animations[this.FACE_DOWN][this.HALT] =
        new Animation(sprite, frameSize * 0, frameSize * 1,frameSize);
    this._animations[this.FACE_UP][this.HALT] =
        new Animation(sprite, frameSize * 0, frameSize * 2,frameSize);
    this._animations[this.FACE_RIGHT][this.HALT] =
        new Animation(sprite, frameSize * 0, frameSize * 3,frameSize);
    
    this._animations[this.FACE_LEFT][this.WALKING] =
        new Animation(sprite, frameSize * 0, frameSize * 0,frameSize, 3, 200);
    this._animations[this.FACE_DOWN][this.WALKING] =
        new Animation(sprite, frameSize * 0, frameSize * 1,frameSize, 4, 200);
    this._animations[this.FACE_UP][this.WALKING] =
        new Animation(sprite, frameSize * 0, frameSize * 2,frameSize, 4, 200);
    this._animations[this.FACE_RIGHT][this.WALKING] =
        new Animation(sprite, frameSize * 0, frameSize * 3,frameSize, 3, 200);

    this._activeAnimation = this._animations[this._rotation][this._state];

}

GreenSoldier.prototype = new Model();
