"use strict";

/************************************************************************\

 Warrior class

\************************************************************************/

// A generic contructor which accepts an arbitrary descriptor object

function Warrior(descr) {
	
	this.setup(descr);
	this.randomizePos();
	this.nextExp = this.nextLvl(this.lvl);
	
    this.str + 2;
    this.wis - 2;
	
	this.lifeRegen = 1 * this.spirit;
	this.energyRegen = 1 * this.spirit;

    this.sweep = spellbook.fling(1,this.str);
	
	this.critChance	 = Math.ceil(0.35 * this.dex);
	this.critModifier = Math.ceil(0.2 * this.str);
}

Warrior.prototype = new Character();

Warrior.prototype.KEY_SWEEP = '1'.charCodeAt(0);
Warrior.prototype.KEY_FLING = '2'.charCodeAt(0);

Warrior.prototype.updateStats = function () {

    this.spirit++;
    this.str++;
    
    if(this.lvl%2 === 0)
        this.dex++;
    
    if(this.lvl%3 === 0)
        this.wis++;

    this.energy = this.str * 30;
    this.armor  = this.dex * 20;
    this.hp     = this.str * 50;
    this.damage = this.str * 5 + this.str;
	
	this.critChance	 = Math.ceil(0.35 * this.dex);
	this.critModifier = Math.ceil(0.2 * this.str);
};

Warrior.prototype.abilities = function(du) {
    if ( keys[this.KEY_SWEEP] && !this.isCasting ) 
        this.cast(this.sweep);

    if ( keys[this.KEY_FLING] && !this.isCasting && this.fling)
        this.cast(this.fling);

    if( this.isCasting ) {
        this.coolDown -= du;
        if( this.coolDown <= 0)
        {
            this.coolDown = 0;
            this.isCasting = false;
        }
    }
};
