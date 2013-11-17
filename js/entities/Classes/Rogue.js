"use strict";

/************************************************************************\

 Rogue class

\************************************************************************/

// A generic contructor which accepts an arbitrary descriptor object

function Rogue(descr) {
	
	this.setup(descr);
	this.randomizePos();
	this.nextExp = this.nextLvl(this.lvl);
	this.updateStats();
	
    this.dex + 2;
    this.str - 2;
	
	this.rake         = spellbook.rake(1,this.dex);
}

Rogue.prototype = new Character();

Character.prototype.KEY_RAKE        = '1'.charCodeAt(0);

Rogue.prototype.updateStats = function () {

    this.spirit++;
    this.dex++;
    
    if(this.lvl%2 === 0)
        this.wis++;
    
    if(this.lvl%3 === 0)
        this.str++;

    this.energy = this.dex * 30;
    this.armor = this.dex * 20;
    this.hp = this.str * 50;
    this.damage = this.str * 5 + this.dex;
};

Rogue.prototype.abilities = function(du)
{
    if (keys[this.KEY_RAKE] && !this.isCasting) 
    {
        this.isCasting = true;
        this.rake.cast(this);
        this.coolDown = this.rake.descr.coolDown;

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

Rogue.prototype.addExp = function (expReward) {

    this.experience = this.experience + expReward;
    if (this.experience >= this.nextExp) {
        this.lvlup();
		this.updateStats();
    }
    
};