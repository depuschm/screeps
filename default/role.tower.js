var roleTower = {
    
    run: function(room) {
        var towers = room.find(FIND_MY_STRUCTURES,
            { filter: {structureType: STRUCTURE_TOWER} }
        );
        var tower = towers[0];
        if (tower) {
            // Attack hostile creeps and repair structures
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if (closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }
    
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower.attack(closestHostile);
            }
        }
    }
};

module.exports = roleTower;
