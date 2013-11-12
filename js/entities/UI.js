var UI = {  


	render: function (ctx) {
		this.sprite.drawAt(ctx, this.cx, this.cy);
	},

	init: function() {
		this._renderingID = renderingManager.getNewRenderingID();
		renderingManager.register(this);
		this.sprite =  this.sprite || g_sprites.UIbar;
		cx = 200;
		cy = 508;
	},
	
	getPos: function () {
		return {posX : this.cx, posY : this.cy};
	},
};