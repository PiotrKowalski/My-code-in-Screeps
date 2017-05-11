var respawnHarvester = require('respawn.harvester');
var respawnBigHarvester = require('respawn.bigHarvester');
var respawnUpgrader = require('respawn.upgrader');
var respawnBuilder = require('respawn.builder');
var respawnRepairer = require('respawn.repairer');
var respawnFighter = require('respawn.fighter');
var roleHarvester = require('role.harvester');
var roleBigHarvester = require('role.bigHarvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleFighter = require('role.fighter');
var tower = require('role.tower');


module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory: ', name);
        }
    }
    // console.log( Game.cpu.getUsed() );
    
    for (var RoomName in Game.rooms) {
        conLevel = Game.rooms[RoomName].controller.level;
        
        tower.run(RoomName);
        
        respawnHarvester.run(RoomName);                        // RESPAWN SECTION
        respawnFighter.run(RoomName);
        respawnUpgrader.run(conLevel);
        respawnBuilder.run(RoomName, conLevel);
        respawnRepairer.run(RoomName);
        // respawnBigHarvester.run(RoomName);
        console.log( Game.cpu.getUsed() );
    }
    
    
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        
        creepBeingRenewed = _.filter(Game.creeps, (creep) => creep.memory.creepToRenew == true);
        
        if (creep.ticksToLive >= 1000 || (creep.memory.creepToRenew==true && creep.room.energyAvailable < 50)) {
            creep.memory.creepToRenew = false;
        }
        
        else if ( creepBeingRenewed.length < 2 && creep.room.energyAvailable > 50 && creep.ticksToLive <300 && creep.body.length > 5 ) {
            creep.memory.creepToRenew = true;
        }
        
        else if (!creep.memory.creepToRenew);
            if(creep.memory.role == 'harvester') {              // ROLE SECTION
                roleHarvester.run(creep);
                // console.log( 'Harvester '+ Game.cpu.getUsed() );
            }
            else if(creep.memory.role == 'bigHarvester') {
                roleBigHarvester.run(creep);
                // console.log( 'Harvester '+ Game.cpu.getUsed() );
            }
            else if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
                 console.log( 'upgrader ' + Game.cpu.getUsed() );
            }
            else if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
                // console.log( 'builder ' + Game.cpu.getUsed() );
            }
            else if(creep.memory.role == 'repairer') {
                roleRepairer.run(creep);
                // console.log( 'repairer ' + Game.cpu.getUsed() );
            }
            else if(creep.memory.role == 'fighter') {
                roleFighter.run(creep);
                // console.log( 'fighter ' + Game.cpu.getUsed() );
            }
    
        else if (creep.memory.creepToRenew) {
            if (Game.spawns['Spawn1'].renewCreep(creep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
}

// console.log( Game.cpu.getUsed() );

console.log( 'KONIEC' );
console.log( '-----------------------------------' );

