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

    makeRivers(map);
    makePaths(map);

     
    // make it an island
    for (var i=0; i<height; i++) {
        for (var j=0; j<width; j++) {
            if (i<2 || height-2-1<i || j<2 || width-2-1<j) map[i][j] = tiles.FOREST; 
        }
    }


    map = doubleMap(map,width,height);

    map = makeTrees(map);

    for (var i=0; i<height*2; i++) {
        for (var j=0; j<width*2; j++) {
            if (i<1 || height*2-1<=i || j<1 || width*2-1<=j) map[i][j] = tiles.FOREST; 
        }
    }

    heightmap = makeHightmap(map);
    map = makeFlowers(map);
    return { map: map, heightmap: heightmap };
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

function makeRivers(map) {

    return map;
}

function makePaths(map) {

    return map;
}

function makeHightmap(map) {

    var heightmap = [];

    for (var i=0; i<map.length; i++) {
        heightmap.push([]);
        for (var j=0; j<map[i].length; j++) {
            // put grass in by default
            heightmap[i][j] = Math.min(1,map[i][j]); 
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
