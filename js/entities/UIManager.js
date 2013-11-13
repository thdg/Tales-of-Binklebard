"use strict";

	var UIManager = {

	init : function() {
		this.bar = g_sprites.uibar;
		this.map = g_sprites.uimap;
		this._cx = 0;
		this._cy = 0;
	
	},

	update: function(du) {
		var pos = camera.getPos();
		this._cx = pos.posX;
		this._cy = pos.posY;
	},

	render : function (ctx) {
		this.lifeBall(ctx);
		this.bar.drawAt(ctx, this._cx, this._cy);
		this.map.drawAt(ctx, this._cx, this._cy);
	},

	lifeBall: function(ctx) {
	
		var oldastyle = ctx.fillstyle;
	
		var gradient = ctx.createLinearGradient(this._cx, 0, this._cx+800, 0);
		gradient.addColorStop(0.07, "#f00");
		gradient.addColorStop(0.1, "#100");

		gradient.addColorStop(0.90,"#00f");
		gradient.addColorStop(0.93, "#001");
		ctx.fillStyle = gradient;
	
		ctx.arc(this._cx+68, this._cy+547, 20, 0, 2 * Math.PI);
		ctx.arc(this._cx+730, this._cy+547, 20, 0, 2 * Math.PI);

		ctx.fill();

		ctx.fillstyle = oldastyle;
	},

	getPos : function() {
		return {posX : this._cx, posY : this._cy};
	}
};