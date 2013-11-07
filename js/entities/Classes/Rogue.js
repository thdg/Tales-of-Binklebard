"use strict";

/************************************************************************\

 Rouge class

\************************************************************************/

// A generic contructor which accepts an arbitrary descriptor object
function Rogue(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}