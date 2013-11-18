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
}

Warrior.prototype = new Character();

Warrior.prototype.updateStats = function () {

    this.spirit++;
    this.str++;
    
    if(this.lvl%2 === 0)
        this.dex++;
    
    if(this.lvl%3 === 0)
        this.wis++;

    this.energy = this.str * 30;
    this.armor = this.dex * 20;
    this.hp = this.str * 50;
    this.damage = this.str * 5 + this.str;
};

Warrior.prototype.abilities = function(du)
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
