var generalFeatures = {
    
    toHarvest: function(creep) {
        var sources = creep.pos.findClosestByPath(FIND_SOURCES, {
                    filter: (source) => {
                        return source.energy != 0
                    }
            });
        if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            
        // if (sources.length == 1 && sources.energy != 0 )  {
        //     if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE ) {
        //         creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        //     }
        // }
        // else if (sources.length > 1) {
            
        //     if (sources[0].energy != 0 /*&& source[0].memory.creepCount <= 3*/ ) {
        //         if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE  ) {
        //             creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
        //         }
        //     }
        //     else if (sources[1].energy != 0 /*&& source[1].memory.creepCount <= 3*/ ) {
        //         if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE  ) {
        //             creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
        //         }
        //     }
        //     else if (sources[2].energy != 0 /*&& source[2].memory.creepCount <= 3*/ ) {
        //         if(creep.harvest(sources[2]) == ERR_NOT_IN_RANGE  ) {
        //             creep.moveTo(sources[2], {visualizePathStyle: {stroke: '#ffaa00'}});
        //         }
        //     }
        // }
    },
    
    takeEnergyFromContainer: function(creep) {
        let sources = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE )  &&
                    (structure.store.energy <= structure.storeCapacity && structure.store.energy != 0) ;
            }
        });
        if(creep.withdraw(sources, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
            creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    },
    
    toHarvestBig: function(creep) {
        let source = Game.getObjectById(creep.memory.harvestPointId);
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
    
};



module.exports = generalFeatures;