Accounts.onCreateUser(function(options,user) {
	user.hpBonus = 0;
	user.armourBonus = 0;
	user.attackBonus = 0;
	user.gem = 100;
	user.statusMessage = null;
	user.equipped = [];
	user.inventory = [];
	user.savedGame = {};
	user.record = [{date: "123", score:80, wave:20}];
	if (options.profile)
    	user.profile = options.profile;
 	return user;

});

