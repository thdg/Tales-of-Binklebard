"use strict";

var UIManager = {

	init : function() {
		this.bar = g_sprites.uibar;
		this.map = g_sprites.uimap;
		
		this.bGlobes = g_sprites.globes;
		this.myst = g_sprites.myst;
		
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
		this.bGlobes.drawAt(ctx, this._cx, this._cy);
		this.globes(ctx);
		this.myst.drawAt(ctx, this._cx, this._cy);
		
		this.bar.drawAt(ctx, this._cx, this._cy);
		this.map.drawAt(ctx, this._cx, this._cy);
		
		this.renderXp(ctx);
		this.drawMiniMapArea(ctx, this._character.getPos());
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
			2,
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
	
	globes: function(ctx) {
	
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
	
	drawMiniMapArea : function(ctx, pos) {
		var frame = spatialManager.findFrame(pos);
		var entities = spatialManager.getFrames(
            {i: frame.i-12,
             j: frame.j-12},
            {i: frame.i+12,
             j: frame.j+12}
		);
		this.minimapDraw(ctx, pos, entities);
	},
	
	minimapDraw : function(ctx, pos, entities) {
		
		for(var i = 0; i < entities.length; i++){
			var edrawX = 72*(((entities[i].posX)-(pos.posX - 1536))/3072);
			var edrawY = 72*(((entities[i].posY)-(pos.posY - 1536))/3072);
			
			if(entities[i].posX === pos.posX && entities[i].posY === pos.posY){
				util.fillBox(
					ctx, 
					this._cx + 697 + edrawX, 
					this._cy + 23 + edrawY, 
					3,
					3,
					"yellow"
				);
			}
			else{
				util.fillBox(
					ctx, 
					this._cx + 697 + edrawX, 
					this._cy + 23 + edrawY, 
					2,
					2,
					"red"
				);
			}
		}
	},
};