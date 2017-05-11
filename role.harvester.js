var generalFeatures = require('general.features');

var roleHarvester = {

    run: function(creep) {
        
        if (creep.memory.harvesting == false /*&& creep.memory.filling == true*/ && creep.carry.energy == 0  ) {
            creep.memory.harvesting = true;
            // creep.memory.filling = false;
            creep.say('🔄 harvest');
        }
        
        else if(creep.memory.harvesting ) {
            generalFeatures.toHarvest(creep);
            if (creep.carry.energy == creep.carryCapacity) {
                creep.say('📥 transfer');
                creep.memory.harvesting = false;
                // creep.memory.filling = true;
            }
        }
        
        else if (!creep.memory.harvesting /*&& creep.memory.filling*/ && creep.carry.energy >= 0 && creep.room.energyAvailable < creep.room.energyCapacityAvailable) {
            //  console.log(" Harvesters containers: "+targets);
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN ) &&
                            (structure.energy < structure.energyCapacity)
                    }
            });
            
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            
        }
        
        else if (!creep.memory.harvesting && creep.carry.energy > 0) {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER  && structure.store.energy < structure.storeCapacity) 
                            || (structure.structureType == STRUCTURE_STORAGE && structure.store.energy < 700000)
                            || (structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity);
                    }
            });
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        
        else if (!creep.memory.harvesting && creep.carry.energy == creep.carryCapacity && creep.room.energyAvailable == creep.room.energyCapacityAvailable) {
            creep.moveTo(Game.flags.collectionPoint);
        }
	}
};

module.exports = roleHarvester;