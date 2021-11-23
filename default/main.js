global.Commands = require('consoleCommands');

var utils = require('main.utils');
var spawnerRespawn = require('spawner.respawn');

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleTower = require('role.tower');

module.exports.loop = function () {
    var room = Game.rooms['W4N3'];
    
    // Clear memory
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            var source = Memory.creeps[name].source;
            room.memory.sources[source.i].currentWorkers--;
            
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    spawnerRespawn.run();
    
    // Perform tasks
    //roleTower.run();
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}
