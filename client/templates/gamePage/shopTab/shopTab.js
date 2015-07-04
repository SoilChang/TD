Template.shopTab.onRendered(function(){
	$('#c-shop-item_display-Helmets').hide();
	$('#c-shop-item_display-Chest_Plates').hide();
	$('#c-shop-item_display-Legs').hide();
	$('#c-shop-item_display-Arms').hide();
	$('#c-shop-item_display-Weapons').hide();
	$('#c-shop-item_display-Mystical_Relic').hide();

	// when click on helmet, show helmet tab and hide the rest
	$('#c-shop-button_group-Helmets').click(function(){
		$('#c-shop-item_display-Helmets').show();
		$('#c-shop-item_display-Chest_Plates').hide();
		$('#c-shop-item_display-Legs').hide();
		$('#c-shop-item_display-Arms').hide();
		$('#c-shop-item_display-Weapons').hide();
		$('#c-shop-item_display-Mystical_Relic').hide();
	});

	// when click on chest plate, show chest plate tab and hide the rest
	$('#c-shop-button_group-Chest_Plates').click(function(){
		$('#c-shop-item_display-Helmets').hide();
		$('#c-shop-item_display-Chest_Plates').show();
		$('#c-shop-item_display-Legs').hide();
		$('#c-shop-item_display-Arms').hide();
		$('#c-shop-item_display-Weapons').hide();
		$('#c-shop-item_display-Mystical_Relic').hide();
	});

	// when click on legs, show legs tab and hide the rest
	$('#c-shop-button_group-Legs').click(function(){
		$('#c-shop-item_display-Helmets').hide();
		$('#c-shop-item_display-Chest_Plates').hide();
		$('#c-shop-item_display-Legs').show();
		$('#c-shop-item_display-Arms').hide();
		$('#c-shop-item_display-Weapons').hide();
		$('#c-shop-item_display-Mystical_Relic').hide();
	});

	// when click on arms, show arms tab and hide the rest
	$('#c-shop-button_group-Arms').click(function(){
		$('#c-shop-item_display-Helmets').hide();
		$('#c-shop-item_display-Chest_Plates').hide();
		$('#c-shop-item_display-Legs').hide();
		$('#c-shop-item_display-Arms').show();
		$('#c-shop-item_display-Weapons').hide();
		$('#c-shop-item_display-Mystical_Relic').hide();
	});

	// when click on weapon, show weapon tab and hide the rest
	$('#c-shop-button_group-Weapons').click(function(){
		$('#c-shop-item_display-Helmets').hide();
		$('#c-shop-item_display-Chest_Plates').hide();
		$('#c-shop-item_display-Legs').hide();
		$('#c-shop-item_display-Arms').hide();
		$('#c-shop-item_display-Weapons').show();
		$('#c-shop-item_display-Mystical_Relic').hide();
	});

	// when click on mystical chest, show mystical chest tab and hide the rest
	$('#c-shop-button_group-Mystical_Relic').click(function(){
		$('#c-shop-item_display-Helmets').hide();
		$('#c-shop-item_display-Chest_Plates').hide();
		$('#c-shop-item_display-Legs').hide();
		$('#c-shop-item_display-Arms').hide();
		$('#c-shop-item_display-Weapons').hide();
		$('#c-shop-item_display-Mystical_Relic').show();
	});
});


Template.shopTab.helpers({
	'shopItem' : function(type){	
		if(Meteor.user() === null || Meteor.loggingIn() === true){
			return eqpList.find( {type: type},  {sort:{price:1}}  );
		}else{
			return eqpList.find({ type: type, _id:{$nin:Meteor.user().inventory} },  {sort:{price:1} }  ); //array of objects of eqp
		}
	},

	'gemStoneCount': function(){
		if(Meteor.user() === null || Meteor.loggingIn() === true){
			return 0;
		}else{
			return Meteor.user().gem;
		}
	} 
			
});

// respond to buy event
Template.shopTab.events({
	'click #buyButton': function(){
		if(Meteor.user() === null){
				alert('Log in to buy items!!');
			}else{
				
				if(confirm("Are you sure you want to purchase this item?")){
					var currentUserId = Meteor.userId();
					var itemCode = this._id;
			
					/* function(err,enough) is to check if the use has enough gem. I copy this code from online
					hence i don't know exactly why it works. but when i return 'true' on the method on server
					the true will somehow appear in the 'enough' variable*/
					Meteor.call('buyEquipment', itemCode, currentUserId, function(err, enough){
						if(!enough){
							alert("Not enough gems!!");
						}
					});
				}
			}
	},

	'mouseenter #c-shop-closeButton': function(){
		$('#c-shop-closeButton').css({'margin-left': '840px', 'width': '40px', 'height': '40px'});
	},

	'mouseleave #c-shop-closeButton': function(){
		$('#c-shop-closeButton').css({'margin-left':'845px', 'width': '30px', 'height': '30px'});
	}
});

