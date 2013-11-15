function generateMap(width, height) {
    
    map = [];
    
    for (var i=0; i<height; i++) {
        map.push([]);
        for (var j=0; j<width; j++) {
            // put grass in by default
            map[i][j] = tiles.FOREST; 
        }
    }

    map = makeClearing(map, width, height);

     
    // make it an island
    for (var i=0; i<height; i++) {
        for (var j=0; j<width; j++) {
            if (i<2 || height-2-1<i || j<2 || width-2-1<j) map[i][j] = tiles.FOREST; 
        }
    }



    makeRivers(map, width, height);
    makePaths(map, width, height);
    map = doubleMap(map,width,height);

    map = makeTrees(map);

    var final_map = []
    for (var i=1; i<height*2-1; i++) {
        final_map.push([]);
        for (var j=1; j<width*2-1; j++) {
            final_map[i-1][j-1] = map[i][j];
        }
    }

    heightmap = makeHightmap(final_map);
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
                    map[i][j] = tiles.FOREST;
            }

        }
    }

    return map;
}

function makeRivers(map, width, height) {

    var x = util.randInt(10,width-11);
    var y = util.randInt(10,height-11);

    for (var i=0; i<=y; i++) {
        map[i][x] = tiles.WATER;
    }
    for (var i=0; i<=x; i++) {
        map[y][i] = tiles.WATER;
    }

    return map;
}

function makePaths(map, width, height) {

    var x = 5, y = 5;

    for (var i=y; i<=height-y; i++) {
        map[i][x] = tiles.MUD;
        map[i][width-x] = tiles.MUD;
    }
    for (var i=x; i<=width-x; i++) {
        map[y][i] = tiles.MUD;
        map[height-y][i] = tiles.MUD;
    }

    return map;
}

function makeHightmap(map) {

    var heightmap = [];

    for (var i=0; i<map.length; i++) {
        heightmap.push([]);
        for (var j=0; j<map[i].length; j++) {
            // put grass in by default
            heightmap[i][j] = map[i][j]===0 || map[i][j]===8 ? 0 : 1; 
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

    biggerMap = [];
    
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

function makeTrees(map) {

    // make chunks of trees
    for (var i=0; i<map.length-1; i++) {
        for (var j=0; j<map[i].length-1; j++) {
            if (map[i][j]===tiles.FOREST) {
                map[i][j] = tiles.FOREST_TL;
                map[i][j+1] = tiles.FOREST_TR;
                map[i+1][j] = tiles.FOREST_BL;
                map[i+1][j+1] = tiles.FOREST_BR;
            }
        }
    }

    for (var i=0; i<map.length-1; i++) {
        for (var j=0; j<map[i].length-1; j++) {

            // fill all holes
            if (map[i][j] === tiles.FOREST_BR &&
                map[i][j+1] === tiles.FOREST_BL &&
                map[i+1][j] === tiles.FOREST_TR &&
                map[i+1][j+1] === tiles.FOREST_TL ) {
                    map[i][j] = tiles.FOREST;
                    map[i][j+1] = tiles.FOREST;
                    map[i+1][j] = tiles.FOREST;
                    map[i+1][j+1] = tiles.FOREST;
            }

            // fix corners
            if (map[i][j+1] === tiles.FOREST_BL &&
                map[i+1][j] === tiles.FOREST_TR &&
                map[i+1][j+1] === tiles.FOREST_TL ) {
                    map[i][j+1] = tiles.FOREST_L;
                    map[i+1][j] = tiles.FOREST_T;
                    map[i+1][j+1] = tiles.FOREST;
            }
            if (map[i][j] === tiles.FOREST_BR &&
                map[i+1][j] === tiles.FOREST_TR &&
                map[i+1][j+1] === tiles.FOREST_TL ) {
                    map[i][j] = tiles.FOREST_R;
                    map[i+1][j] = tiles.FOREST;
                    map[i+1][j+1] = tiles.FOREST_T;
            }
            if (map[i][j] === tiles.FOREST_BR &&
                map[i][j+1] === tiles.FOREST_BL &&
                map[i+1][j] === tiles.FOREST_TR ) {
                    map[i][j] = tiles.FOREST;
                    map[i][j+1] = tiles.FOREST_B;
                    map[i+1][j] = tiles.FOREST_R;
            }
            if (map[i][j] === tiles.FOREST_BR &&
                map[i][j+1] === tiles.FOREST_BL &&
                map[i+1][j+1] === tiles.FOREST_TL ) {
                    map[i][j] = tiles.FOREST_B;
                    map[i][j+1] = tiles.FOREST;
                    map[i+1][j+1] = tiles.FOREST_L;
            }

            // fix lines
            if (map[i][j] === tiles.FOREST_TR &&
                map[i][j+1] === tiles.FOREST_TL ) {
                    map[i][j] = tiles.FOREST_T;
                    map[i][j+1] = tiles.FOREST_T;
            }
            if (map[i][j] === tiles.FOREST_BR &&
                map[i][j+1] === tiles.FOREST_BL ) {
                    map[i][j] = tiles.FOREST_B;
                    map[i][j+1] = tiles.FOREST_B;
            }
            if (map[i][j] === tiles.FOREST_BL &&
                map[i+1][j] === tiles.FOREST_TL ) {
                    map[i][j] = tiles.FOREST_L;
                    map[i+1][j] = tiles.FOREST_L;
            }
            if (map[i][j] === tiles.FOREST_BR &&
                map[i+1][j] === tiles.FOREST_TR ) {
                    map[i][j] = tiles.FOREST_R;
                    map[i+1][j] = tiles.FOREST_R;
            }
        }
    }

    return map;
}
