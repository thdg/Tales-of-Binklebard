// =========
// Binklebard
// =========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}


// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
    
    processDiagnostics();
    
    world.update(du);
    entityManager.update(du);
    camera.update(du);

    // Prevent perpetual attacks!
    //eatKey(Chara.prototype.KEY_ATTACK);
}

// GAME-SPECIFIC DIAGNOSTICS

var g_renderSpatialDebug = false;


var KEY_SPATIAL = keyCode('X');
var KEY_FLYING = keyCode('F');

var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');

var KEY_0 = keyCode('0');

var KEY_1 = keyCode('1');
var KEY_2 = keyCode('2');

var KEY_K = keyCode('K');

function processDiagnostics() {

    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;
    if (eatKey(KEY_FLYING)) camera.flyingMode = !camera.flyingMode;
/*
    if (eatKey(KEY_HALT)) entityManager.haltShips();

    if (eatKey(KEY_RESET)) entityManager.resetShips();

    if (eatKey(KEY_0)) entityManager.toggleRocks();

    if (eatKey(KEY_1)) entityManager.generateShip({
        cx : g_mouseX,
        cy : g_mouseY,
        
        sprite : g_sprites.ship});

    if (eatKey(KEY_2)) entityManager.generateShip({
        cx : g_mouseX,
        cy : g_mouseY,
        
        sprite : g_sprites.ship2
        });

    if (eatKey(KEY_K)) entityManager.killNearestShip(
        g_mouseX, g_mouseY);
*/
}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    world.render(ctx);
    renderingManager.render(ctx);
    
    if (g_renderSpatialDebug) {
        camera.render(ctx);
        spatialManager.render(ctx);
    }
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {

        terrain          : "img/terrain.png",
        binkBack         : "img/BinklebardBack.png",
        binkDefault      : "img/BinklebardDefault.png",
        binkDefaultRight : "img/BinklebardDefaultRight.png",
        binkDefaultBack  : "img/BinklebardDefaultBack.png",
        binkRight        : "img/BinklebardRight.png",
        binkForward      : "img/BinklebardForward.png",
        binkThrust       : "img/BinklebardThrustForward.png",
        binkThrustLeft   : "img/BinklebardThrustLeft.png",
        binkThrustBack   : "img/BinklebardThrustBack.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

    g_sprites.terrain = new Sprite(g_images.terrain);

    tilesheet.setTileset(g_images.terrain, 5);
    tiles.init();
    
    // no worries, þetta verður lesið inn af skrá!
    var highlands = new Region([[0,0,0,0,7,8,9,1,2,1,0,1,0,3,3,3,3,3,3,3,3,3,3,3,3],
                                [0,0,1,2,7,8,9,0,0,0,1,2,0,3,3,3,3,3,3,3,3,3,3,3,3],
                                [0,0,1,2,7,8,9,0,0,0,1,2,0,3,3,3,3,3,3,3,3,3,3,3,3],
                                [0,0,1,2,7,8,9,0,0,0,1,2,0,3,3,3,3,3,3,3,3,3,3,3,3],
                                [5,5,5,5,13,8,9,0,0,0,1,2,0,0,0,0,0,0,1,2,0,0,0,0,0],
                                [8,8,8,8,8,8,9,0,0,0,1,2,0,0,0,0,0,0,1,2,0,0,0,0,0],
                                [11,11,11,11,11,11,12,0,0,0,1,2,0,0,0,0,0,0,1,2,0,0,0,0,0],
                                [0,0,0,0,0,0,0,2,0,0,1,2,0,0,0,0,0,0,1,2,0,0,0,0,0],
                                [0,0,0,0,0,0,0,0,0,0,1,2,0,0,0,0,0,0,1,2,0,0,0,0,0],
                                [0,0,1,4,5,5,5,6,0,0,1,2,0,0,0,0,0,0,1,2,0,0,0,0,0],
                                [0,0,1,7,8,8,8,9,0,0,1,2,0,0,0,0,0,0,1,2,0,0,0,0,0],
                                [0,0,1,10,11,11,11,12,0,0,1,2,0,0,0,0,0,0,1,2,0,0,0,0,0],
                                [0,0,1,2,0,0,0,0,0,0,1,2,0,0,0,0,0,0,1,2,0,0,0,0,0],
                                [0,0,1,2,0,0,0,0,0,0,1,2,0,0,0,0,0,0,1,2,0,0,0,0,0],
                                [0,0,1,2,0,0,0,0,0,0,1,2,0,0,0,0,0,0,1,2,0,0,0,0,0],
                                [0,0,1,2,0,0,0,0,0,0,1,2,0,0,0,0,0,0,1,2,0,0,0,0,0],
                                [0,0,1,2,0,0,0,0,0,0,1,2,0,0,0,0,0,0,1,2,0,0,0,0,0],
                                [0,0,1,2,0,0,0,0,0,0,1,2,0,0,0,0,0,0,1,2,0,0,0,0,0],
                                [0,0,0,0,0,0,0,2,0,0,1,2,0,0,0,0,0,0,1,2,0,0,0,0,0],
                                [0,0,0,0,0,0,0,2,0,0,1,2,0,0,0,0,0,0,1,2,0,0,0,0,0],
                                [0,0,0,0,0,0,0,2,0,0,1,2,0,0,0,0,0,0,1,2,0,0,0,0,0],
                                [0,0,0,0,0,0,0,2,0,0,1,2,0,0,0,0,0,0,1,2,0,0,0,0,0],
                                [0,0,0,0,0,0,0,2,0,0,1,2,0,0,0,0,0,0,1,2,0,0,0,0,0],
                                [0,0,2,0,0,0,2,1,1,0,1,2,0,0,0,0,0,0,1,2,0,0,0,0,0],
                                [0,0,0,0,0,0,1,1,2,0,1,2,0,0,0,0,0,0,1,2,0,0,0,0,0]]
    );
    world.addRegion(highlands);

    g_sprites.bink = new Sprite(    
                                    {
                                        haltForward: {
                                            image:  g_images.binkDefault,
                                            next:   0,
                                            strips: 1,
                                            reflect:false,
                                        },

                                        haltRight: {
                                            image:  g_images.binkDefaultRight,
                                            next:   0,
                                            strips: 1,
                                            reflect:false,
                                        },

                                        haltLeft: {
                                            image:  g_images.binkDefaultRight,
                                            next:   0,
                                            strips: 1,
                                            reflect:true,
                                        },

                                        haltBack: {
                                            image:  g_images.binkDefaultBack,
                                            next:   0,
                                            strips: 1,
                                            reflect:false,
                                        },

                                        forward: {
                                            image:  g_images.binkForward,
                                            next:   48,
                                            strips: 7,
                                            reflect:false,
                                        },

                                        right: {
                                            image:  g_images.binkRight,
                                            next:   48,
                                            strips: 8,
                                            reflect:false,
                                        },

                                        left: {
                                            image:  g_images.binkRight,
                                            next:   48,
                                            strips: 8,
                                            reflect:true,
                                        },

                                        back: {
                                            image:  g_images.binkBack,
                                            next:   48,
                                            strips: 8,
                                            reflect:false,
                                        },
                                        
                                        thrustForward: {
                                            image:  g_images.binkThrust,
                                            next:   48,
                                            scale:  2,
                                            strips: 6,
                                            reflect:false,
                                        },

                                        thrustBack: {
                                            image:  g_images.binkThrustBack,
                                            next:   48,
                                            scale:  2,
                                            strips: 6,
                                            reflect:false,
                                        },

                                        thrustRight: {
                                            image:  g_images.binkThrustLeft,
                                            next:   48,
                                            scale:  2,
                                            strips: 6,
                                            reflect:true,
                                        },

                                        thrustLeft: {
                                            image:  g_images.binkThrustLeft,
                                            next:   48,
                                            scale:  2,
                                            strips: 6,
                                            reflect:false,
                                        },


                                    },
                                    {
                                        width:  48,
                                        height: 48,
                                        scale:  2,
                                    });

    entityManager.init();

    main.init();
}

// Kick it off
requestPreloads();
