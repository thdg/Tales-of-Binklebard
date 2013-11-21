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
        armor            : "img/classes/Armor.png",
		rake             : "img/classes/rake.png",
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
		characterScreen  : "img/UIpic/characterScreen.png",
		chest  			 : "img/UIpic/chest.png",
		lifeflask	     : "img/UIpic/lifeflask.png",
		manaflask	     : "img/UIpic/manaflask.png",
		armorkit	     : "img/UIpic/armorkit.png",
		weaponkit	     : "img/UIpic/weaponkit.png",
		
		// classes
		rogue         	 : "img/classes/rogue_alpha.png",
		wizard         	 : "img/classes/wizard_alpha.png",
		warrior          : "img/classes/warrior_alpha.png",
    };

    imagesPreload(requiredImages, g_images, preloadMap);
}

var g_map = '';

function preloadMap() {
	// okey, I know jQuery is a library, 
	// and we are not supposed to use libraries,
	// but this is soooooo much easier
	$.get('maps/highlands.txt', function(data) {
		g_map = data;
		preloadDone();
	})
}

var g_sprites = {};
var g_audio   = {};

function preloadDone() {

    /***************************************************
	-------Humanoids------------------------------
	***************************************************/
	
    g_sprites.link = new Sprite(g_images.link);
    g_sprites.link.scale = 2;
	
	g_sprites.rogue = new Sprite(g_images.rogue);
    g_sprites.rogue.scale = 2;
	
	g_sprites.wizard = new Sprite(g_images.wizard);
    g_sprites.wizard.scale = 2;
	
	g_sprites.warrior = new Sprite(g_images.warrior);
    g_sprites.warrior.scale = 2;

    g_sprites.greenSoldier = new Sprite(g_images.greenSoldier);
    g_sprites.greenSoldier.scale = 1.8;

    g_audio.strike = new Audio('audio/swordStrike.wav');
	
	/***************************************************
	-------terrain------------------------------
	***************************************************/
	g_sprites.tent = new Sprite(g_images.tent);
    g_sprites.tent.scale = 1.5;
	
	g_sprites.campfire = new Sprite(g_images.campfire);
    g_sprites.campfire.scale = 1.5;
	
	g_sprites.terrain  = new Sprite(g_images.terrain);
	tilesheet.setTileset(g_sprites.terrain, 8);
    tiles.init();

	/***************************************************
	-------Spell pictures------------------------------
	***************************************************/
    g_sprites.magicMissile = new Sprite(g_images.magicMissile);
    g_sprites.magicMissile.scale = 1.5;
	
	g_sprites.fireball = new Sprite(g_images.fireball);
    g_sprites.fireball.scale = 2.2;
	
	g_sprites.sparcles = new Sprite(g_images.sparcles);

	g_sprites.armor = new Sprite(g_images.armor);
	g_sprites.armor.scale = 2;
	
	g_sprites.rake = new Sprite(g_images.rake);
	
	/***************************************************
	-------User interface------------------------------
	***************************************************/
	
    g_sprites.uibar = new Sprite(g_images.uibar);
	g_sprites.uimap = new Sprite(g_images.uimap);
	
	g_sprites.globes = new Sprite(g_images.globes);
	
	g_sprites.myst = new Sprite(g_images.myst);
	
	g_sprites.characterScreen = new Sprite(g_images.characterScreen);
	
	g_sprites.lifeflask = new Sprite(g_images.lifeflask);
	g_sprites.manaflask = new Sprite(g_images.manaflask);
	g_sprites.armorkit = new Sprite(g_images.armorkit);
	g_sprites.weaponkit = new Sprite(g_images.weaponkit);
	g_sprites.chest = new Sprite(g_images.chest);
	
	/**************************************************/
    
	//Random generate the World map.
    var map = string2map(g_map);
    var heightmap = makeHightmap(map);
    var highlands = new Region(map, heightmap); 
    world.addRegion(highlands);

	//initialize game components
	UIManager.init();
    entityManager.init();
    particleManager.init();

    main.init();
}

// Kick it off
requestPreloads();
