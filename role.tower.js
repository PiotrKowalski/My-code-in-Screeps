var tower = {
    
    run: function(roomName) {
        
        var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
        
        var closestDamagedStructure = Game.rooms[roomName].find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART) && structure.hits < 40000 
                    }
            });
            
        var towers = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                        return structure.structureType == STRUCTURE_TOWER
                    }
            });
            
        if (hostiles.length > 0) {
            towers.forEach(tower => tower.attack(hostiles[0]), console.log(tower.structureType));
        }
        
        else if (closestDamagedStructure) {
            towers.forEach(tower => tower.repair(closestDamagedStructure[0]));
            
        }
        
    }
    
};



module.exports = tower;