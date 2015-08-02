
// render the user data into the template
Template.kingdomTab.helpers({
	'userDataLoad': function(){
		if(Meteor.user() === null || Meteor.loggingIn() === true){
			return [{username:"Log In To See", gem: 0, hpBonus: 0,armourBonus:0,attackBonus:0,allyHp:0,allyArmour:0,allyAttack:0}] ;
		}else{
			/*the reason why i don't use Meteor.user() straight away is because in the 
			html, i use each block. it only accepts an array. only Meteor.users.find() returns
			an array. */
			return Meteor.users.find({_id:Meteor.userId()});
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

	"loadProfilePic":function(){
		var currentUserId = Meteor.userId();
		var user= Meteor.users.findOne(currentUserId);
		if (user.services.facebook){
	            return "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
		}
	    else{
	        return "/images/gamePage/user_unknown.png";
	    }
	}
	
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

Template.kingdomTab.onRendered(function(){
	$('#c-kingdom-button_group-Helmets').click(function(){
		$('#c-kingdom-item_display-Helmets').show();
		$('#c-kingdom-item_display-Chest_Plates').hide();
		$('#c-kingdom-item_display-Legs').hide();
		$('#c-kingdom-item_display-Arms').hide();
		$('#c-kingdom-item_display-Weapons').hide();
		$('#c-kingdom-item_display-Mystical_Relic').hide();
	});

	// when click on chest plate, show chest plate tab and hide the rest
	$('#c-kingdom-button_group-Chest_Plates').click(function(){
		$('#c-kingdom-item_display-Helmets').hide();
		$('#c-kingdom-item_display-Chest_Plates').show();
		$('#c-kingdom-item_display-Legs').hide();
		$('#c-kingdom-item_display-Arms').hide();
		$('#c-kingdom-item_display-Weapons').hide();
		$('#c-kingdom-item_display-Mystical_Relic').hide();
	});

	// when click on legs, show legs tab and hide the rest
	$('#c-kingdom-button_group-Legs').click(function(){
		$('#c-kingdom-item_display-Helmets').hide();
		$('#c-kingdom-item_display-Chest_Plates').hide();
		$('#c-kingdom-item_display-Legs').show();
		$('#c-kingdom-item_display-Arms').hide();
		$('#c-kingdom-item_display-Weapons').hide();
		$('#c-kingdom-item_display-Mystical_Relic').hide();
	});

	// when click on arms, show arms tab and hide the rest
	$('#c-kingdom-button_group-Arms').click(function(){
		$('#c-kingdom-item_display-Helmets').hide();
		$('#c-kingdom-item_display-Chest_Plates').hide();
		$('#c-kingdom-item_display-Legs').hide();
		$('#c-kingdom-item_display-Arms').show();
		$('#c-kingdom-item_display-Weapons').hide();
		$('#c-kingdom-item_display-Mystical_Relic').hide();
	});

	// when click on weapon, show weapon tab and hide the rest
	$('#c-kingdom-button_group-Weapons').click(function(){
		$('#c-kingdom-item_display-Helmets').hide();
		$('#c-kingdom-item_display-Chest_Plates').hide();
		$('#c-kingdom-item_display-Legs').hide();
		$('#c-kingdom-item_display-Arms').hide();
		$('#c-kingdom-item_display-Weapons').show();
		$('#c-kingdom-item_display-Mystical_Relic').hide();
	});

	// when click on mystical chest, show mystical chest tab and hide the rest
	$('#c-kingdom-button_group-Mystical_Relic').click(function(){
		$('#c-kingdom-item_display-Helmets').hide();
		$('#c-kingdom-item_display-Chest_Plates').hide();
		$('#c-kingdom-item_display-Legs').hide();
		$('#c-kingdom-item_display-Arms').hide();
		$('#c-kingdom-item_display-Weapons').hide();
		$('#c-kingdom-item_display-Mystical_Relic').show();
	});
});