 "use strict";

/************************************************************************\

 A module which handles arbitrary entity-management for the simulation

\************************************************************************/

var entityManager = {

    // "PRIVATE" DATA

    _items     : [],
    _soldiers  : [],
    _character : [],
    _effects   : [],


    // "PRIVATE" METHODS

    _generateSoldiers : function(num) {
        var i,
            goblin,
            NUM_SOLDIERS = num;

        for (i = 0; i < NUM_SOLDIERS; ++i) {
            goblin = new GreenSoldier(g_sprites.greenSoldier);
            this.generateSoldier({model: goblin});
        }
    },

    findNearestItem : function(posX, posY) {
        var closestItem = null,
            closestIndex = -1,
            closestSq = 1000 * 1000;

        for (var i = 0; i < this._items.length; ++i) {

            var thisItem = this._items[i];
            var itemPos = thisItem.getPos();
            var distSq = util.distSq(
                itemPos.posX, itemPos.posY, posX, posY);

            if (distSq < closestSq) {
                closestItem = thisItem;
                closestIndex = i;
                closestSq = distSq;
            }
        }
        return {
            theItem : closestItem,
            theDistanceSq: closestSq
        };
    },

    _forEachOf: function(aCategory, fn) {
        for (var i = 0; i < aCategory.length; ++i) {
            fn.call(aCategory[i]);
        }
    },

    _generateCamp : function() {
        var tent = new Tent();
        var pos  = tent.getPos();
        this._items.push(tent);
        this._items.push(new Fireplace({cx:pos.posX-TILE_SIZE,cy:pos.posY}));
    },

    // PUBLIC METHODS
	
    KILL_ME_NOW : -1,

    generateRogue : function() {
        var rogue = new Humanoid(g_sprites.rogue);
        var character = new Rogue({model: rogue, cx:200, cy:200});
        this._character.push(character);
        camera.centerAt(character);
        UIManager.follow(character);
    },

    generateWizard : function() {
        var wizard = new Humanoid(g_sprites.wizard);
        var character = new Wizard({model: wizard, cx:200, cy:200});
        this._character.push(character);
        camera.centerAt(character);
        UIManager.follow(character);
    },

    generateWarrior : function() {
        var warrior = new Humanoid(g_sprites.warrior);
        var character = new Warrior({model: warrior, cx:200, cy:200});
        this._character.push(character);
        camera.centerAt(character);
        UIManager.follow(character);
    },

    generateCleric : function() {
        var cleric = new Humanoid(g_sprites.cleric);
        var character = new Warrior({model: cleric, cx:200, cy:200});
        this._character.push(character);
        camera.centerAt(character);
        UIManager.follow(character);
    },

    deferredSetup : function () {
        this._categories = [this._items, this._soldiers, this._character, this._effects];
    },

    init: function() {
        var classNum = Math.floor(Math.random()*4);
        console.log(classNum);
        if( classNum === 0 ) this.generateWarrior();
        if( classNum === 1 ) this.generateCleric ();
        if( classNum === 2 ) this.generateRogue  ();
        if( classNum === 3 ) this.generateWizard ();
        
        //this.generateWarrior();
        this._generateSoldiers(100);
        this._generateCamp();
    },

    createEffect: function (descr) {
        this._effects.push(new Effect(descr));
    },

    generateSoldier : function(descr) {
        var soldier = new Soldier(descr);
        this._soldiers.push(soldier);
        return soldier;
    },
	
	getCharacter : function() {
        return this._character[0];
    },

    generateLoot : function(descr) {
        var loot = Math.random();
        if (loot<0.4) {
            this._items.push(new HealingPotion(descr));
        } else
        if (loot<0.8) {
            this._items.push(new EnergyPotion(descr));
        } else
        if (loot<0.9) {
            this._items.push(new ArmorSet(descr));
        } else {
            this._items.push(new WeponSet(descr));
        }
    },

    addItem : function(Item) {
        this._items.push(Item);
    },

    updateSoldiers : function(lvl) {
        this._forEachOf(this._soldiers, Soldier.prototype.updateDamage);
    },

    update: function(du) {

        for (var c = 0; c < this._categories.length; ++c) {

            var aCategory = this._categories[c];
            var i = 0;

            while (i < aCategory.length) {

                var status = aCategory[i].update(du);

                if (status === this.KILL_ME_NOW) {
                    aCategory.splice(i,1);
                }
                else {
                    ++i;
                }
            }
        }
    },

    render: function(ctx) {
        
    }

};

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();

