/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

this.mainAtt = this.Wis;
this.secAtt = this.Str;
this.weakAtt = this.Dex;

// A generic contructor which accepts an arbitrary descriptor object
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
	
	if(this.experience >= (lvl * 1000) + 1000){
		this.lvlup();
		this.setAtt();
		this.updateStats();
	}
};