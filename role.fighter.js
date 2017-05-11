var generalFeatures = require('general.features');

var roleFighter = {

    run: function(creep) {
        
        var hostileTargets = creep.room.find(FIND_HOSTILE_CREEPS);
        
        if (!creep.memory.fighting && hostileTargets.length > 0  ) {
            creep.memory.fighting = true;
            creep.say('⚔️ fight');
        }
        
	    else if(creep.memory.fighting && hostileTargets.length == 0 ) {
            creep.memory.fighting = false;
        }
        else if (creep.memory.fighting) {
            if(creep.attack(hostileTargets[0]) == ERR_NOT_IN_RANGE ) {
                creep.moveTo(hostileTargets[0], {visualizePathStyle: {stroke: '#FF0000'}});
            }
        }
        else if (!creep.memory.fighting) {
            creep.moveTo(Game.flags.collectionPoint);
        }
	}
};

module.exports = roleFighter;