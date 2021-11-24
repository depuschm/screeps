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
    
    reassignSources: function() {
        this.resetMemory();
        
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if (creep.memory.source != undefined) {
                creep.memory.source = utils.assignSource();
            }
        }
    },
    
    destroyAllCreeps: function() {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            creep.suicide();
        }
    },
    
    info: function() {
        var amountHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
        var amountScouts = _.sum(Game.creeps, (c) => c.memory.role == 'scout');
        var amountBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
        var amountUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
        
        console.log(
            'Harvesters: ' + amountHarvesters + '\n' +
            'Scouts: ' + amountScouts + '\n' +
            'Builders: ' + amountBuilders + '\n' +
            'Upgraders: ' + amountUpgraders
            
        );
    }
};

module.exports = consoleCommands;
