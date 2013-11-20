// world is a square 2d array of integers ( world[][])
// pathStart and pathEnd are arrays [x,y]
function findPath(world, pathStart, pathEnd) {
    "use strict";

    // lets declare shortcuts for math functions
    var abs = Math.abs,
        max = Math.max,

        // Everything above that number is assumed to
        // be a wall of some kind.
        maxWalkableTileNum = 2,

        // remember world dimensions
        worldWidth = world[0].length,
        worldHeight = world.length,
        worldSize = worldWidth * worldHeight;

    // returns boolean value (world cell is available and open)
    function canWalkHere(x, y) {
        return ((world[x] !== null) && (world[x][y] !== null) &&
                (world[x][y] <= maxWalkableTileNum));
    }

    function DiagonalDistance(Point, Goal) {
        // assumes diagonal distances are the same as cardinals(NSEW)
        return max(abs(Point.x - Goal.x), abs(Point.y - Goal.y));
    }


    // Returns every available North, South, East or West
    // cell that is empty. No diagonals,
    // unless distanceFunction function is not Manhattan
    function Neighbours(x, y) {
        var N = y - 1,
        S = y + 1,
        E = x + 1,
        W = x - 1,
        myN = N > -1 && canWalkHere(x, N),
        myS = S < worldHeight && canWalkHere(x, S),
        myE = E < worldWidth && canWalkHere(E, y),
        myW = W > -1 && canWalkHere(W, y),
        result = [];
        if(myN) result.push({x:x, y:N});
        if(myE) result.push({x:E, y:y});
        if(myS) result.push({x:x, y:S});
        if(myW) result.push({x:W, y:y});
        DiagonalNeigbours(myN, myS, myE, myW, N, S, E, W, result);
        return result;
    }

    // returns every available North East, South East,
    // South West or North West cell - no squeezing through
    // "cracks" between two diagonals
    function DiagonalNeigbours(myN, myS, myE, myW, N, S, E, W, result) {
        if(myN) {
            if(myE && canWalkHere(E, N)) { result.push({x:E, y:N}); }
            if(myW && canWalkHere(W, N)) { result.push({x:W, y:N}); }
        }
        if(myS) {
            if(myE && canWalkHere(E, S)) { result.push({x:E, y:S}); }
            if(myW && canWalkHere(W, S)) { result.push({x:W, y:S}); }
        }
    }

    // Node function, returns a new object with Node properties
    // Used in the calculatePath function to store route costs, etc.
    function Node(Parent, Point) {
        var newNode = {
            // pointer to another Node object
            Parent:Parent,
            // array index of this Node in the world linear array
            value:Point.x + (Point.y * worldWidth),
            // the location coordinates of this Node
            x:Point.x,
            y:Point.y,
            // the heuristic estimated cost
            // of an entire path using this node
            f:0,
            // the distanceFunction cost to get
            // from the starting point to this node
            g:0
        };
        return newNode;
    }

    // Path function, executes AStar algorithm operations
    function calculatePath() {
        // create Nodes from the Start and End x,y coordinates
        var mypathStart = new Node(null, {x:pathStart[0], y:pathStart[1]}),
            mypathEnd = new Node(null, {x:pathEnd[0], y:pathEnd[1]}),
            // create an array that will contain all world cells
            //AStar = new Array(worldSize),
            AStar = [],
            // list of currently open Nodes
            Open = [mypathStart],
            // list of closed Nodes
            Closed = [],
            // list of the final output array
            result = [],
            // reference to a Node (that is nearby)
            myNeighbours,
            // reference to a Node (that we are considering now)
            myNode,
            // reference to a Node (that starts a path in question)
            myPath,
            // temp integer variables used in the calculations
            length, max, min, i, j;

        // iterate through the open list until none are left
        while(length = Open.length) {
            max = worldSize;
            min = -1;
            for(i = 0; i < length; i++) {
                if(Open[i].f < max) {
                    max = Open[i].f;
                    min = i;
                }
            }
            // grab the next node and remove it from Open array
            myNode = Open.splice(min, 1)[0];
            // is it the destination node?
            if(myNode.value === mypathEnd.value) {
                myPath = Closed[Closed.push(myNode) - 1];
                do { 
                    result.push([myPath.x, myPath.y]); 
                }
                while (myPath = myPath.Parent);
                // clear the working arrays
                AStar = Closed = Open = [];
                // we want to return start to finish
                result.reverse();
            }
            else { // not the destination
                // find which nearby nodes are walkable
                myNeighbours = Neighbours(myNode.x, myNode.y);
                // test each one that hasn't been tried already
                for(i = 0, j = myNeighbours.length; i < j; i++) {
                    myPath = new Node(myNode, myNeighbours[i]);
                    if (!AStar[myPath.value]){
                        // estimated cost of this particular route so far
                        myPath.g = myNode.g + DiagonalDistance(myNeighbours[i], myNode);
                        // estimated cost of entire guessed route to the destination
                        myPath.f = myPath.g + DiagonalDistance(myNeighbours[i], mypathEnd);
                        // remember this new path for testing above
                        Open.push(myPath);
                        // mark this node in the world graph as visited
                        AStar[myPath.value] = true;
                    }
                }
                // remember this route as having no more untested options
                Closed.push(myNode);
            }
        } // keep iterating until the Open list is empty
        return result;
    }

    // returns an array of coordinates
    // that is empty if no path is possible
    return calculatePath();
}