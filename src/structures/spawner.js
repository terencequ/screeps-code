const creepUtils = require('utils_creep')

const spawnQuota = {
    harvesters: 1,
    energyTransporters: 0,
    builders: 2,
    upgraders: 2,
    repairers: 1,
    barbarians: 0
}

const sourceQuota = {
    0: 0,
    1: 1
}

// Creep blueprints
const gruntBlueprint = {
    body: [WORK, MOVE, CARRY],
    memory: {}
}

const barbarianBlueprint = {
    body: [TOUGH, ATTACK, MOVE],
    memory: {}
}

// Get the amount of screeps for a certain role
const getScreepCount = function(role){
    var count = 0
    for(const name in Game.creeps) {
        const creep = Game.creeps[name]
        if(creep.memory.role === role) {
            count++
        }
    }
    return count
}

/**
 * Method to check cost and spawn screep
 * @param {*} spawn
 * @param {*} screepBlueprint
 */

const trySpawnCreep = function(spawn, screepBlueprint){
    // console.log("Spawning "+screepBlueprint.memory.role)
    spawn.spawnCreep(screepBlueprint.body, creepUtils.generateCreepName(), {memory: screepBlueprint.memory})
}

/**
 * Obtain the amount of harvesters assigned to a source.
 * @param {*} index 
 */
const getHarvesterCountForSource = function(index){
    let count = 0;
    
    for(const name in Game.creeps){
        if(Game.creeps[name].memory['source'] === index){
            count++;
        }
    }

    return count;
}

module.exports = {
    run: function(spawn){
        var harvesters = getScreepCount("harvester")
        var energyTransporters = getScreepCount("energyTransporter")
        var builders = getScreepCount("builder")
        var upgraders = getScreepCount("upgrader")
        var repairers = getScreepCount("repairer")
        var barbarians = getScreepCount("barbarian")
        
        // Spawn harvester
        if(harvesters < spawnQuota.harvesters){
            let blueprint = gruntBlueprint;
            blueprint.memory.role = "harvester"
            
            // Assign a source to this harvester (try to meet the defined quotas)
            let sources = Object.keys(sourceQuota);
            for(let i = 0; i < sources.length; i++){
                const sourceId = sources[i];
                if(getHarvesterCountForSource(sourceId) < sourceQuota[sourceId]){
                    blueprint.memory.source = sourceId;
                    break;
                }
            }
            
            trySpawnCreep(spawn, blueprint);
        }

        // Spawn energy transporter
        if(energyTransporters < spawnQuota.energyTransporters){
            let blueprint = gruntBlueprint;
            blueprint.memory.role = "energyTransporter"
            trySpawnCreep(spawn, blueprint);
        } 
        // Spawn builder
        else if(builders < spawnQuota.builders){
            let blueprint = gruntBlueprint;
            blueprint.memory.role = "builder"
            trySpawnCreep(spawn, blueprint);
        }
        // Spawn upgrader
        else if(upgraders < spawnQuota.upgraders){
            let blueprint = gruntBlueprint;
            blueprint.memory.role = "upgrader"
            trySpawnCreep(spawn, blueprint);
        } 
        // Spawn repairer
        else if(repairers < spawnQuota.repairers){
            let blueprint = gruntBlueprint;
            blueprint.memory.role = "repairer"
            trySpawnCreep(spawn, blueprint);
        }
        // Spawn barbarian
        else if(barbarians < spawnQuota.barbarians){
            let blueprint = barbarianBlueprint;
            blueprint.memory.role = "barbarian"
            trySpawnCreep(spawn, blueprint);
        }
        
    }
};