"use strict";

/************************************************************************\

 Character - "inherits" from Entity
 Keeps track of the main character and it's stats and actions

\************************************************************************/

function GreenSoldier(sprite) {

    this._interval = 400; // time beetween frames in ms

    // rotations
    this.FACE_RIGHT = 0;
    this.FACE_UP    = 1;
    this.FACE_LEFT  = 2;
    this.FACE_DOWN  = 3;

    // states
    this.HALT = 0;
    this.WALKING = 1;
    this.LOOKING = 2;
    // this.ATTACKING = 3;

    // initialize
    this._rotation = this.FACE_DOWN;
    this._state = this.HALT;
    this._frozen = false;

    // animation matrix
    var frameSize = ANIMATION_FRAME_SIZE;
    this._animations = [[],[],[],[]];

    this._animations[this.FACE_LEFT][this.HALT] =
        new Animation(sprite, frameSize * 0, frameSize * 0);
    this._animations[this.FACE_DOWN][this.HALT] =
        new Animation(sprite, frameSize * 0, frameSize * 1);
    this._animations[this.FACE_UP][this.HALT] =
        new Animation(sprite, frameSize * 0, frameSize * 2);
    this._animations[this.FACE_RIGHT][this.HALT] =
        new Animation(sprite, frameSize * 0, frameSize * 3);
    
    this._animations[this.FACE_LEFT][this.WALKING] =
        new Animation(sprite, frameSize * 0, frameSize * 0, 3, 200);
    this._animations[this.FACE_DOWN][this.WALKING] =
        new Animation(sprite, frameSize * 0, frameSize * 1, 4, 200);
    this._animations[this.FACE_UP][this.WALKING] =
        new Animation(sprite, frameSize * 0, frameSize * 2, 4, 200);
    this._animations[this.FACE_RIGHT][this.WALKING] =
        new Animation(sprite, frameSize * 0, frameSize * 3, 3, 200);
    
    /*
    this._animations[this.FACE_LEFT][this.ATTACKING] =
        new Animation(sprite, frameSize * 0, frameSize * 0, 4, 50);
    this._animations[this.FACE_DOWN][this.ATTACKING] =
        new Animation(sprite, frameSize * 0, frameSize * 1, 5, 50);
    this._animations[this.FACE_UP][this.ATTACKING] =
        new Animation(sprite, frameSize * 0, frameSize * 2, 5, 50);
    this._animations[this.FACE_RIGHT][this.ATTACKING] =
        new Animation(sprite, frameSize * 0, frameSize * 3, 4, 50);
    */

    this._activeAnimation = this._animations[this._rotation][this._state];

}

GreenSoldier.prototype = new Model();
