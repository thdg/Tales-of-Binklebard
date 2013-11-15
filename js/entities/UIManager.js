"use strict";

var UIManager = {

	init : function() {
		this.bar = g_sprites.uibar;
		this.map = g_sprites.uimap;
		this.life = g_sprites.lifeball;
		this.mana = g_sprites.manaball;
		this.lmyst = g_sprites.lifemyst;
		this.mmyst = g_sprites.manamyst;
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
		this.life.drawAt(ctx, this._cx, this._cy);
		this.mana.drawAt(ctx, this._cx, this._cy);
		this.lifeBall(ctx);
		this.lmyst.drawAt(ctx, this._cx, this._cy);
		this.mmyst.drawAt(ctx, this._cx, this._cy);
		this.bar.drawAt(ctx, this._cx, this._cy);
		this.map.drawAt(ctx, this._cx, this._cy);
		this.renderXp(ctx);
		this.minimapDraw(ctx);
	},

	renderXp : function (ctx) {
		var startX = 200,
			finishX = 600,
			startY = 593;
		
		util.fillBox(
			ctx, 
			this._cx + startX, 
			this._cy + startY,
			(finishX - startX) * this.posXp,
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
		//this.life.scale = 1 * this.hpRatio;
	
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
	},
	
	findMapArea : function(pos) {
		var frame = spatialManager.findFrame(pos);
		var entities = this.getFrames(
            {i: frame.i-8,
             j: frame.j-8},
            {i: frame.i+8,
             j: frame.j+8}
		);
	},
	
	minimap : function(pos) {
		
	},
	
	minimapDraw : function(ctx) {
		
		var pos = this._character.getPos();
		var drawX = pos.posX * this.ratioX;
		var drawY = pos.posY * this.ratioY;
		
		
		
		util.fillBox(
			ctx, 
			this._cx + 697 + drawX, 
			this._cy + 23 + drawY, 
			this._cx + 697 + drawX + 2,
			this._cy + 23 + drawY + 2,
			"Yellow"
		);
		
	},
};