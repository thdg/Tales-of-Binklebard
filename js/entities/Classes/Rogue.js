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

Character.prototype.KEY_RAKE = '1'.charCodeAt(0);
Character.prototype.KEY_FADE = '2'.charCodeAt(0);

Rogue.prototype.updateStats = function () {

    this.spirit++;
    this.dex++;
    
    if (this.lvl%2 === 0)
        this.wis++;
    
    if (this.lvl%3 === 0)
        this.str++;

    if (this.lvl >= 3)
        this.fade = spellbook.fade(this.lvl,this.dex)

    this.energy = this.dex * 30;
    this.armor = this.dex * 20;
    this.hp = this.str * 50;
    this.damage = this.str * 5 + this.dex;
    this.rake = spellbook.rake(this.lvl,this.dex);
};

Rogue.prototype.abilities = function(du)
{
    if ( keys[this.KEY_RAKE] && !this.isCasting ) 
    {
        this.isCasting = true;
        this.rake.cast(this);
        this.coolDown = this.rake.descr.coolDown;

        this.model.attack(); //should be model.cast();

    }

    if ( keys[this.KEY_FADE] && !this.isCasting && this.fade ) 
    {
        this.isCasting = true;
        this.fade.cast(this);
        this.coolDown = this.fade.descr.coolDown;

        this.model.attack(); //should be model.cast();

    }

    if(this.isCasting)
    {
        this.coolDown -= du;
        if( this.coolDown <= 0)
        {
            this.coolDown = 0;
            this.isCasting = false;
        }
    }
};

Rogue.prototype.setFading = function(fade)
{
    if ( fade === true )
    {
        this.missChange = 0.5;
        this.model.setAlpha( 0.5 );
    }
    else
    {
        this.missChange = 0;
        this.model.setAlpha( 1.0 );
    }
};
