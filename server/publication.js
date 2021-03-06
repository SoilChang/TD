/*publishes all the equipment for the shop to display*/
Meteor.publish('equipments', function() {
	return eqpList.find();
});

// this publishes all the attributes(field) owned by the users. Those information will be used in display
Meteor.publish('userData', function(){
	if(!this.userId)
		return null;
	return Meteor.users.find( {_id : this.userId} );
});

// for leader board
Meteor.publish('ranking', function(){
	return Ranking.find();
});

// for the chat message
Meteor.publish('ChatMessage', function(){
	return ChatMessage.find();
});

// for people to add friends
Meteor.publish('allUserData', function(){
	return Meteor.users.find({},{fields:{username:1, following:1, followers:1, profile:1, attackBonus:1, hpBonus:1, armourBonus:1, statusMessage:1}});
});

Meteor.publish("monstertower", function(){
	return MonsterTower.find();
});

Meteor.publish("systemVariable",function(){
	return SystemVariable.find();
})