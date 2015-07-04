Meteor.methods({

	/*to set the statusMessage at the kingdom tab*/
	'setStatusMessage':function(inputText,userId){
		check(inputText,String);
		check(userId,String);


		Meteor.users.update({_id:userId }, {$set: {statusMessage:inputText}});
	},

	// buying equipment from the shop
	'buyEquipment': function(itemCode,currentUserId){
		check(itemCode,String);
		check(currentUserId,String);

		var currentUser = Meteor.users.findOne( {_id:currentUserId } );
		var item = eqpList.findOne( {_id:itemCode} );
		if(currentUser.gem >= item.price ){
			Meteor.users.update( {_id:currentUserId }, {$inc: {gem: -item.price} } );
			Meteor.users.update( {_id:currentUserId } , {$addToSet: {inventory: itemCode} } );
			return true;
		}else{
			return false;
		}
	},

	'sellEquipment': function(itemCode,currentUserId){
		check(itemCode,String);
		check(currentUserId,String);

		var currentUser = Meteor.users.findOne( {_id:currentUserId } );
		var item = eqpList.findOne( {_id:itemCode} );
		var soldPricr = Math.ceil(item.price/4)
		Meteor.users.update( {_id:currentUserId }, {$inc: {gem: soldPricr } } );
		Meteor.users.update( {_id:currentUserId } , {$pull: {inventory: itemCode} } );
		Meteor.users.update( {_id:currentUserId } , {$pull: {equipped: itemCode} } );	
	},

	'equipping': function(itemCode,currentUserId){
		check(itemCode,String);
		check(currentUserId,String);

		var currentUser = Meteor.users.findOne( {_id:currentUserId } );
		var item = eqpList.findOne( {_id:itemCode} );
		// pull out equipment of the same type
		var existing = eqpList.find( {type: item.type , _id:{$in: Meteor.user().equipped} } ).fetch();
		// if we found existing equipment of the same type
		if(existing.length>0){
			// we pull it out 
			Meteor.users.update( {_id:currentUserId,  } , {$pull: {equipped: existing[0]._id} } );
		}
		// console.log(" adding "+ itemCode+ "to equipped list");
		//  add the new equipment
		Meteor.users.update( {_id:currentUserId } , {$addToSet: {equipped: itemCode} } );
	},

	// update user's hp, armour and atk bonus to database according to the eqp obtained. 
	'updateUserstat': function(hpPlus,armourPlus,atkPlus,currentUserId){
		check(hpPlus, Number);
		check(armourPlus, Number);
		check(atkPlus, Number);
		check(currentUserId, String);
		Meteor.users.update( {_id:currentUserId}, {$set: {hpBonus: hpPlus, armourBonus:armourPlus, attackBonus:atkPlus }});
	},
	'sendEmail': function (feedback) {
		var currentUserId = Meteor.userId();
		check(feedback,{
			name: String,
			email:String,
			title:String,
			comments:String
		});

	    /*  Let other method calls from the same client start running,
	     without waiting for the email sending to complete.*/
	    this.unblock();

	    Email.send({
	      to: 'im741314@gmail.com',
	      from: feedback.email,
	      subject: feedback.title,
	      text: "name="+ feedback.name+" userId="+currentUserId+" comments"+feedback.comments
    	});

    	return true;
 	},

 	//save current game state
	'saveGame': function(currentGame,currentUserId) {
		check(currentGame, Object);
		check(currentUserId, String);
		Meteor.users.update( {_id:currentUserId}, {$set: {savedGame: currentGame }});
	},

	//set savedGame to false
	'gameOver': function(currentUserId) {
		check(currentUserId, String);
		Meteor.users.update( {_id:currentUserId}, {$set: {savedGame: false }});
	},

	// push data into ranking database
	'pushRanking': function(record){
		check(record, Object);

		// inserting latest record
		Ranking.insert(record);

		// pull out the worse record after comparing
		if(Ranking.find({createdBy: Metoer.userId()}).count === 11){
			Ranking.find({createdBy: Meteor.userId()}, {sort:{score:-1}}).fetch();
			var lowestScore = list[9].score;
			Ranking.remove({createeBy: Metoer.userId(), score: lowestScore});
		} 
	},

	'pushMessage': function(message){
		check(message, Object);
		ChatMessage.insert(message);

		//delet old message
	
	},
	
});