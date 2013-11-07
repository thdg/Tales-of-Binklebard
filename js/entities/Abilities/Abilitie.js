// =========
// ABILITIES
// =========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Abil(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}
// Initial, inheritable, default values

Abil.prototype.lvlReq;
Abil.prototype.alvl;
Abil.prototype.cost;
Abil.prototype.target;
Abil.prototype.damage;
Abil.prototype.range;
Abil.prototype.area;

Abil.prototype.update = function () {
	// TODO: Implement this
};

Abil.prototype.energy = function () {
	// TODO: Implement this
};

Abil.prototype.Spells = function () {
	// TODO: Implement this
};





