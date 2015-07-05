/*subscribe to user data */
Meteor.subscribe('userData');
Meteor.subscribe('equipments');
Meteor.subscribe('ranking');
Meteor.subscribe('ChatMessage');
Meteor.subscribe('allUserData');

// im not sure what the undeprecated version of this code is. onRendered doesn't work
Template.gamePage.onRendered(function() {
    try {
        FB.XFBML.parse();
    }catch(e) {}   
});


Template.registerHelper('updateUserStats', function(){
	if(Meteor.user() !== null && Meteor.loggingIn() === false){
		var currentUserId = Meteor.userId();
		var eqp = eqpList.find( {_id:{$in:Meteor.user().equipped}}).fetch();
		var hpPlus = 0;
		var armourPlus = 0;
		var atkPlus = 0;
		for(var i=0; i< eqp.length; i++){
			hpPlus += eqp[i].hpBonus;
			armourPlus += eqp[i].armourBonus;
			atkPlus += eqp[i].attackBonus;
		}
		Meteor.call('updateUserstat' ,hpPlus, armourPlus, atkPlus, currentUserId);
	}
});

Template.gamePage.helpers({
	'loadProfilePicture': function(){
		if(Meteor.user() === null || Meteor.loggingIn() === true){
			return; 
		}else{
			return Meteor.user().profilePicture;
		}
	},
});
