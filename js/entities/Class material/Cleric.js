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
	this.setlvl();
	
	this.mainAtt + 2;
	this.weakAtt - 2;
}
Cleric.prototype = new Chara();

Cleric.prototype.faith;
this.energy = this.faith;

Cleric.prototype = new Chara();

function updateStats(){
	this.faith = this.mainAtt * 30;
	this.armor = this.Dex * 20 + this.MainAtt * 5;
	this.hp = this.Str * 50;
}
