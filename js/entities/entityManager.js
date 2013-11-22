 "use strict";

/*

 A module which handles arbitrary entity-management for the simulation

*/

var entityManager = {

    // "PRIVATE" DATA

    _items     : [],
    _soldiers  : [],
    _bosses    : [],
    _character : [],
    _effects   : [],


    // "PRIVATE" METHODS

    _generateSoldiers : function(soldiers, bosses) {
        var i,
            greenSoldier,
            bossSoldier,
            NUM_SOLDIERS = soldiers,
            NUM_BOSSES = bosses;

        for (i = 0; i < NUM_SOLDIERS; ++i) {
            greenSoldier = new GreenSoldier(g_sprites.greenSoldier);
            this.generateSoldier({model: greenSoldier});
        }

        for (i = 0; i < NUM_BOSSES; ++i) {
            bossSoldier = new GreenSoldier(g_sprites.bossSoldier);
            this.generateBoss({model: bossSoldier});
        }
        this._forEachOf(this._bosses, Soldier.prototype.makeBoss);



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
        this._character[0].playerClass = "Rogue";
        camera.centerAt(character);
        UIManager.follow(character);
    },

    generateWizard : function() {
        var wizard = new Humanoid(g_sprites.wizard);
        var character = new Wizard({model: wizard, cx:200, cy:200});
        this._character.push(character);
        this._character[0].playerClass = "Wizard";
        camera.centerAt(character);
        UIManager.follow(character);
    },

    generateWarrior : function() {
        var warrior = new Humanoid(g_sprites.warrior);
        var character = new Warrior({model: warrior, cx:200, cy:200});
        this._character.push(character);
        this._character[0].playerClass = "Warrior";
        camera.centerAt(character);
        UIManager.follow(character);
    },

    generateCleric : function() {
        var cleric = new Humanoid(g_sprites.cleric);
        var character = new Cleric({model: cleric, cx:200, cy:200});
        this._character.push(character);
        this._character[0].playerClass = "Cleric";
        camera.centerAt(character);
        UIManager.follow(character);
    },

    deferredSetup : function () {
        this._categories = [this._items, this._soldiers, this._bosses, this._character, this._effects];
    },

    init: function() {
        var classNum = Math.floor(Math.random()*4);
        console.log(classNum);
        if( classNum === 0 ) this.generateWarrior();
        if( classNum === 1 ) this.generateCleric ();
        if( classNum === 2 ) this.generateRogue  ();
        if( classNum === 3 ) this.generateWizard ();
        
        //this.generateWarrior();
        this._generateSoldiers(100, 3);
        this._generateCamp();
    },

    createEffect: function (descr) {
        this._effects.push(new Effect(descr));
    },

    generateBoss: function(descr) {
        var boss = new Soldier(descr);
        this._bosses.push(boss);
        return boss;
        
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
        this._forEachOf(this._bosses, Soldier.prototype.updateDamage);
    },

    getSoldierCount : function() {
        return { soldiers: this._soldiers.length,
                 bosses: this._bosses.length };
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

