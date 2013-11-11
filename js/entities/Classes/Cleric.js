"use strict";


/************************************************************************\

 Cleric class

\************************************************************************/

function Cleric(descr) {
    this.setup(descr);
    this.lvlup();
    
    this.mainAtt + 2;
    this.weakAtt - 2;
    
    this.sprite = this.sprite || g_sprites.link;
}

setExp: function (expReward) {
    this.experience = this.experience + expReward;
    
    if (this.experience >= (lvl * lvl * 1000) + lvl * 2000) {
        this.lvlup();
        this.setAtt();
        this.updateStats();
    }
};

setAtt: function () {
    this.Wis++;
    this.Spir++;
    
    if(lvl%2 === 0){
        this.Str++;
    }
    if(lvl%3 === 0){
        this.Dex++;
    }
    
};

updateStats: function () {
    this.energy = this.Wis * 30;
    this.armor = this.Dex * 20;
    this.hp = this.Str * 50;
    this.damage = this.Str * 5 + this.Wis;
}