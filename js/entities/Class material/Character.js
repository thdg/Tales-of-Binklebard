// =========
// CHARACTER
// =========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Charac(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}
// Initial, inheritable, default values

//position

Charac.prototype.rotation = 0;
Charac.prototype.cx;
Charac.prototype.cy;
Charac.prototype.vel;

//abilites and lvl.

Charac.prototype.str;
Charac.prototype.dex;
Charac.prototype.wis;
Charac.prototype.spir;
Charac.prototype.lvl;

//profession based energy type for abilities

Charac.prototype.energy;

Charac.prototype.update = function () {
	// TODO: Implement this
};

Charac.prototype.render = function (ctx) {
	// TODO: Implement this
};

Charac.prototype.profession = function () {
    
}

Charac.prototype.statsUpdate = function () {
    
}

Charac.prototype.lvlUpdate = function () {
    
}

Charac.prototype.getPos = function () {
    return {posX : this.cx, posY : this.cy};
}

Charac.prototype.setPos = function (cx, cy) {
    this.cx = cx;
    this.cy = cy;
}

