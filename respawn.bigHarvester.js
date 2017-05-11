var respawnBigHarvester = {

    run: function(RoomName) {
        
        var bigHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'bigHarvester');
        console.log('Big harvesters: ' + bigHarvesters.length);
        
        var extensionCount = Game.rooms[RoomName].find(FIND_STRUCTURES, {
        filter: (structure) => {
                return structure.structureType == STRUCTURE_EXTENSION 
            }
        });
        var sources = Game.rooms[RoomName].find(FIND_SOURCES);
        
        let occupiedHarvestPoints = _.filter(Game.creeps, (creep) => creep.memory.role =='bigHarvester').map((el) => el.memory.harvestPointId);
        
        if(extensionCount.length >= 7  && sources.length == 1 && bigHarvesters.length < 1 ) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'bigHarvester', harvesting:false});
            console.log('Spawning new harvester: ' + newName);
        }  
        else if(extensionCount.length >= 7  && sources.length == 2 && bigHarvesters.length < 2 ) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'bigHarvester', harvesting:false});
            console.log('Spawning new harvester: ' + newName);
        }  
        else if(extensionCount.length >= 7  && sources.length == 3 && bigHarvesters.length < 3 ) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], undefined, {role: 'bigHarvester', harvesting:false});
            console.log('Spawning new harvester: ' + newName);
        }
        
        if  (!Game.creeps.newName.memory.harvestPointId) {
                let closestSource = Game.creeps[newName].pos.findClosestByRange(FIND_SOURCES, {
                    filter: (source) => occupiedHarvestPoints(source.id) == -1
                });
                Game.creeps[newName].memory.harvestPointId = closestSource.id;
            }
    }
}
module.exports = respawnBigHarvester;