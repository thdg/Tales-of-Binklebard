"use strict";

// Cleric class

function Cleric(descr) {

    this.setup(descr);
    this.randomizePos();
    this.nextExp = this.nextLvl(this.lvl);
    
    this.wis += 2;
    this.dex -= 2;
    
    
    this.lifeRegen = 0.5 * this.spirit;
    this.energyRegen = 1 *this.spirit;
    
    this.critChance  = Math.ceil(0.35 * this.dex);
    this.critModifier = Math.ceil(0.2 * this.str);
    
    this.spellCritChance = Math.ceil(0.35 * this.wis);
    this.spellCritModifier = Math.ceil(0.3 * this.wis);

    this.updateStats();
}

Cleric.prototype = new Character();

Cleric.prototype.KEY_CURE    = '1'.charCodeAt(0);
Cleric.prototype.KEY_ARMOR   = '2'.charCodeAt(0);

Cleric.prototype.updateStats = function () {

    this.spirit++;
    this.wis++;
    
    if(this.lvl%2 === 0)
        this.str++;
    
    if(this.lvl%3 === 0)
        this.dex++;

    this.cure        = spellbook.heal (this.lvl,this.wis);
    this.spiritArmor = spellbook.armor(this.lvl,this.wis);

    this.energy = this.wis * 30;
    this.armor = this.dex * 20;
    this.hp = this.str * 50;
    this.damage = this.str * 5 + this.wis;
    
    this.critChance  = Math.ceil(0.35 * this.dex);
    this.critModifier = Math.ceil(0.2 * this.str);
    
    this.spellCritChance = Math.ceil(0.35 * this.wis);
    this.spellCritModifier = Math.ceil(0.3 * this.wis);
};


Cleric.prototype.abilities = function(du) {

    if (keys[this.KEY_CURE] && !this.isCasting) 
        this.cast(this.cure);

    if (keys[this.KEY_ARMOR] && !this.isCasting) 
        this.cast(this.spiritArmor);

    if(this.isCasting) {
        this.coolDown -= du;
        if( this.coolDown <= 0)
        {
            this.coolDown = 0;
            this.isCasting = false;
        }
    }

};
