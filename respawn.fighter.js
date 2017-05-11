var respawnFighter = {

    run: function(RoomName) {
        
        var fighters = _.filter(Game.creeps, (creep) => creep.memory.role == 'fighter');
        console.log('Fighters: ' + fighters.length);
        
        var extensionCount = Game.rooms[RoomName].find(FIND_STRUCTURES, {
        filter: (structure) => {
                return structure.structureType == STRUCTURE_EXTENSION 
            }
        });
        
        if(extensionCount.length == 0 && fighters.length < 1) {
            var newName = Game.spawns['Spawn1'].createCreep([ATTACK,ATTACK,MOVE], undefined, {role: 'fighter', fighting:false});
            console.log('Spawning new fighter: ' + newName);
        }
        
        else if(extensionCount.length >= 2 && fighters.length < 2) {
            var newName = Game.spawns['Spawn1'].createCreep([ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE], undefined, {role: 'fighter', fighting:false});
            console.log('Spawning new fighter: ' + newName);
        }
        
    }
}
module.exports = respawnFighter;