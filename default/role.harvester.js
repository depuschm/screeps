var creepsUtils = require('creeps.utils');

// TODO: https://stackoverflow.com/questions/38350499/finding-structure-with-highest-energy-screeps
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if (creep.store.getFreeCapacity() > 0) {
	        var source = Game.getObjectById(creep.memory.source.id);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            creepsUtils.storeEnergy(creep);
        }
    }
};

module.exports = roleHarvester;
