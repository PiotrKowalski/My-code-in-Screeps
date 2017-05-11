var respawnUpgrader = {

    run: function(conLevel) {
        
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('Upgraders: ' + upgraders.length);
    
        
        
        if(upgraders.length == 0 && conLevel < 5) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader', upgrading:true});
            console.log('Spawning new upgrader: ' + newName);
        }
        
        else if(upgraders.length < 2 && conLevel < 5) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader', upgrading:true});
            console.log('Spawning new upgrader: ' + newName);
        }
        
        
        else if(upgraders.length < 6 && conLevel < 8) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader', upgrading:true});
            console.log('Spawning new upgrader: ' + newName);
        }
        
        else if(upgraders.length < 1 && conLevel == 8) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader', upgrading:true});
            console.log('Spawning new upgrader: ' + newName);
        }
    }
}
module.exports = respawnUpgrader;