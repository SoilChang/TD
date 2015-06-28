Template.individual_Item_inventory.helpers({
	checkIfequipped: function(){
		var currentItem = this._id;
		var list = Meteor.user().equipped;
		console.log(list);
		for(var i=0; i< list.length; i++){
			if(currentItem === list[i]){
				return 'greenTick';
			}
		}
		return;
	} 
});
