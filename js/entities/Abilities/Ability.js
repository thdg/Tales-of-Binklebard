"use strict";

// A generic contructor which accepts an arbitrary descriptor object
function Ability(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}
// Initial, inheritable, default values

Ability.prototype.lvlReq;
Ability.prototype.alvl;
Ability.prototype.cost;
Ability.prototype.target;
Ability.prototype.damage;
Ability.prototype.range;
Ability.prototype.area;

Ability.prototype.update = function () {
	// TODO: Implement this
};

Ability.prototype.energy = function () {
	// TODO: Implement this
};

Ability.prototype.Spells = function () {
	// TODO: Implement this
};





