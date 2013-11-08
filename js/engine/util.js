// util.js
//
// A module of utility functions, with no private elements to hide.
// An easy case; just return an object containing the public stuff.

"use strict";


var util = {

    // RANGES

    clampRange: function(value, lowBound, highBound) {
        if (value < lowBound) {
            value = lowBound;
        } else if (value > highBound) {
            value = highBound;
        }
        return value;
    },

    wrapRange: function(value, lowBound, highBound) {
        while (value < lowBound) {
            value += (highBound - lowBound);
        }
        while (value > highBound) {
            value -= (highBound - lowBound);
        }
        return value;
    },

    isBetween: function(value, lowBound, highBound) {
        if (value < lowBound) { return false; }
        if (value > highBound) { return false; }
        return true;
    },

    keepBetween: function(value, lowBound, highBound) {
        if (this.isBetween(value, lowBound, highBound)) return value;
        return value<lowBound ? lowBound : highBound;
    },


    // RANDOMNESS

    randRange: function(min, max) {
        return (min + Math.random() * (max - min));
    },


    // MISC

    square: function(x) {
        return x*x;
    },

    charCode: function(c) {
        return c.charCodeAt(0);
    },


    // DISTANCES

    distSq: function(x1, y1, x2, y2) {
        return this.square(x2-x1) + this.square(y2-y1);
    },


    // CANVAS OPS

    clearCanvas: function (ctx) {
        var prevfillStyle = ctx.fillStyle;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = prevfillStyle;
    },

    strokeCircle: function (ctx, x, y, r) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.stroke();
    },

    strokeBox: function (ctx, x, y, w, h) {
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.stroke();
    },

    stroke: function (ctx, x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    },

    fillCircle: function (ctx, x, y, r) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    },

    fillBox: function (ctx, x, y, w, h, style) {
        var oldStyle = ctx.fillStyle;
        ctx.fillStyle = style;
        ctx.fillRect(x, y, w, h);
        ctx.fillStyle = oldStyle;
    }

};
