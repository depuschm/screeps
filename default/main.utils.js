var utils = {

	// https://www.reddit.com/r/screeps/comments/5geco0/question_way_to_survey_the_terrain_of_a_3x3_area/
    findSources: function(room, spawn) {
        var sources = room.find(FIND_SOURCES);
        var sourceData = [];
    
        for (var i in sources) {
            var source = sources[i];
            var minerPositions = []; // A list of positions that miners can get to
    
            // Find free positions around the source
            for (var y = source.pos.y - 1; y <= source.pos.y + 1; y++) {
                for (var x = source.pos.x - 1; x <= source.pos.x + 1; x++) {
                    if (Game.map.getRoomTerrain(room.name).get(x, y) != TERRAIN_MASK_WALL) {
                        // lets see if it's reachable from the spawn
                        var pos = new RoomPosition(x, y, room.name);
                        var ret = PathFinder.search(spawn.pos, pos, {
                            // I intend to build roads so I ignore swampsCost
                            swampCost: 1
                        });
    
                        if (!ret.incomplete) {
                            var position = {
                                cost: ret.cost,
                                path: ret.path,
                                pos: pos,
                                source: source
                            }
                            minerPositions.push(position);
                        }
                    }
                }
            }
    
            // Store both the minerPositions and the source.id into the memory
            var mem = {
                id: source.id,
                i: i,
                minerPositions: minerPositions,
                extraWorkers: 3, // TODO: calculate good amount
                currentWorkers: 0
            }
    
            sourceData.push(mem);
        }
        room.memory.sources = sourceData;
    },
    
    assignSource: function() {
        var room = Game.rooms['W4N3'];
        
        // Assign source where more workers are needed
        // _.sortBy(sources, s => creep.pos.getRangeTo(s))
        var sources = room.memory.sources;
        for (var i = 0; i <= sources.length; i++) {
            var source = sources[i];
            if (source != undefined) {
                var totalPositions = source.minerPositions.length;
                if (source.currentWorkers < totalPositions + source.extraWorkers) {
                    source.currentWorkers++;
                    return source;
                }
            }
        }
        return null;
        
        // TODO: print miners like 3/4 working and choose free position if available
        // TODO: make sure only one creep is working in one spot (use list in memory for that)
        // - have a list with objects: [source, creepsWorking], if creepsWorking < amountOfAvailableSpots
        //   then assign creep to mine source with that id, store source id in creep memory (or better: don't use freeSpots, only check for creepsWorking < amountOfAvailableSpots.length)
        // -> Currently creeps move aways from a source if there are no free places
        // TODO: later use total amount of available spots to calculate a good amount of creeps that might work in a room
    }
};

module.exports = utils;
