"use strict";

// Rogue class

function Rogue(descr) {
    
    this.setup(descr);
    this.randomizePos();
    this.nextExp = this.nextLvl(this.lvl);
    
    this.dex += 2;
    this.str -= 2;

    this.updateStats();
    
    this.lifeRegen   = 0.5 * this.spirit;
    this.energyRegen = 1   * this.spirit;
    
    this.critChance  = Math.ceil(0.35 * this.dex);
    this.critModifier = Math.ceil(0.2 * this.str);
    
    this.missChange = 0.01 * this.dex;

    this.updateStats();
}

Rogue.prototype = new Character();

Rogue.prototype.KEY_RAKE = '1'.charCodeAt(0);
Rogue.prototype.KEY_FADE = '2'.charCodeAt(0);

Rogue.prototype.updateStats = function () {

    this.spirit++;
    this.dex++;
    
    if(this.lvl%2 === 0){
        this.wis++;
    }
    
    if(this.lvl%3 === 0){
        this.str++;
    }

    this.armor = this.dex * 20;
    this.hp = this.str * 50;
    this.damage = this.str * 5;
    
    this.critChance  = Math.ceil(0.35 * this.dex);
    this.critModifier = Math.ceil(0.2 * this.str);
    
    this.missChange = 0.01 * this.dex;
    
    this.lifeRegen = 0.5*this.spirit;
    this.energyRegen = 1 *this.spirit;
    
    this.rake = spellbook.rake(this.lvl,this.dex);
    
    if (this.lvl >= 3){
        this.fade = spellbook.fade(this.lvl,this.dex);
    }
};

Rogue.prototype.abilities = function(du) {
    if ( keys[this.KEY_RAKE] && !this.isCasting ) 
        this.cast(this.rake);

    if ( keys[this.KEY_FADE] && !this.isCasting && this.fade ) 
        this.cast(this.fade);

    if(this.isCasting) {
        this.coolDown -= du;
        if( this.coolDown <= 0) {
            this.coolDown = 0;
            this.isCasting = false;
        }
    }
};

