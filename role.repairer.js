var generalFeatures = require('general.features');

var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.harvesting == false && creep.carry.energy == 0  ) {
            creep.memory.harvesting = true;
            creep.say('🔄 harvest');
        }
        if (creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
                creep.say('🛠 repair');
                creep.memory.harvesting = false;
            }
        else if(creep.memory.harvesting) {
            var containerCount = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE )  &&
                        (structure.store.energy <= structure.storeCapacity && structure.store.energy != 0) ;
                }
            });
            
            if (containerCount.length > 0) {
                generalFeatures.takeEnergyFromContainer(creep);
            }
            else {
                generalFeatures.toHarvest(creep);
            }
            
        }
        else if (!creep.memory.harvesting && creep.carry.energy > 0) {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_ROAD ) &&
                            structure.hits < structure.hitsMax) || ((structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART) && structure.hits < 40000) 
                            || (structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity); 
                    }
            });
            
            
            // console.log(targets);
            if(target.structureType == STRUCTURE_TOWER) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else if (target) {
                if(creep.repair(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#01DF01'}});
                }
            }
            
            else  {
                creep.moveTo(Game.flags.collectionPoint);
            }
        }
        // else if (!creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
        //     var targets = creep.room.find(FIND_STRUCTURES, {
        //         filter: (structure) => {
        //             return  ((structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_ROAD ) &&
        //                     structure.hits < structure.hitsMax) || ((structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART) && structure.hits < 40000);
        //         }
        //     });
        //     if ( targets.length == 0 ){
        //         creep.moveTo(Game.flags.collectionPoint);
        //     }
        // }
    }
}

module.exports = roleRepairer;