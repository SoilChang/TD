Meteor.methods({

	/*to set the statusMessage at the kingdom tab*/
	'setStatusMessage':function(inputText,userId){
		Meteor.users.update({_id:userId }, {$set: {statusMessage:inputText}});
	},

	// buying equipment from the shop
	'buyEquipment': function(itemCode,currentUserId){
		var currentUser = Meteor.users.findOne( {_id:currentUserId } );
		var item = eqpList.findOne( {_id:itemCode} );
		console.log(item.price);
		if(currentUser.gem >= item.price ){
			Meteor.users.update( {_id:currentUserId }, {$inc: {gem: -item.price} } );
			Meteor.users.update( {_id:currentUserId } , {$addToSet: {inventory: itemCode} } );
			return true;
		}else{
			return false;
		}
	},

	'sellEquipment': function(itemCode,currentUserId){
		var currentUser = Meteor.users.findOne( {_id:currentUserId } );
		var item = eqpList.findOne( {_id:itemCode} );
		var soldPricr = Math.ceil(item.price/4)
		console.log(item.price);	
		Meteor.users.update( {_id:currentUserId }, {$inc: {gem: soldPricr } } );
		Meteor.users.update( {_id:currentUserId } , {$pull: {inventory: itemCode} } );
		Meteor.users.update( {_id:currentUserId } , {$pull: {equipped: itemCode} } );	
	},

	'equipping': function(itemCode,currentUserId){
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
		Meteor.users.update( {_id:currentUserId}, {$set: {hpBonus: hpPlus, armourBonus:armourPlus, attackBonus:atkPlus }});
	},

	

	
});