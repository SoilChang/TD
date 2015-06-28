Template.shopTab.helpers({
	'shopItem' : function(type){	
		if(Meteor.user() === null || Meteor.loggingIn() === true){
			return eqpList.find( {type: type},  {sort:{price:1}}  );
		}else{
			return eqpList.find({ type: type, _id:{$nin:Meteor.user().inventory} },  {sort:{price:1} }  ); //array of objects of eqp
		}
	}, 
			
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

