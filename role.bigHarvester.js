var generalFeatures = require('general.features');

var roleBigHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.harvesting == false && creep.carry.energy < creep.carryCapacity  ) {
            creep.memory.harvesting = true;
            creep.say('🔄 harvest');
        }
        
	    if(creep.memory.harvesting) {
            generalFeatures.toHarvestBig(creep);
            if (creep.carry.energy == creep.carryCapacity) {
                creep.say('📥 transfer');
                creep.memory.harvesting = false;
            }
        }
        if (!creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_CONTAINER  &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(target.length) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        if (!creep.memory.harvesting && creep.carry.energy == creep.carryCapacity && creep.room.energyAvailable == creep.room.energyCapacityAvailable) {
            creep.moveTo(Game.flags.collectionPoint);
        }
	}
};

module.exports = roleBigHarvester;