"use strict";

/************************************************************************\

 Wizard class

\************************************************************************/

function Wizard(descr) {

	this.setup(descr);
	this.randomizePos();
	this.nextExp = this.nextLvl(this.lvl);
	
    this.wis + 2;
    this.str - 2;

    this.lifeRegen  = 0.5 * this.spirit;
    this.energyRegen = 1  * this.spirit;
	
	this.MagicMissile = spellbook.magicMissile(1,1)
}

Wizard.prototype = new Character();


Wizard.prototype.KEY_MAGIC_MISSLE = '1'.charCodeAt(0);

Wizard.prototype.updateStats = function () {

    this.spirit++;
    this.wis++;
    
    if(this.lvl%2 === 0)
        this.dex++;
    
    if(this.lvl%3 === 0)
        this.str++;

    this.energy = this.wis * 30;
    this.armor = this.dex * 20;
    this.hp = this.str * 50;
    this.damage = this.str * 5 + this.wis;
};

Wizard.prototype.abilities = function(du)
{
    if (keys[this.KEY_MAGIC_MISSLE] && !this.isCasting) 
    {
        this.isCasting = true;
        this.MagicMissile.cast(this);
        this.coolDown = this.MagicMissile.descr.coolDown;

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
