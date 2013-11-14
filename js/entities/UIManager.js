"use strict";

var UIManager = {

	init : function() {
		this.bar = g_sprites.uibar;
		this.map = g_sprites.uimap;
		this._cx = 0;
		this._cy = 0;
		this.posXp = 0;
	},

	update: function(du) {
		var pos = camera.getPos();
		this.hpRatio = this._character.getHpRatio();
		this.energyRatio = this._character.getEnergyRatio();
		this._cx = pos.posX;
		this._cy = pos.posY;
		
		this.calculateBar();
	},
	
	follow : function (character) {
		this._character = character;
	},
	
	render : function (ctx) {
		this.lifeBall(ctx);
		this.bar.drawAt(ctx, this._cx, this._cy);
		this.map.drawAt(ctx, this._cx, this._cy);
		this.renderXp(ctx);
	},

	renderXp : function (ctx) {
		var startX = 200,
			finishX = 600,
			startY = 593;
		
		util.fillBox(
			ctx, 
			startX, 
			startY, 
			finishX * this.posXp,
			3,
			"Yellow"
		);
	},
	
	calculateBar : function () {
		var lvl = this._character.lvl - 1;
		var startExp = this._character.nextLvl(lvl);
		var exp = this._character.experience - startExp;
		var nextExp = this._character.nextExp - startExp;
		
		this.posXp = exp / nextExp;
	},
	
	lifeBall: function(ctx) {
	
		var oldastyle = ctx.fillstyle;
	
		var gradient = ctx.createLinearGradient(this._cx, 0, this._cx+800, 0);
		gradient.addColorStop(0.07, "#f00");
		gradient.addColorStop(0.1, "#100");

		gradient.addColorStop(0.90,"#00f");
		gradient.addColorStop(0.93, "#001");
		ctx.fillStyle = gradient;
		
		ctx.beginPath();
		ctx.arc(this._cx+68, this._cy+547, this.hpRatio * 40, 0, 2 * Math.PI);
		ctx.arc(this._cx+730, this._cy+547, this.energyRatio * 40, 0, 2 * Math.PI);
		ctx.closePath();

		ctx.fill();

		ctx.fillstyle = oldastyle;
	},

	getPos : function() {
		return {posX : this._cx, posY : this._cy};
	}
};