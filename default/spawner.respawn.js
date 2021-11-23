var utils = require('main.utils');

var spawnerRespawn = {

    run: function() {
        
	    // Find spawner
	    var spawn = Game.spawns['Home'];
	    
	    // Show what kind of creep is spawning
        if (spawn.spawning) { 
            var spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                spawn.pos.x + 1, 
                spawn.pos.y, 
                {align: 'left', opacity: 0.8});
        }
        
        // Spawn Creep
        var maxAmounts = {
            harvesters: 6,
            builders: 4,
            upgraders: 6
        };
        
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        if(harvesters.length < maxAmounts.harvesters) {
            var stats = [WORK,CARRY,MOVE];
            var name = 'Harvester' + Game.time;
            var options = { memory: {role: 'harvester', source: null} };
            
            this.tryToSpawnCreep(spawn, stats, name, options);
            return;
        }
        
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        if(builders.length < maxAmounts.builders) {
            var stats = [WORK,CARRY,MOVE];
            var name = 'Builder' + Game.time;
            var options = { memory: {role: 'builder', source: null} };
            
            this.tryToSpawnCreep(spawn, stats, name, options);
            return;
        }
        
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        if(upgraders.length < maxAmounts.upgraders) {
            var stats = [WORK,CARRY,MOVE];
            var name = 'Upgrader' + Game.time;
            var options = { memory: {role: 'upgrader', source: null} };
            
            this.tryToSpawnCreep(spawn, stats, name, options);
            return;
        }
	},
	
	tryToSpawnCreep: function(spawn, stats, name, options) {
	    var testIfCanSpawn = spawn.spawnCreep(stats, name, { dryRun: true });
        if (testIfCanSpawn == 0) {
            options.memory.source = utils.assignSource();
            if (options.memory.source != null) {
                spawn.spawnCreep(stats, name, options);
            }
        }
    }
};

module.exports = spawnerRespawn;
