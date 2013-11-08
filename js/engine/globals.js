"use strict";

/************************************************************************\

 GLOBALS
 Evil, ugly (but "necessary") globals, which everyone can use.

\************************************************************************/

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

// The "nominal interval" is the one that all of our time-based units are
// calibrated to e.g. a velocity unit is "pixels per nominal interval"
//
var NOMINAL_UPDATE_INTERVAL = 16.666;

// Multiply by this to convert seconds into "nominals"
var SECS_TO_NOMINALS = 1000 / NOMINAL_UPDATE_INTERVAL;

var FACE_RIGHT = 0;
var FACE_UP    = 1;
var FACE_LEFT  = 2;
var FACE_DOWN  = 3;

// char codes for noncharacters
var UP_ARROW = 38;
var RIGHT_ARROW = 39;
var DOWN_ARROW = 40;
var LEFT_ARROW = 37;

var ANIMATION_FRAME_SIZE = 48;
var TILE_SIZE = 32;