const roleHarvester = require('roles_harvester');
const roleEnergyTransporter = require('roles_energy-transporter');
const roleBuilder = require('roles_builder');
const roleUpgrader = require('roles_upgrader');
const roleRepairer = require('roles_repairer');

const roleBarbarian = require('roles_barbarian');
const roleArcher = require('roles_archer');

const structureSpawner = require('structures_spawner');

const creepUtils = require('utils_creep')

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