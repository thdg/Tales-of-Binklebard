"use strict";

// A generic contructor which accepts an arbitrary descriptor object
function Soldier(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
    this.direction = 0;

    this.randomizePos();
    this.randomizeVelocity();

    this.hp = 100;
    this.armor = 75;
    this.damageTaken = 0;
    this.expReward = 500;

}

Soldier.prototype = new Entity();

Soldier.prototype.margin = 7;
Soldier.prototype.height = 0;

Soldier.prototype.lvl         = 1;
Soldier.prototype.baseDamage  = 25;
Soldier.prototype.damage      = 25;
Soldier.prototype.doingDamage = 0;
Soldier.prototype.isEnemy     = true;

Soldier.prototype.chasing     = false;
Soldier.prototype.path        = undefined;
Soldier.prototype.step        = 0;


Soldier.prototype.randomizeVelocity = function () { 
    var MIN_SPEED = 30,
        MAX_SPEED = 60;

    var ROT = [FACE_RIGHT, FACE_UP, FACE_LEFT, FACE_DOWN]
    this.direction = ROT[util.randInt(0,ROT.length)];
    this.vel = util.randRange(MIN_SPEED, MAX_SPEED) / SECS_TO_NOMINALS;
};

Soldier.prototype.updateDamage = function () {
    this.lvl++;
    this.damage = this.baseDamage * this.lvl;

};

Soldier.prototype.findPlayer = function () {

        if (!entityManager.getCharacter()) return;

        var player = entityManager.getCharacter().getPos(),
            monster = this.getPos(),
            floor = Math.floor,
            dist = util.distSq(player.posX, player.posY,
                               monster.posX, monster.posY),
            playerPos = [ floor(player.posX/32), floor(player.posY/32)],
            monsterPos = [ floor(monster.posX/32), floor(monster.posY/32)];

        if (dist < 40000 && !this.chasing) {
            this.chasing = true;
        }
        else if (dist > 50000 && this.chasing) {
            this.chasing = false;
        } 

};

Soldier.prototype.update = function (du) {

    spatialManager.unregister(this);
    renderingManager.unregister(this);

    if ( this.doingDamage >  0 ) this.doingDamage -= du;
    if ( this.doingDamage <= 0 ) this.doingDamage = 0;
    if ( this._isDeadNow ) {
        entityManager.getCharacter().addExp(this.expReward);
        return entityManager.KILL_ME_NOW;
    }

    this.findPlayer();
    this.move(du);
    this.model.update(du);

    spatialManager.register(this);
    renderingManager.register(this);
};

Soldier.prototype.move = function (du) {
    //this.model.halt(); // if nothing is done, model halts

    var speed = this.vel * du;

    var oldX = this.cx;
    var oldY = this.cy;

    if (this.chasing ) {
        var player = entityManager.getCharacter();
        if (!player) {
            this.chasing = false;
            return;
        }
        var player = player.getPos(),
            monster = this.getPos(),
            floor = Math.floor,
            playerPos = [ floor(player.posX/32), floor(player.posY/32)],
            monsterPos = [ floor(monster.posX/32), floor(monster.posY/32)];
       
        if( playerPos[0] < monsterPos[0] ) this.walkWest(du);
        else if( playerPos[0] > monsterPos[0] ) this.walkEast(du);
        else if( playerPos[1] < monsterPos[1] ) this.walkNorth(du);
        else if( playerPos[1] > monsterPos[1] ) this.walkSouth(du);


    } else {
        if (this.direction === FACE_RIGHT) {
            this.walkEast(du);
        }
        else if (this.direction === FACE_UP) {
            this.walkNorth(du);
        }
        else if (this.direction === FACE_LEFT) {
            this.walkWest(du);
        }
        else if (this.direction === FACE_DOWN) {
            this.walkSouth(du);
        }
        else this.randomizeVelocity();
    }

    var collision  = spatialManager.findEntityInRange(this.cx, this.cy, this.getRadius());
    if (collision) this.hit(collision);

    if (world.collidesWith(this.cx, this.cy, this.getRadius()) ||
        collision) {
        this.cx = oldX;
        this.cy = oldY;
        if (collision && entityManager.getCharacter() &&
            collision.getSpatialID() === entityManager.getCharacter().getSpatialID())
            return;
        if(!this.chasing) this.randomizeVelocity();
    }
};

Soldier.prototype.walkNorth = function(du) {
    if(this.chasing) this.cy -= this.vel*1.5 * du;
    else this.cy -= this.vel * du;
    this.model.walk();
    this.model.faceUp();
}
Soldier.prototype.walkSouth= function(du) {
    if(this.chasing) this.cy += this.vel*1.5 * du;
    else this.cy += this.vel * du;
    this.model.walk();
    this.model.faceDown();
}
Soldier.prototype.walkWest = function(du) {
    if(this.chasing) this.cx -= this.vel*1.5 * du;
    else this.cx -= this.vel * du;
    this.model.walk();
    this.model.faceLeft();
}   
Soldier.prototype.walkEast = function(du) {
    if(this.chasing) this.cx += this.vel*1.5 * du;
    else this.cx += this.vel * du;
    this.model.walk();
    this.model.faceRight();   
}

Soldier.prototype.hit = function(collision)
{
    var character = entityManager.getCharacter()
    if (!character) return;

    var characterID = character.getSpatialID();
    if (characterID === collision.getSpatialID() && this.doingDamage <= 0)
    {
        this.doingDamage = 0.25*SECS_TO_NOMINALS;
        
        collision.takeDamage(this.damage);

    }
}

Soldier.prototype.getRadius = function () {
    return (ANIMATION_FRAME_SIZE / 2) * 0.6;
};

Soldier.prototype.takeDamage = function (damage, ignoreArmor) {

    if (ignoreArmor===undefined) ignoreArmor = false;

    var damageReduction = ignoreArmor ? 0 : this.armor/this.hp;
    var totalDamage = Math.floor(damage * (1 - damageReduction));
    this.damageTaken += totalDamage;
    particleManager.generateTextParticle(this.cx, this.cy, totalDamage);
    particleManager.generateSplash(this.cx, this.cy, 20);

    if (this.damageTaken>=this.hp) {
        this.kill();
        if (Math.random()<0.5) this._dropLoot();
    }
};

Soldier.prototype.getHpRatio = function () {
    return Math.max(0,(this.hp-this.damageTaken)/this.hp);
};

Soldier.prototype._dropLoot = function () {
    entityManager.generateLoot({
        cx : this.cx,
        cy : this.cy,
        sprite : g_sprites.chest
    });
};

Soldier.prototype.render = function (ctx) {
    this.model.drawCentredAt(ctx, this.cx, this.cy-this.margin);
    this.renderHP(ctx);
};

Soldier.prototype.renderHP = function (ctx) {
    var x = this.cx, y = this.cy;
    var w = 50, h = 6;
    var offsetY = 50;
    var padding = 1;

    var hpLeft = this.getHpRatio();
    var hpStyle = hpLeft>0.5  ? "green"  :
                  hpLeft>0.25 ? "orange" : "red";

    util.fillBox(
        ctx, 
        x-w/2-padding, 
        y-offsetY-padding, 
        w+padding*2, 
        h+padding*2,
        "black"
    );
    util.fillBox(
        ctx, 
        x-w/2, 
        y-offsetY, 
        w*hpLeft, 
        h, 
        hpStyle
    );
}

Soldier.prototype.setDirection = function(direction)
{
    this.direction = direction%4;
}