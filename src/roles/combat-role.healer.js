module.exports = {
    run: function(creep){
        const friends = creep.room.find(FIND_MY_CREEPS);
        if(friends.length > 0){
            if(creep.heal(friends[0]) === ERR_NOT_IN_RANGE){
                creep.moveTo(friends[0], { visualizePathStyle: { stroke: '#ffffff' }});
            }
            creep.say("💉")
        } else {
            creep.moveTo(Game.flags["BarbarianRally"]);
        }
    }
};