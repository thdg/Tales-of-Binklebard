"use strict";

/************************************************************************\

 Wizard class

\************************************************************************/

// A generic contructor which accepts an arbitrary descriptor object
function Wizard(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}