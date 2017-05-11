var generalFeatures = require('general.features');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    else if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    else if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var containerCount = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE )  &&
                        (structure.store.energy <= structure.storeCapacity && structure.store.energy != 0) ;
                }
            });
            
            var source = creep.pos.findClosestByRange(FIND_SOURCES, {
                    filter: (source) => {
                        return source.energy != 0
                    }
            });
            
            var targets = containerCount.concat(source);
            
            var target = creep.pos.findClosestByPath(targets);
            
            console.log(target.structureType);
            if (target.structureType == "undefined") {
                if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else {
                generalFeatures.toHarvest(creep);
            }
        }
	}
};

module.exports = roleUpgrader;