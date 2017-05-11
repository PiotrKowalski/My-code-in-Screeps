var respawnRepairer = {

    run: function(RoomName) {
        
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        console.log('Repairers: ' + repairers.length);
    
        var extensionCount = Game.rooms[RoomName].find(FIND_STRUCTURES, {
        filter: (structure) => {
                return structure.structureType == STRUCTURE_EXTENSION 
            }
        });
        if(extensionCount.length <= 5 && repairers.length < 2) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'repairer', harvesting:false});
            console.log('Spawning new repairer: ' + newName);
        }
        else if(extensionCount.length <= 10 && repairers.length < 2) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'repairer', harvesting:false});
            console.log('Spawning new repairer: ' + newName);
        }
        else if(extensionCount.length <= 20 && repairers.length < 3) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'repairer', harvesting:false});
            console.log('Spawning new repairer: ' + newName);
        }
        else if(repairers.length < 2) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'repairer', harvesting:false});
            console.log('Spawning new repairer: ' + newName);
        }
    }
}

module.exports = respawnRepairer;