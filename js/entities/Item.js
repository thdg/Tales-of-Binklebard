"use strict";

function Item() {}

Item.prototype = new Entity();

Item.prototype.update = function (du) {

    renderingManager.unregister(this);
    this.timeAlive += du;
    if (this.timeAlive>this.duration) this.kill();
    if (this._isDeadNow) return entityManager.KILL_ME_NOW;
    renderingManager.register(this);
};

Item.prototype.render = function (ctx) {

    this.sprite.drawCentredAt(ctx, this.cx, this.cy);
};

Item.prototype.drop = function (cx, cy) {
    this._isDeadNow = false;
    this.timeAlive = 0;
    this.setPos(cx, cy);
    entityManager.addItem(this);
}

function HealingPotion(descr) {
    this.setup(descr);
    this.duration = 10*SECS_TO_NOMINALS;
    this.timeAlive = 0;
}

HealingPotion.prototype = new Item();

HealingPotion.prototype.pickUp = function (hustler) {

    hustler.backpack.healingPotions += 1;
    this.kill();
}

function EnergyPotion(descr) {
    this.setup(descr);
    this.duration = 10*SECS_TO_NOMINALS;
    this.timeAlive = 0;
}

EnergyPotion.prototype = new Item();

EnergyPotion.prototype.pickUp = function (hustler) {

    hustler.backpack.energyPotions += 1;
    this.kill();
}

function ArmorSet(descr) {
    this.setup(descr);
    this.duration = 10*SECS_TO_NOMINALS;
    this.timeAlive = 0;

    this.strBonus = Math.random()<0.75 ? 0 : Math.ceil(Math.random()*6);
    this.wisBonus = Math.random()<0.75 ? 0 : Math.ceil(Math.random()*6);
    this.dexBonus = Math.random()<0.75 ? 0 : Math.ceil(Math.random()*6);
    this.spiritBonus = Math.random()<0.75 ? 0 : Math.ceil(Math.random()*6);

    this.armorBonus = 20 + Math.ceil(Math.random()*40);
}

ArmorSet.prototype = new Item();

ArmorSet.prototype.putOn = function(owner) {
    owner.str += this.strBonus;
    owner.wis += this.wisBonus;
    owner.dex += this.dexBonus;
    owner.spirit += this.spiritBonus;

    owner.armor += this.armorBonus;
};

ArmorSet.prototype.takeOff = function(owner) {
    owner.str -= this.strBonus;
    owner.wis -= this.wisBonus;
    owner.dex -= this.dexBonus;
    owner.spirit -= this.spiritBonus;

    owner.armor -= this.armorBonus;

    var pos = owner.getPos();
    this.drop(pos.posX, pos.posY);
};

ArmorSet.prototype.pickUp = function (hustler) {

    if (hustler.backpack.armorSet) 
        hustler.backpack.armorSet.takeOff(hustler);

    hustler.backpack.armorSet = this;
    this.putOn(hustler);
    this.kill();
};

function WeponSet(descr) {
    this.setup(descr);
    this.duration = 10*SECS_TO_NOMINALS;
    this.timeAlive = 0;

    this.strBonus = Math.random()<0.75 ? 0 : Math.ceil(Math.random()*6);
    this.wisBonus = Math.random()<0.75 ? 0 : Math.ceil(Math.random()*6);
    this.dexBonus = Math.random()<0.75 ? 0 : Math.ceil(Math.random()*6);
    this.spiritBonus = Math.random()<0.75 ? 0 : Math.ceil(Math.random()*6);

    this.damageBonus = 10 + Math.ceil(Math.random()*40);
};

WeponSet.prototype = new Item();

WeponSet.prototype.putOn = function(owner) {
    owner.str += this.strBonus;
    owner.wis += this.wisBonus;
    owner.dex += this.dexBonus;
    owner.spirit += this.spiritBonus;

    owner.damage += this.damageBonus;
};

WeponSet.prototype.takeOff = function(owner) {
    owner.str -= this.strBonus;
    owner.wis -= this.wisBonus;
    owner.dex -= this.dexBonus;
    owner.spirit -= this.spiritBonus;

    owner.damage -= this.damageBonus;

    var pos = owner.getPos();
    this.drop(pos.posX, pos.posY);
}

WeponSet.prototype.pickUp = function (hustler) {

    if (hustler.backpack.weponSet) 
        hustler.backpack.weponSet.takeOff(hustler);

    hustler.backpack.weponSet = this;
    this.putOn(hustler);
    this.kill();
};


function Backpack() {
    
    this.healingPotions = 0;
    this.energyPotions = 0;
    this.armorSet = undefined;
    this.weponSet = undefined;
}

Backpack.prototype.update = function (carrier) {

    if (eatKey(carrier.USE_HP) && this.healingPotions>0) {
        carrier.heal(carrier.hp*0.25);
        this.healingPotions--;
    }
    if (eatKey(carrier.USE_EP) && this.energyPotions>0 ) {
        carrier.energyBoost(carrier.energy*0.25);
        this.energyPotions--;
    }

}