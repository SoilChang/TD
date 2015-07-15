// render the user data into the template
Template.kingdomTab.helpers({
	'userDataLoad': function(){
		if(Meteor.user() === null || Meteor.loggingIn() === true){
			return [{username:"Log In To See", gem: 0, hpBonus: 0,armourBonus:0,attackBonus:0,allyHp:0,allyArmour:0,allyAttack:0}] ;
		}else{
			/*the reason why i don't use Meteor.user() straight away is because in the 
			html, i use each block. it only accepts an array. only Meteor.users.fin() returns
			an array. */
			return Meteor.users.find({_id:Meteor.user()._id});
		}
	},
	'inventoryItem' : function(type){	
		if(Meteor.user() === null || Meteor.loggingIn() === true){	
			return [{dataNotFound:true}];
		}else{ 
			if(eqpList.find({ type: type , _id:{$in: Meteor.user().inventory}}).count() === 0){
				return [{dataNotFound:true}];
			}else{
				return eqpList.find({ type: type , _id:{$in: Meteor.user().inventory} }, {sort:{price:1} }); 
			}
		}
	},
	
});


// a meteor call to set the status message
Template.kingdomTab.events({
	'click #c-kingdom-status_button': function(e){
		e.preventDefault();
		var currentUserId = Meteor.userId(); //Meteor.userId() returns the current user id from database		
		var inputText = $('input[name=inputText]').val();
		Meteor.call('setStatusMessage' ,inputText, currentUserId)
	},

	'click #sellButton': function(){
		var currentUserId = Meteor.userId();
		var itemCode = this._id;
		var selling = confirm("Are you sure you want to sell this item. You only get 25% refund.");
		if(selling){
			Meteor.call('sellEquipment', itemCode, currentUserId);
		}		
	},

	'click #equipButton': function(){
		var currentUserId = Meteor.userId();
		var itemCode = this._id;
		Meteor.call('equipping',itemCode, currentUserId);
	},

	'mouseenter #c-kingdom-closeButton': function(){
		$('#c-kingdom-closeButton').css({'margin-left': '840px', 'width': '40px', 'height': '40px'});
	},

	'mouseleave #c-kingdom-closeButton': function(){
		$('#c-kingdom-closeButton').css({'margin-left':'845px', 'width': '30px', 'height': '30px'});
	}
});