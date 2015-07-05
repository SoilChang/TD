Accounts.onCreateUser(function(options,user) {
	user.hpBonus = 0;
	user.armourBonus = 0;
	user.attackBonus = 0;
	user.gem = 100;
	user.statusMessage = null;
	user.equipped = [];
	user.inventory = [];
	user.savedGame = false;
	// the next two items are for adding friends
	user.followers =[];
	user.following = [];
	if (options.profile)
    	user.profile = options.profile;
 	return user;

});

