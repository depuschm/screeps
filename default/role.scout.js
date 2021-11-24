var roleScout = {

    // Game.spawns.Spawn1.createCreep([TOUGH, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE], undefined, {role: 'attacker'});
    
    /** @param {Creep} creep **/
    run: function(creep) {
        
        if (creep.memory.strategy == 'move') {
            var pos = Game.flags[creep.memory.location].pos;
            if (!creep.pos.isEqualTo(pos)) {
                creep.moveTo(pos, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            else {
                creep.memory.strategy = 'attack';
            }
        }
        else if (creep.memory.strategy == 'attack') {
            var hostileCreeps  = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS,
                { filter: (s) => s.owner.username != 'friend' }
            );
            
            if (hostileCreeps == undefined) {
                //var hostileStructures = creep.pos.findClosestByPath(FIND_STRUCTURES);
                var hostileStructures = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) =>  (
                        s.structureType == STRUCTURE_WALL ||
                        s.structureType == STRUCTURE_RAMPART ||
                        s.structureType == STRUCTURE_TOWER ||
                        s.structureType == STRUCTURE_SPAWN ||
                        s.structureType == STRUCTURE_EXTENSION
                    )
                });
                
                if (hostileStructures == 0) {
                    if (creep.attack(hostileStructures) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(hostileStructures);
                    }
                }
                else {
                    // creep.memory.strategy = 'claim';
                }
            }
            else if (creep.attack(hostileCreeps) == ERR_NOT_IN_RANGE) {
                creep.moveTo(hostileCreeps);
            }
        }
        else if (creep.memory.strategy == 'claim') {
            // Try to claim room controller
            if (creep.room.controller) {
                if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
	}
};

module.exports = roleScout;