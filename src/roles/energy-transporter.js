const roleUtils = require('utils_role')

/**
 * A harvester's job is to harvest resources, and deposit them in containers.
 */
const energyTransporter = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity() > 0) {
            // Withdrawing
            if(!roleUtils.withdrawEnergyFromContainer(creep)){
                roleUtils.harvestSource(creep);
            }
        } else {
            // Depositing
            // Obtain list of targets for depositing
            roleUtils.rechargeBuilding(creep);
        }
    }
};

module.exports = energyTransporter;