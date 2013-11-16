"use strict";

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

function gatherInputs() {
    // Nothing to do here!
}

// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
    
    processDiagnostics();
    
    world.update(du);
    entityManager.update(du);
    particleManager.update(du);
    camera.update(du);
	UIManager.update(du);

    // Prevent perpetual attacks!
    eatKey(Character.prototype.KEY_ATTACK);
}

// GAME-SPECIFIC DIAGNOSTICS

var g_renderSpatialDebug = false;


var KEY_SPATIAL = keyCode('X');
var KEY_FLYING = keyCode('F');
var KEY_HEIGHTMAP = keyCode('H');

var KEY_0 = keyCode('0');

var KEY_1 = keyCode('1');
var KEY_2 = keyCode('2');

var KEY_K = keyCode('K');

function processDiagnostics() {

    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;
    if (eatKey(KEY_FLYING)) camera.flyingMode = !camera.flyingMode;
    if (eatKey(KEY_HEIGHTMAP)) world._activeRegion.drawHeightmap = !world._activeRegion.drawHeightmap;

}

// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    world.render(ctx);
    renderingManager.render(ctx);
    particleManager.render(ctx);
    
    if (g_renderSpatialDebug) {
        camera.render(ctx);
        spatialManager.render(ctx);
    }
	UIManager.render(ctx);
}


// PRELOAD STUFF

var g_images = {};

function requestPreloads() {

    var requiredImages = {

        terrain          : "img/terrain.png",
        link             : "img/link_alpha.png",
        sparcles         : "img/Sparcles.png",
        magicMissile     : "img/magicMissile.png",
        greenSoldier     : "img/greenMonster.png",
		fireball         : "img/fireball.png",
		tent         	 : "img/Tent.png",
		campfire         : "img/campfire.png",
		
		// UI sprites
		uibar         	 : "img/UIpic/UIbar.png",
		uimap        	 : "img/UIpic/UImap.png",
		globes         	 : "img/UIpic/globes.png",
		myst         	 : "img/UIpic/myst.png",


    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

    /***************************************************
	-------Humanoids------------------------------
	***************************************************/
	
    g_sprites.link = new Sprite(g_images.link);
    g_sprites.link.scale = 2;

    g_sprites.greenSoldier = new Sprite(g_images.greenSoldier);
    g_sprites.greenSoldier.scale = 1.8;
	
	/***************************************************
	-------terrain------------------------------
	***************************************************/
	g_sprites.tent = new Sprite(g_images.tent);
    g_sprites.tent.scale = 1.5;
	
	g_sprites.campfire = new Sprite(g_images.campfire);
    g_sprites.campfire.scale = 1.5;
	
	tilesheet.setTileset(g_images.terrain, 8);
    tiles.init();
	
	g_sprites.terrain  = new Sprite(g_images.terrain);

	/***************************************************
	-------Spell pictures------------------------------
	***************************************************/
    g_sprites.magicMissile = new Sprite(g_images.magicMissile);
    g_sprites.magicMissile.scale = 1.5;
	
	g_sprites.fireball = new Sprite(g_images.fireball);
    g_sprites.fireball.scale = 2.2;
	
	g_sprites.sparcles = new Sprite(g_images.sparcles);
	
	/***************************************************
	-------User interface------------------------------
	***************************************************/
	
    g_sprites.uibar = new Sprite(g_images.uibar);
	g_sprites.uimap = new Sprite(g_images.uimap);
	
	g_sprites.globes = new Sprite(g_images.globes);
	
	g_sprites.myst = new Sprite(g_images.myst);
	
	/**************************************************/
    
	//Random generate the World map.
    map = generateMap(50,50);
    var highlands = new Region(map.map, map.heightmap); 
    world.addRegion(highlands);

	//initialize game components
	UIManager.init();
    entityManager.init();
    particleManager.init();

    main.init();
}

// Kick it off
requestPreloads();
