var respawnHarvester = {

    run: function(RoomName) {
            
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        console.log('Harvesters: ' + harvesters.length);
        
        var extensionCount = Game.rooms[RoomName].find(FIND_STRUCTURES, {
        filter: (structure) => {
                return structure.structureType == STRUCTURE_EXTENSION 
            }
        });
        
        if(harvesters.length <= 2 ) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester', harvesting:false, filling:false});
            console.log('Spawning new harvester: ' + newName);
        }
        
        else if(extensionCount.length <= 4 && harvesters.length < 3) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'harvester', harvesting:false, filling:false});
            console.log('Spawning new harvester: ' + newName);
        }
        else if(extensionCount.length <= 5  && harvesters.length < 5) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'harvester', harvesting:false, filling:false});
            console.log('Spawning new harvester: ' + newName);
        }  
        else if(extensionCount.length >= 7  && harvesters.length < 5) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'harvester', harvesting:false, filling:false});
            console.log('Spawning new harvester: ' + newName);
        }  
        
    }
}
module.exports = respawnHarvester;