global.Commands = require('consoleCommands');

var utils = require('main.utils');
var spawnerRespawn = require('spawner.respawn');

var roleHarvester = require('role.harvester');
var roleScout = require('role.scout');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleTower = require('role.tower');

module.exports.loop = function () {
    var room = Game.rooms['W4N3'];
    
    // Clear memory
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            // Update currentWorkers in memory (if source is not spawn/structure)
            if (source != undefined) {
                var source = Memory.creeps[name].source;
                if (source.i != undefined) {
                    var sourceMemory = room.memory.sources[source.i];
                    sourceMemory.currentWorkers--;
                }
            }
            
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    spawnerRespawn.run();
    
    // Perform tasks
    //roleTower.run();
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == 'scout') {
            roleScout.run(creep);
        }
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}
