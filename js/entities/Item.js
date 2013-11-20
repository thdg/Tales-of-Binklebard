"use strict";

function Item() {}

Item.prototype = new Entity();

Item.prototype.update = function (du) {

    spatialManager.unregister(this);
    renderingManager.unregister(this);
    
    if (this._isDeadNow) return entityManager.KILL_ME_NOW;
    
    spatialManager.register(this);
    renderingManager.register(this);
};

Item.prototype.reder = function (ctx) {

    this.model.render(ctx);
};

Item.prototype.pickUp = function (hustler) {


}

function HealingPotion() {
    this.setup();

    this.name = 'healingPotion'
}

HealingPotion.prototype = new Item();

function EnergyPotion() {
    this.setup();

    this.name = 'energyPotion'
}

EnergyPotion.prototype = new Item();
