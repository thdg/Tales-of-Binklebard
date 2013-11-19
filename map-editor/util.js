"use strict";

function generateBasicMap(width, height) {
    
    var map = [];

    for (var i=0; i<height; i++) {
        map.push([]);
        for (var j=0; j<width; j++) {
            map[i][j] = 0;
        }
    }

    var heightmap = makeHightmap(map);

    return { map: map, heightmap: heightmap };
}

function makeHightmap(map) {

    var heightmap = [];

    for (var i=0; i<map.length; i++) {
        heightmap.push([]);
        for (var j=0; j<map[i].length; j++) {
            // put grass in by default
            heightmap[i][j] = isPartOf(map[i][j],tiles.MUD) || map[i][j]===0 ? 0 : 1; 
        }
    }

    return heightmap;
}

function map2string(map) {

    var map_string = '';
    for (var i=0; i<map.length; i++) {
        map_string += (map[i] + ';');
    }
    return map_string;
}

function string2map(map_string) {

    var map = [];
    var rows = map_string.split(';');
    for (var i=0; i<rows.length-1; i++) {
        map.push(rows[i].split(','));
    }

    for (var i=0; i<map.length; i++) {
        for (var j=0; j<map[i].length; j++) {
            var tile = parseInt(map[i][j]);
            if (tile === NaN) console.log('map error, tile is not integer');
            map[i][j] = tile;
        }
    }
    return map;
}

function makeFlowers(map) {

    for (var i=0; i<map.length; i++) {
        for (var j=0; j<map[i].length; j++) {
            if (map[i][j]===0 && Math.random()<0.2)
                map[i][j] = util.randInt(0,3); 
        }
    }

    return map;
}

function isPartOf(tile, stack) {
    return tile === stack.FILL ||
           tile === stack.TL ||
           tile === stack.TR ||
           tile === stack.BL ||
           tile === stack.BR ||
           tile === stack.T ||
           tile === stack.L ||
           tile === stack.B ||
           tile === stack.R ||
           tile === stack.IBL ||
           tile === stack.IBR ||
           tile === stack.ITL ||
           tile === stack.ITR;
}

function fixChunks(map, stack) {

    for (var i=0; i<map.length-1; i++) {
        for (var j=0; j<map[i].length-1; j++) {

            // fix lines
            if (!isPartOf(map[i][j], stack) &&
                !isPartOf(map[i][j+1], stack) &&
                isPartOf(map[i+1][j], stack) &&
                isPartOf(map[i+1][j+1], stack) ) {
                    map[i+1][j] = stack.T;
                    map[i+1][j+1] = stack.T;
            }
            if (isPartOf(map[i][j], stack) &&
                isPartOf(map[i][j+1], stack) &&
                !isPartOf(map[i+1][j], stack) &&
                !isPartOf(map[i+1][j+1], stack) ) {
                    map[i][j] = stack.B;
                    map[i][j+1] = stack.B;
            }
            if (!isPartOf(map[i][j], stack) &&
                isPartOf(map[i][j+1], stack) &&
                !isPartOf(map[i+1][j], stack) &&
                isPartOf(map[i+1][j+1], stack) ) {
                    map[i][j+1] = stack.L;
                    map[i+1][j+1] = stack.L;
            }
            if (isPartOf(map[i][j], stack) &&
                !isPartOf(map[i][j+1], stack) &&
                isPartOf(map[i+1][j], stack) &&
                !isPartOf(map[i+1][j+1], stack) ) {
                    map[i][j] = stack.R;
                    map[i+1][j] = stack.R;
            }
        }
    }
    for (var i=0; i<map.length-1; i++) {
        for (var j=0; j<map[i].length-1; j++) {

            // fix inner corners
            if (!isPartOf(map[i][j], stack) &&
                isPartOf(map[i][j+1], stack) &&
                isPartOf(map[i+1][j], stack) &&
                isPartOf(map[i+1][j+1], stack) ) {
                    map[i][j+1] = stack.L;
                    map[i+1][j] = stack.T;
                    map[i+1][j+1] = stack.ITL;
            }
            if (isPartOf(map[i][j], stack) &&
                !isPartOf(map[i][j+1], stack) &&
                isPartOf(map[i+1][j], stack) &&
                isPartOf(map[i+1][j+1], stack) ) {
                    map[i][j] = stack.R;
                    map[i+1][j] = stack.ITR;
                    map[i+1][j+1] = stack.T;
            }
            if (isPartOf(map[i][j], stack) &&
                isPartOf(map[i][j+1], stack) &&
                isPartOf(map[i+1][j], stack) &&
                !isPartOf(map[i+1][j+1], stack) ) {
                    map[i][j] = stack.IBR;
                    map[i][j+1] = stack.B;
                    map[i+1][j] = stack.R;
            }
            if (isPartOf(map[i][j], stack) &&
                isPartOf(map[i][j+1], stack) &&
                !isPartOf(map[i+1][j], stack) &&
                isPartOf(map[i+1][j+1], stack) ) {
                    map[i][j] = stack.B;
                    map[i][j+1] = stack.IBL;
                    map[i+1][j+1] = stack.L;
            }
        }
    }

    for (var i=0; i<map.length-1; i++) {
        for (var j=0; j<map[i].length-1; j++) {

            // fix outer corners
            if (isPartOf(map[i][j], stack) &&
                !isPartOf(map[i][j+1], stack) &&
                !isPartOf(map[i+1][j], stack) ) {
                    map[i][j] = stack.BR;
            }
            if (!isPartOf(map[i][j], stack) &&
                isPartOf(map[i][j+1], stack) &&
                !isPartOf(map[i+1][j+1], stack) ) {
                    map[i][j+1] = stack.BL;
            }
            if (!isPartOf(map[i][j], stack) &&
                isPartOf(map[i+1][j], stack) &&
                !isPartOf(map[i+1][j+1], stack) ) {
                    map[i+1][j] = stack.TR;
            }
            if (!isPartOf(map[i][j+1], stack) &&
                !isPartOf(map[i+1][j], stack) &&
                isPartOf(map[i+1][j+1], stack) ) {
                    map[i+1][j+1] = stack.TL;
            }
        }
    }


    return map;
}
