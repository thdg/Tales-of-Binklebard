"use strict";

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

// GATHER INPUTS

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}


// UPDATE SIMULATION

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

}


// RENDER SIMULATION

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


// PRELOAD STUFF

var g_images = {};

function requestPreloads() {

    var requiredImages = {

        terrain          : "img/terrain.png",
        link             : "img/link.png",
        sparcles         : "img/Sparcles.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

    
    g_sprites.link    = new Sprite(g_images.link);
    g_sprites.link.scale = 2;

    g_sprites.terrain  = new Sprite(g_images.terrain);
    g_sprites.sparcles = new Sprite(g_images.sparcles);

    tilesheet.setTileset(g_images.terrain, 8);
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

    entityManager.init();

    main.init();
}

// Kick it off
requestPreloads();
