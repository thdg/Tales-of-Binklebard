"use strict"

// Backpack object for player

function Backpack() {
    
    this.healingPotions = 0;
    this.energyPotions = 0;
    this.armorSet = undefined;
    this.weponSet = undefined;
}

Backpack.prototype.update = function (carrier) {

    if (eatKey(carrier.USE_HP) && this.healingPotions>0) {
        carrier.heal(carrier.hp*0.25);
        this.healingPotions--;
    }
    if (eatKey(carrier.USE_EP) && this.energyPotions>0 ) {
        carrier.energyBoost(carrier.energy*0.25);
        this.energyPotions--;
    }

};