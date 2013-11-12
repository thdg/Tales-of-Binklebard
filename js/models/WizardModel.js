"use strict";

/************************************************************************\

 Wizard - "inherits" from Entity

\************************************************************************/

function WizardModel(sprite) {
    
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
    var frameSize = 64;
    this._animations = [[],[],[],[]];

    this._animations[this.FACE_UP][this.HALT] =
        new Animation(sprite, frameSize * 0, frameSize * 0, frameSize);
    this._animations[this.FACE_RIGHT][this.HALT] =
        new Animation(sprite, frameSize * 0, frameSize * 0, frameSize, Math.PI/2);
    this._animations[this.FACE_DOWN][this.HALT] =
        new Animation(sprite, frameSize * 0, frameSize * 0, frameSize, Math.PI);
    this._animations[this.FACE_LEFT][this.HALT] =
        new Animation(sprite, frameSize * 0, frameSize * 0, frameSize, 3*Math.PI/2);
    
    this._animations[this.FACE_UP][this.WALKING] =
        new Animation(sprite, frameSize * 0, frameSize * 0, frameSize, 0, 8, 200);
    this._animations[this.FACE_RIGHT][this.WALKING] =
        new Animation(sprite, frameSize * 0, frameSize * 0, frameSize, Math.PI/2, 8, 200);
    this._animations[this.FACE_DOWN][this.WALKING] =
        new Animation(sprite, frameSize * 0, frameSize * 0, frameSize, Math.PI, 8, 200);
    this._animations[this.FACE_LEFT][this.WALKING] =
        new Animation(sprite, frameSize * 0, frameSize * 0, frameSize, 3*Math.PI/2, 8, 200, true);

    this._animations[this.FACE_UP][this.ATTACKING] =
        new Animation(sprite, frameSize * 0, frameSize * 1, frameSize, 0, 8, 50);
    this._animations[this.FACE_RIGHT][this.ATTACKING] =
        new Animation(sprite, frameSize * 0, frameSize * 1, frameSize, Math.PI/2, 8, 50);
    this._animations[this.FACE_DOWN][this.ATTACKING] =
        new Animation(sprite, frameSize * 0, frameSize * 1, frameSize, Math.PI, 8, 50);
    this._animations[this.FACE_LEFT][this.ATTACKING] =
        new Animation(sprite, frameSize * 0, frameSize * 1, frameSize, 3*Math.PI/2, 8, 50);

    this._activeAnimation = this._animations[this._rotation][this._state];

}

WizardModel.prototype = new Model();
