/*subscribe to user data */
Deps.autorun(function(){
  Meteor.subscribe('userData');
  Meteor.subscribe('equipments');
  Meteor.subscribe('ranking');
  Meteor.subscribe('ChatMessage');
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
