"use strict";

var UIManager = {

    init : function() {
        this.bar = g_sprites.uibar;
        this.map = g_sprites.uimap;
        
        this.cScreen = g_sprites.characterScreen;
        this.cScreen.alpha = 0.95;

        this.bGlobes = g_sprites.globes;
        this.myst = g_sprites.myst;
        
        this.lFlask = g_sprites.lifeflask;
        this.mFlask = g_sprites.manaflask;
        this.aKit = g_sprites.armorkit;
        this.wKit = g_sprites.weaponkit;
        
        this._cx = 0;
        this._cy = 0;
        this.posXp = 0;
        this.hasWon = false;
    },

    chaScreen : 'C'.charCodeAt(0),
    cTrue : false,
    
    update: function(du) {
        var pos = camera.getPos();
        this.hpRatio = this._character.getHpRatio();
        this.energyRatio = this._character.getEnergyRatio();
        this._cx = pos.posX;
        this._cy = pos.posY;
        
        this.whatToRender();
        
        this.calculateBar();
    },
    
    follow : function (character) {
        this._character = character;
    },
    
    render : function (ctx) {
        this.bGlobes.drawAt(ctx, this._cx, this._cy);
        this.globes(ctx);
        this.myst.drawAt(ctx, this._cx, this._cy);
        
        this.renderScreens(ctx);
        
        this.bar.drawAt(ctx, this._cx, this._cy);
        this.map.drawAt(ctx, this._cx, this._cy);
        
        this.renderXp(ctx);
        this.renderClass(ctx);
        this.drawMiniMapArea(ctx, this._character.getPos());
        this.renderWin(ctx);
        this.renderGameOver(ctx);
    },

    renderGameOver : function (ctx) {

        if (this._character._isDeadNow && !this.hasWon) {
            ctx.fillStyle = "red";
            var oldFont = ctx.font;
            ctx.font = "42px irish-grover, sans-serif";
            ctx.fillText("GAME OVER", this._cx+300, this._cy+300);
            ctx.font = oldFont;
        }
    },

    renderWin : function (ctx) {
        var count = entityManager.getSoldierCount();
        if (count.soldiers === 0 || count.bosses === 0) {
            this.hasWon = true;
            ctx.fillStyle = "yellow";
            var oldFont = ctx.font;
            ctx.font = "42px irish-grover, sans-serif";
            ctx.fillText("YOU WIN", this._cx+320, this._cy+200);
            ctx.font = oldFont;
        }
    },

    renderClass : function(ctx) {
            ctx.fillStyle = "yellow";
            var oldFont = ctx.font;
            ctx.font = "20px irish-grover, sans-serif";
            ctx.fillText("Binklebard the " + this._character.getModel(), this._cx+10, this._cy+20);
            ctx.font = oldFont;
    },

    renderScreens : function (ctx) {
        if (this.cTrue){
            this.cScreen.drawAt(ctx, this._cx, this._cy+ 23);
            
            this.lFlask.drawAt(ctx, this._cx + 255, this._cy + 222);
            this.mFlask.drawAt(ctx, this._cx + 181 , this._cy + 222);

            if (this._character.backpack.armorSet)
                this.aKit.drawAt(ctx, this._cx + 102, this._cy + 222);
            if (this._character.backpack.weponSet)
                this.wKit.drawAt(ctx, this._cx + 28, this._cy + 222);
            
            var life = this._character.backpack.healingPotions;
            var energy = this._character.backpack.energyPotions;
            
            ctx.font = "12px Calibri, sans-serif";
            ctx.fillStyle = 'white';
            ctx.fillText("" + life, this._cx + 257, this._cy+ 232);
            ctx.fillText("" + energy, this._cx + 183, this._cy+ 232);
        
            ctx.font = "20px irish-grover, sans-serif";
            var oldStyle = ctx.fillStyle;
            ctx.fillStyle = 'black';
            ctx.strokeText("Level: " + this._character.lvl, this._cx + 60, this._cy+ 90);
            ctx.fillStyle = 'red';
            ctx.fillText("Level: " + this._character.lvl, this._cx + 60, this._cy+ 90);
            
            ctx.strokeText("Strength: " + this._character.str, this._cx + 60, this._cy+ 110);
            ctx.fillStyle = 'red';
            ctx.fillText("Strength: " + this._character.str,this._cx + 60, this._cy+ 110);
            
            ctx.strokeText("Dexterity: " + this._character.dex, this._cx + 60, this._cy+ 130);
            ctx.fillStyle = 'green';
            ctx.fillText("Dexterity: " + this._character.dex,this._cx + 60, this._cy+ 130);
            
            ctx.strokeText("Wisdom: " + this._character.wis, this._cx + 60, this._cy+ 150);
            ctx.fillStyle = 'purple';
            ctx.fillText("Wisdom: " + this._character.wis,this._cx + 60, this._cy+ 150);
            
            ctx.strokeText("Spirit: " + this._character.spirit, this._cx + 60, this._cy+ 170);
            ctx.fillStyle = 'blue';
            ctx.fillText("Spirit: " + this._character.spirit,this._cx + 60, this._cy+ 170);
            
            ctx.font = "12px Calibri, sans-serif";
            
            ctx.fillStyle = 'yellow';

            ctx.fillText("hp: " + this._character.hp,this._cx + 60, this._cy+ 320);
            ctx.fillText("armor: " + this._character.armor,this._cx + 60, this._cy+ 330);
            ctx.fillText("energy: " + this._character.energy,this._cx + 60, this._cy+ 340);
            ctx.fillText("damage: " + this._character.damage,this._cx + 60, this._cy+ 350);
            ctx.fillText("Crit chance: " + this._character.critChance,this._cx + 60, this._cy+ 360);
            ctx.fillText("Crit modifier: " + this._character.critModifier,this._cx + 60, this._cy+ 370);
            ctx.fillText("Spell crit chance: " + this._character.spellCritChance,this._cx + 60, this._cy+ 380);
            ctx.fillText("Spell crit modifier: " + this._character.spellCritModifier,this._cx + 60, this._cy+ 390);
            ctx.fillText("Life regen: " + this._character.lifeRegen + "/sec",this._cx + 60, this._cy+ 400);
            ctx.fillText("Energy regen: " + this._character.energyRegen+ "/sec",this._cx + 60, this._cy+ 410);
            ctx.fillText("Miss change: " + this._character.missChange+ "/sec",this._cx + 160, this._cy+ 320);
            
            ctx.font = "20px irish-grover, sans-serif";
            ctx.fillStyle = oldStyle;
        }
    },
    
    whatToRender : function () {
        if (keys[this.chaScreen] && this.cTrue === false){
            this.cTrue = true;
        }
        else if (keys[this.chaScreen] && this.cTrue === true){
            this.cTrue = false;
        }
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

        var lastLvl = this._character.lvl - 1;
        var startExp = this._character.nextLvl(lastLvl);
        var exp = Math.max(0, this._character.experience - startExp);
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