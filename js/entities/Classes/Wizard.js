"use strict";

/************************************************************************\

 Wizard class

\************************************************************************/

function Wizard(descr) {

    this.setup(descr);
    this.randomizePos();
    this.nextExp = this.nextLvl(this.lvl);

    this.wis += 2;
    this.str -= 2;

    this.lifeRegen  = 0.5 * this.spirit;
    this.energyRegen = 1  * this.spirit;    
    this.lifeRegen = 0.5 * this.spirit;
    this.energyRegen = 1.5 *this.spirit;

    this.critChance	  = Math.ceil(0.35 * this.dex);
    this.critModifier = Math.ceil(0.2 * this.str);

    this.spellCritChance   = Math.ceil(0.35 * this.wis);
    this.spellCritModifier = Math.ceil(0.3 * this.wis);

    this.updateStats();
}

Wizard.prototype = new Character();


Wizard.prototype.KEY_MAGIC_MISSLE = '1'.charCodeAt(0);
Wizard.prototype.KEY_ARMOR        = '2'.charCodeAt(0);

Wizard.prototype.updateStats = function () {

    this.spirit++;
    this.wis++;
    
    if(this.lvl%2 === 0)
        this.dex++;
    
    if(this.lvl%3 === 0)
        this.str++;

    this.magicMissile = spellbook.magicMissile(this.lvl,this.wis);
    this.spiritArmor  = spellbook.armor(this.lvl,this.wis);

    this.energy = this.wis * 30;
    this.armor  = this.dex * 20;
    this.hp     = this.str * 50;
    this.damage = this.str * 5 + this.wis;
	this.critChance	  = Math.ceil(0.35 * this.dex);
	this.critModifier = Math.ceil(0.2 * this.str);
	
	this.spellCritChance = Math.ceil(0.35 * this.wis);
	this.spellCritModifier = Math.ceil(0.3 * this.wis);
};

Wizard.prototype.abilities = function(du)
{
    if (keys[this.KEY_MAGIC_MISSLE] && !this.isCasting) 
        this.cast(this.magicMissile);

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
