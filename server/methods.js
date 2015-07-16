Meteor.methods({

	/*to set the statusMessage at the kingdom tab*/
	'setStatusMessage':function(inputText,userId){
		check(inputText,String);
		check(userId,String);


		Meteor.users.update({_id:userId }, {$set: {statusMessage:inputText}});
	},

	// set prizeTime to current date
	"setDate":function(){
		var date = new Date();
		Meteor.users.update({_id:Meteor.userId()},{$set:{prizeTime:date}});
	},

	// give out daily prize
	"givePrize":function(password){
		check(password, String);
		if(password === "adminOnly"){
			Meteor.users.update({_id:Meteor.userId()},{$inc:{gem:1}});
		}
		
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

			// if what they buy is ring, activate the ability
			var enchantedItem = eqpList.find({type: "relic", _id: itemCode}).fetch();
		
			if(enchantedItem){
				var currentUser = Meteor.userId();
		
				if(enchantedItem[0].name === "Leoric's Jewellery"){
					Meteor.users.update({_id: currentUser},{$set:{ability_regen: true}});
				}else if (enchantedItem[0].name === "Undead Bone") {
					Meteor.users.update({_id: currentUser},{$set:{ability_freeze: true}});
				}else if(enchantedItem[0].name === "diamond Eye") {
					Meteor.users.update({_id: currentUser},{$set:{ability_extraGold: true}});
				}else if(enchantedItem[0].name === "Ring Of Darkness"){
					Meteor.users.update({_id: currentUser},{$set:{ability_meteorite: true}});
				}
			}

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


		//when they sell rings, remove their ability
		var enchantedItem = eqpList.find({type: "relic", _id: itemCode}).fetch();
		if(enchantedItem){
			var currentUser = Meteor.userId();
			
			if(enchantedItem[0].name === "Leoric's Jewellery"){
				Meteor.users.update({_id: currentUser},{$set:{ability_regen: false}});
			}else if (enchantedItem[0].name === "Undead Bone") {
				Meteor.users.update({_id: currentUser},{$set:{ability_freeze: false}});
			}else if(enchantedItem[0].name === "diamond Eye") {
				Meteor.users.update({_id: currentUser},{$set:{ability_extraGold: false}});
			}else if(enchantedItem[0].name === "Ring Of Darkness"){
				Meteor.users.update({_id: currentUser},{$set:{ability_meteorite: false}});
			}
		}
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
	    var trueIdentity = Meteor.user().services.facebook.name+" "+Meteor.user().services.facebook.email;

	    Email.send({
	      to: 'im741314@gmail.com',
	      from: feedback.email,
	      subject: feedback.title,
	      text: "True Identity: "+ trueIdentity +"   username:"+ feedback.name +" userId:"+ currentUserId+"   Message Details:"+feedback.title+" " +feedback.comments +" email: "+feedback.email
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
		if(Ranking.find({createdBy: Meteor.userId()}).count === 11){
			var list = Ranking.find({createdBy: Meteor.userId()}, {sort:{score:-1}}).fetch();
			var lowestScore = list[10].score;
			Ranking.remove({createeBy: Meteor.userId(), score: lowestScore});
		} 
	},

	'pushMessage': function(message){
		check(message, Object);
		ChatMessage.insert(message);

		//delete old message, not a clean code. but it works. can be improved.
		var oldestOne = ChatMessage.find({},{skip:200, limit:1, sort:{date:-1}}).fetch();
		if(oldestOne){
			ChatMessage.remove({_id: oldestOne[0]._id});
		}

	},

	"followUser":function(identity){
		check(identity, String);

		Meteor.users.update( {_id:Meteor.userId()} , {$addToSet: {following: identity} } );
		Meteor.users.update({_id:identity}, {$addToSet:{followers:Meteor.userId()}});
	},

	"unfriend":function(identity){
		check(identity, String);

		// delete the ally
		Meteor.users.update({_id: Meteor.userId()}, {$pull:{ally: identity}});

		// unfollow the user
		Meteor.users.update({_id: Meteor.userId()}, {$pull:{following: identity}});
		Meteor.users.update({_id: Meteor.userId()}, {$pull:{followers: identity}});

		// he also unfollows you
		Meteor.users.update({_id:identity}, {$pull: {following:Meteor.userId() }});
		Meteor.users.update({_id:identity}, {$pull: {followers:Meteor.userId() }});

	},

	"unfollowUser":function(identity){
		check(identity, String);

		Meteor.users.update( {_id:Meteor.userId()} , {$pull: {following: identity} } );
		Meteor.users.update( {_id:identity}, {$pull: {followers:Meteor.userId() }});
	},

	"joinAlly":function(identity){
		check(identity, String);
		// pull out the array
		var ally = Meteor.user().ally;

		// check for duplication
		for(var i = 0; i< ally.length; i++){
			if(ally[i] === identity)
				return;
		}

		// incrase bonus
		var object = Meteor.users.find({_id:identity}).fetch();
		var hpPlus = Math.ceil(object[0].hpBonus*0.15);
		var armourPlus = Math.ceil(object[0].armourBonus*0.15);
		var attackPlus = Math.ceil(object[0].attackBonus*0.15);
		Meteor.users.update({_id:Meteor.userId()}, {$inc:{allyHp:hpPlus, allyArmour:armourPlus, allyAttack:attackPlus }});


		// add to set
		ally.push(identity);

		// delete the 4th one if there is any
		if(ally.length === 4){
			
			// remove ally bonus
			object = Meteor.users.find( {_id: ally[0]} ).fetch();
			hpPlus = Math.ceil(object[0].hpBonus*0.15);
			armourPlus = Math.ceil(object[0].armourBonus*0.15);
			attackPlus = Math.ceil(object[0].attackBonus*0.15);
			Meteor.users.update({_id:Meteor.userId()}, {$inc:{allyHp:-hpPlus, allyArmour:-armourPlus, allyAttack:-attackPlus }});

			ally.splice(0,1);
		}
		
		// update
		Meteor.users.update({_id:Meteor.userId()}, {$set:{ally: ally}});
	}
	
});