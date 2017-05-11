var respawnBuilder = {

    run: function(RoomName, conLevel) {
        
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log('Builders: ' + builders.length);
        
        var constructionSiteCount = Game.rooms[RoomName].find(FIND_CONSTRUCTION_SITES);
    
        if (constructionSiteCount.length > 0) {
            if (constructionSiteCount.length < 20) {
                if(builders.length < 2 && conLevel < 2) {
                    var newName = Game.spawns['Spawn1'].createCreep([   WORK,
                                                                        CARRY,
                                                                        MOVE],
                                                                        undefined, {role: 'builder', building:true});
                    console.log('Spawning new upgrader: ' + newName);
                }
                
                else if(builders.length < 2 && conLevel <= 5) {
                    var newName = Game.spawns['Spawn1'].createCreep([   WORK,WORK, 
                                                                        CARRY,CARRY,
                                                                        MOVE,MOVE], undefined, {role: 'builder', building:true});
                    console.log('Spawning new builder: ' + newName);
                }
            }
            else if (constructionSiteCount.length > 20) {
                if(builders.length < 3 && conLevel < 2) {
                    var newName = Game.spawns['Spawn1'].createCreep([   WORK,
                                                                        CARRY,
                                                                        MOVE], undefined, {role: 'builder', building:true});
                    console.log('Spawning new upgrader: ' + newName);
                }
                else if(builders.length < 4 && conLevel <= 5) {
                    var newName = Game.spawns['Spawn1'].createCreep([   WORK,WORK,WORK,
                                                                        CARRY,CARRY,CARRY,
                                                                        MOVE,MOVE], undefined, {role: 'builder', building:true});
                    console.log('Spawning new builder: ' + newName);
                }
            }
        }
        
    }
}

module.exports = respawnBuilder;