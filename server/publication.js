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

Meteor.publish('ranking', function(){
	return Ranking.find();
})