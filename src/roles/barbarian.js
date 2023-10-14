module.exports = {
    run: function(creep){
        var enemies = creep.room.find(FIND_HOSTILE_CREEPS);
        if(enemies.length > 0){
            if(creep.attack(enemies[0]) === ERR_NOT_IN_RANGE){
                creep.moveTo(enemies[0], { visualizePathStyle: { stroke: '#ffffff' }});
            };
            creep.say("⚔️")
        } else {
            creep.moveTo(Game.flags["BarbarianRally"]);
        }
    }
};