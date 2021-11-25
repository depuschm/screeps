// TODO: https://stackoverflow.com/questions/38350499/finding-structure-with-highest-energy-screeps
var creepsUtils = {

    storeEnergy: function(creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_TOWER) && 
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if (targets.length > 0) {
            // Choose target with least amount of energy
            // TODO: find closest
            targets.sort((a, b) => {
                var energyA = a.store.energy;
                var energyB = b.store.energy;
                
                return energyA - energyB;
            });
            var target = targets[0];
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    },
    
    withdrawEnergy: function(creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_CONTAINER);
            }
        });
        
        if (targets.length > 0) {
            // Choose target with most amount of energy
            // TODO: find closest
            targets.sort((a, b) => {
                var energyA = a.store.energy;
                var energyB = b.store.energy;
                
                return energyB - energyA;
            });
            var target = targets[0];
            //console.log(JSON.stringify(targets));
            if (target.structureType == undefined) {
                if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = creepsUtils;
