var utils = require('main.utils');

var consoleCommands = {

    /**
     * Usage:
     * Commands.resetMemory();
     */
    resetMemory: function() {
        var room = Game.rooms['W4N3'];
        var spawn = Game.spawns['Home'];
        
        // reset room memory
        utils.findSources(room, spawn);
    },
    
    destroyAllCreeps: function() {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            creep.suicide();
        }
    }
};

module.exports = consoleCommands;
