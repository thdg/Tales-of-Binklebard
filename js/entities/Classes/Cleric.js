"use strict";


/************************************************************************\

 Cleric class

\************************************************************************/

function Cleric(descr) {

    this.wis + 2;
    this.dex - 2;
    
    this.sprite = this.sprite || g_sprites.link;
}

Cleric.prototype.updateStats = function () {

    this.spirit++;
    this.wis++;
    
    if(lvl%2 === 0)
        this.str++;
    
    if(lvl%3 === 0)
        this.dex++;

    this.energy = this.spirit * 30;
    this.armor = this.dex * 20;
    this.hp = this.str * 50;
    this.damage = this.str * 5 + this.wis;
}