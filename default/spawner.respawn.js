var utils = require('main.utils');

// TODO: If all harvesters die, other creeps still try to get energy from spawn,
//       and new harvesters won't spawn because there is not enough energy.
//       Only after all other creeps die the spawner will slowly generate enough
//       energy to spawn new harvesters. Fix this.
var spawnerRespawn = {

    run: function() {
        
	    // Find spawner
	    var room = Game.rooms['W4N3'];
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
        var totalMinerPositions = 0;
        var sources = room.memory.sources;
        for (var i = 0; i <= sources.length; i++) {
            var source = sources[i];
            if (source != undefined) {
                var minerPositions = source.minerPositions.length;
                var extraWorkers = source.extraWorkers;
                totalMinerPositions += minerPositions + extraWorkers;
            }
        }
        
        var maxAmounts = {
            harvesters: totalMinerPositions,
            scouts: 2,
            builders: 4,
            upgraders: 10
        };
        
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        if(harvesters.length < maxAmounts.harvesters) {
            var stats = [WORK, CARRY, MOVE];
            var name = 'Harvester' + Game.time;
            var options = { memory: {role: 'harvester', source: null} };
            
            this.tryToSpawnCreep(spawn, stats, name, options);
            return;
        }
        
        var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout');
        if(scouts.length < maxAmounts.scouts) {
            var stats = [ATTACK, MOVE, MOVE];
            //var stats = [ATTACK, CLAIM, MOVE, MOVE];
            var name = 'Scout' + Game.time;
            var options = { memory: {role: 'scout', location: null, strategy: 'move'} };
            
            this.tryToSpawnCreep(spawn, stats, name, options);
            return;
        }
        
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        if(builders.length < maxAmounts.builders) {
            var stats = [WORK, CARRY, MOVE];
            var name = 'Builder' + Game.time;
            var options = { memory: {role: 'builder', source: null} };
            
            this.tryToSpawnCreep(spawn, stats, name, options);
            return;
        }
        
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        if(upgraders.length < maxAmounts.upgraders) {
            var stats = [WORK, CARRY, MOVE];
            var name = 'Upgrader' + Game.time;
            var options = { memory: {role: 'upgrader', source: null} };
            
            this.tryToSpawnCreep(spawn, stats, name, options);
            return;
        }
	},
	
	tryToSpawnCreep: function(spawn, stats, name, options) {
	    var testIfCanSpawn = spawn.spawnCreep(stats, name, { dryRun: true });
        if (testIfCanSpawn == 0) {
            if (options.memory.role == 'scout') {
                options.memory.location = 'Flag1';
                spawn.spawnCreep(stats, name, options);
            }
            else {
                options.memory.source = utils.assignSource(options);
                if (!(options.memory.role == 'harvester' && options.memory.source == null)) {
                    spawn.spawnCreep(stats, name, options);
                }
            }
        }
    }
};

module.exports = spawnerRespawn;
