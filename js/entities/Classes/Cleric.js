"use strict";

/************************************************************************\

 Cleric class

\************************************************************************/

function Cleric(descr) {

    this.setup(descr);
	this.randomizePos();
	this.nextExp = this.nextLvl(this.lvl);
	
	this.wis + 2;
    this.dex - 2;
	
	this.lifeRegen = 0.5 * this.spirit;
	this.energyRegen = 1 *this.spirit;
	
	this.critChance	 = 0.35 * this.dex;
	this.critModifier = 0.2 * this.str;
	
	this.spellCritChance = 0.35 * this.wis;
	this.spellCritModifier = 0.2 * this.wis;
	
	this.Heal         = spellbook.heal(1,1);
}

Cleric.prototype = new Character();

Character.prototype.KEY_HEAL         = '1'.charCodeAt(0);

Cleric.prototype.updateStats = function () {

    this.spirit++;
    this.wis++;
    
    if(this.lvl%2 === 0)
        this.str++;
    
    if(this.lvl%3 === 0)
        this.dex++;

    this.energy = this.wis * 30;
    this.armor = this.dex * 20;
    this.hp = this.str * 50;
    this.damage = this.str * 5 + this.wis;
	this.critChance	 = 0.35 * this.dex;
	this.critModifier = 0.2 * this.str;
	
	this.spellCritChance = 0.35 * this.wis;
	this.spellCritModifier = 0.3 * this.wis;
};


Cleric.prototype.abilities = function(du)
{
    if (keys[this.KEY_HEAL] && !this.isCasting) 
    {
        this.isCasting = true;
        this.Heal.cast(this);
        this.coolDown = this.Heal.descr.coolDown;

        this.model.attack(); //should be model.cast();

    } else if(this.isCasting)
    {
        this.coolDown -= du;
        if( this.coolDown <= 0)
        {
            this.coolDown = 0;
            this.isCasting = false;
        }
    }
};
