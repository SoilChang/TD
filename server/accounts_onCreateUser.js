Accounts.onCreateUser(function(options,user) {
	user.hpBonus = 0;
	user.armourBonus = 0;
	user.attackBonus = 0;
	user.gem = 100;
	user.profilePicture = "/images/gamePage/unknownUser.png";
	user.statusMessage = null;
	user.equipped = [];
	user.inventory = [];
	user.record = [{date:"123", wave: 80}, {date: "456", wave: 80}];
	if (options.profile)
    	user.profile = options.profile;
 	return user;

});

