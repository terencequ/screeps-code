const roleHarvester = require('src/roles/role.harvester');
const roleEnergyTransporter = require('src/roles/role.energy-transporter');
const roleBuilder = require('src/roles/role.builder');
const roleUpgrader = require('src/roles/role.upgrader');
const roleRepairer = require('src/roles/role.repairer');

const roleBarbarian = require('src/roles/combat-role.barbarian');
const roleArcher = require('src/roles/combat-role.archer');

const structureSpawner = require('src/structures/structure.spawner');

const creepUtils = require('src/utils/utils.creep')

module.exports.loop = function () {
    // Clean dead creeps from memory
    for(const i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
    
    // Loop for creeps
    for(const name in Game.creeps) {
        const creep = Game.creeps[name];
        if(creep.memory['role'] === 'barbarian'){
            roleBarbarian.run(creep);
        } else if(creep.memory['role'] === 'archer'){
            roleArcher.run(creep);
        } else if(creep.memory['role'] === 'harvester') {
            roleHarvester.run(creep);
        } else if(creep.memory['role'] === 'energyTransporter' || !creepUtils.areSpawnsFullForRoom(creep.room)){
            roleEnergyTransporter.run(creep)
        } else if(creep.memory['role'] === 'builder'){
            roleBuilder.run(creep);
        } else if(creep.memory['role'] === 'upgrader'){
            roleUpgrader.run(creep);
        } else if(creep.memory['role'] === 'repairer'){
            roleRepairer.run(creep);
        }
    }
    
    // Loop for spawns
    for(const name in Game.spawns){
        const spawn = Game.spawns[name];
        structureSpawner.run(spawn);
    }
}