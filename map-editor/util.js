"use strict";

function generateMap(width, height) {
    
    var map = [];
    
    for (var i=0; i<height; i++) {
        map.push([]);
        for (var j=0; j<width; j++) {
            // put grass in by default
            map[i][j] = tiles.FOREST.FILL; 
        }
    }

    map = makeClearing(map, width, height);

     
    // make it an island
    for (var i=0; i<height; i++) {
        for (var j=0; j<width; j++) {
            if (i<2 || height-2-1<i || j<2 || width-2-1<j) map[i][j] = tiles.FOREST.FILL; 
        }
    }

    makeRivers(map, width, height);
    makePaths(map, width, height);
    map = doubleMap(map,width,height);

    map = fixChunks(map, tiles.FOREST);
    map = fixChunks(map, tiles.WATER);
    map = fixChunks(map, tiles.MUD);

    var final_map = []
    for (var i=1; i<height*2-1; i++) {
        final_map.push([]);
        for (var j=1; j<width*2-1; j++) {
            final_map[i-1][j-1] = map[i][j];
        }
    }

    var heightmap = makeHightmap(final_map);
    final_map = makeFlowers(final_map);
    return { map: final_map, heightmap: heightmap };
}

function makeClearing(map, width, height) {

    var w = width, h=height, x=0, y=0;
    for (var i=y; i<y+h; i++) {
        for (var j=x; j<x+w; j++) {
            if (Math.random()<0.7)
                map[i][j] = tiles.GRASS;
        }
    }

    // fill holes
    for (var i=y+1; i<y+h-1; i++) {
        for (var j=x+1; j<x+w-1; j++) {
            if (map[i-1][j] !== tiles.GRASS && 
                map[i+1][j] !== tiles.GRASS &&
                map[i][j-1] !== tiles.GRASS && 
                map[i][j+1] !== tiles.GRASS) {
                    map[i][j] = tiles.FOREST.FILL;
            }

        }
    }

    return map;
}

function makeRivers(map, width, height) {

    var x = util.randInt(10,width-11);
    var y = util.randInt(10,height-11);

    for (var i=0; i<=y+1; i++) {
        map[i][x] = tiles.WATER.FILL;
        map[i][x+1] = tiles.WATER.FILL;
    }
    for (var i=0; i<=x+1; i++) {
        map[y][i] = tiles.WATER.FILL;
        map[y+1][i] = tiles.WATER.FILL;
    }

    return map;
}

function makePaths(map, width, height) {

    var x = 5, y = 5;

    for (var i=y; i<=height-y+1; i++) {
        map[i][x] = tiles.MUD.FILL;
        map[i][x+1] = tiles.MUD.FILL;
        map[i][width-x] = tiles.MUD.FILL;
        map[i][width-x+1] = tiles.MUD.FILL;
    }
    for (var i=x; i<=width-x+1; i++) {
        map[y][i] = tiles.MUD.FILL;
        map[y+1][i] = tiles.MUD.FILL;
        map[height-y][i] = tiles.MUD.FILL;
        map[height-y+1][i] = tiles.MUD.FILL;
    }

    return map;
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

function printMap(map) {

    for (var i=0; i<map.length; i++) {
        var row = '';
        for (var j=0; j<map[i].length; j++) {
            row += map[i][j]+' ';
        }
        console.log(row);
    }
}

function doubleMap(map, width, height) {

    var biggerMap = [];
    
    for (var i=0; i<height*2; i++) {
        biggerMap.push([]);
        for (var j=0; j<width*2; j++) {
            var x = Math.floor(j/2);
            var y = Math.floor(i/2);
            biggerMap[i][j] = map[y][x]; 
        }
    }

    return biggerMap;
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
