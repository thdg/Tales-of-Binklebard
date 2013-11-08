"use strict";

/************************************************************************\

 A module which handles spatial lookup, as required for...
 e.g. general collision detection.

\************************************************************************/

var spatialManager = {

    // "PRIVATE" DATA

    _nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

    _divider : 128,     // size of each space
    _collisionMargin : 1, // how many frames from entities frame
    _entities : [[]],   // NxM matrix of lists of entities
                        // where N is whereorlds height/divider and M is worlds width/divider

    // "PRIVATE" METHODS

    _getFrame : function(frame) {

        if (!this._entities[frame.i]) this._entities[frame.i] = [];
        if (!this._entities[frame.i][frame.j]) this._entities[frame.i][frame.j] = [];

        return this._entities[frame.i][frame.j];
    },

    _getEntities : function(frame) {

        return this._entities[frame.i][frame.j];
    },

    // PUBLIC METHODS

    init : function() {
        // nothing yet
    },

    getNewSpatialID : function() {

        return this._nextSpatialID++;
    },

    findFrame : function(pos) {

        return {
            i: Math.floor(pos.posX/this._divider),
            j: Math.floor(pos.posY/this._divider),
        };
    },

    getFrames : function(frame1, frame2) {

        var entities = [];
        for (var i = frame1.i; i<=frame2.i; i++) {
            for (var j = frame1.j; j<=frame2.j; j++) {
                entities.push.apply(entities,this._getFrame({i: i, j: j}));
            }
        }

        return entities;
    },

    register: function(entity) {

        var spatialID = entity.getSpatialID();
        var pos = entity.getPos();

        var frame = this._getFrame(this.findFrame(pos));
        frame.push({
            entity: entity,
            posX: pos.posX,
            posY: pos.posY,
            radius: entity.getRadius()
        });
    },

    unregister: function(entity) {

        var spatialID = entity.getSpatialID();
        var pos = entity.getPos();

        var frame = this._getFrame(this.findFrame(pos));
        var i = 0;
        while (frame[i]) {
            if (frame[i].entity.getSpatialID() === spatialID) {
                frame.splice(i,1);
                break;
            }
            i++;
        }
    },

    findEntityInRange: function(posX, posY, radius) {

        var frame = this.findFrame({posX: posX, posY: posY});
        var entities = this.getFrames(
            {i: frame.i-this._collisionMargin,
             j: frame.j-this._collisionMargin},
            {i: frame.i+this._collisionMargin,
             j: frame.j+this._collisionMargin}
        );

        for (var i=0; i<entities.length; i++) {
            var pos = entities[i].entity.getPos();
            var rad = entities[i].entity.getRadius();
            if (this.doCollide(pos, rad, posX, posY, radius)) {
                return entities[i].entity;
            }
        }
    },

    doCollide: function(pos, rad, posX, posY, radius) {

        var dist = util.distSq(
            pos.posX,
            pos.posY,
            posX,
            posY
        );

        return dist < util.square(rad+radius);
    },

    render: function(ctx) {

        var oldStyle = ctx.strokeStyle;
        ctx.strokeStyle = "red";
        
        for (var i=0; i<=world.getWidth(); i+=this._divider) {
            util.stroke(ctx,0,i,world.getWidth(),i);
            util.stroke(ctx,i,0,i,world.getHeight());
        }

        for (var i=0; i<this._entities.length; i++) {
            var col = this._entities[i]
            if (col) {
                for (var j=0; j<col.length; j++) {
                    var row = col[j];
                    var frameEntities = row;
                    for (var ID in frameEntities) {
                        var e = frameEntities[ID];
                        util.strokeCircle(ctx, e.posX, e.posY, e.radius);
                    }
                }
            }
        }
        ctx.strokeStyle = oldStyle;
    }

};
