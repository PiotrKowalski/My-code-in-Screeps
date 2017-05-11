var generalFeatures = require('general.features');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
    
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 transfer');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }
        
        var constructionSiteCount = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        
	    if(creep.memory.building && constructionSiteCount) {
            if(creep.build(constructionSiteCount) == ERR_NOT_IN_RANGE) {
                creep.moveTo(constructionSiteCount, {visualizePathStyle: {stroke: '#01DFD7'}});
            }
            
	    }
	    else if (!creep.memory.building) {
            var containerCount = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE )  &&
                        (structure.store.energy <= structure.storeCapacity && structure.store.energy != 0) ;
                }
            });
            
            if (containerCount.length > 0 ) {
                generalFeatures.takeEnergyFromContainer(creep);
            }
            else {
                generalFeatures.toHarvest(creep);
            }
	    }
	    else if (creep.memory.building && !constructionSiteCount) {
	        let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART) && structure.hits < 40000;
                    }
                });
                
            if (target) {
                if(creep.repair(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#01DF01'}});
                }
            }
	    }
	    
	    if (!creep.memory.buidling && creep.carry.energy == creep.carryCapacity) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES)
            if (targets.length == 0) {    
                creep.moveTo(Game.flags.collectionPoint);
            }
        }
        
	}
};

module.exports = roleBuilder;