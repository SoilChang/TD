Accounts.onCreateUser(function(options,user) {
	user.hpBonus = 0;
	user.allyHp = 0;

	user.armourBonus = 0;
	user.allyArmour = 0;

	user.attackBonus = 0;
	user.allyAttack = 0;

	user.gem = 100;
	user.statusMessage = null;
	user.equipped = [];
	user.inventory = [];
	user.savedGame = false;
	// the next two items are for adding friends
	user.followers =[];
	user.following = [];
	user.ally = [];
	user.prizeTime = 0;
	if (options.profile)
    	user.profile = options.profile;
 	return user;

});

