"use strict";

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

function gatherInputs() {
    // Nothing to do here!
}

function mouseHandler(evt) {
    mapEditor.changeTile();
}

// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
    
    processDiagnostics();
    
    world.update(du);
    camera.update(du);
    mapEditor.update(du);
}

// GAME-SPECIFIC DIAGNOSTICS

var g_renderSpatialDebug = false;

var KEY_SPATIAL = keyCode('X');
var KEY_HEIGHTMAP = keyCode('H');

var KEY_PLUS = UP_ARROW;
var KEY_MINUS = DOWN_ARROW;

function processDiagnostics() {

    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;
    if (eatKey(KEY_HEIGHTMAP)) world._activeRegion.drawHeightmap = !world._activeRegion.drawHeightmap;
    if (eatKey(KEY_PLUS)) mapEditor.brushSize++;
    if (eatKey(KEY_MINUS)) mapEditor.brushSize--;
}

// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    world.render(ctx);
}


// PRELOAD STUFF

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        terrain          : "../img/terrain.png",
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

    g_sprites.terrain  = new Sprite(g_images.terrain);
    tilesheet.setTileset(g_sprites.terrain, 8);
    tiles.init();
    
    
    //Random generate the World map.
    var map = generateBasicMap(100,100);
    var basicMap = new Region(map.map, map.heightmap);
    world.addRegion(basicMap);

    main.init();
    camera.flyingMode = true;
}

// Kick it off
requestPreloads();
