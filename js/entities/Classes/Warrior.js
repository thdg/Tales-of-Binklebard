"use strict";

/************************************************************************\

 Warrior class

\************************************************************************/

// A generic contructor which accepts an arbitrary descriptor object
function Warrior(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}