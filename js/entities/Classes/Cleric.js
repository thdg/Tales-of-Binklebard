"use strict";

/************************************************************************\

 Cleric class

\************************************************************************/

this.mainAtt = this.Wis;
this.secAtt = this.Str;
this.weakAtt = this.Dex;

function Cleric(descr) {
    this.setup(descr);
	this.lvlup();
	
	this.mainAtt + 2;
	this.weakAtt - 2;
	
	this.sprite = this.sprite || g_sprites.bink;
}

function updateStats(){
	this.energy = this.mainAtt * 30;
	this.armor = this.Dex * 20 + this.MainAtt * 5;
	this.hp = this.Str * 50;
	this.damage = this.Str * 5 + this.mainAtt;
}

Chara.prototype.setExp = function (expRew) {
	this.experience = this.experience + expRew;
	
	if (this.experience >= (lvl*lvl*1000) + lvl*2000) {
		this.lvlup();
		this.setAtt();
		this.updateStats();
	}
};