/*subscribe to user data */
Meteor.subscribe('userData');
Meteor.subscribe('equipments');
Meteor.subscribe('ranking');
Meteor.subscribe('ChatMessage');
Meteor.subscribe('allUserData');

// im not sure what the undeprecated version of this code is. onRendered doesn't work
Template.gamePage.onRendered(function() {

// display facebook social plug in with reactive parsing
    try {
        FB.XFBML.parse();
    }catch(e) {};


// detect if daily prize should be given out
    if(Meteor.user() !== null && Meteor.loggingIn() !== true){
    	var prizeTime = Meteor.user().prizeTime;

    	// if first time user, we set a date
    	if(prizeTime === 0 || prizeTime === undefined){
    		Meteor.call("setDate");
    		console.log("set date occurs");
    	}else{

    		console.log("check date occurs");
    		var currentDate = new Date();

    		if(currentDate.getDate() !== prizeTime.getDate() || currentDate.getMonth() !== prizeTime.getMonth() || currentDate.getFullYear() !== prizeTime.getFullYear()){
				// animaition to give prize
				console.log("giving prize occurs");
			    $("#treasureChest").css({"display":"block", "margin-top":"400px", "height":"50px", "margin-left":"400px"});
				$("#treasureChest").animate({marginTop:"100px", height:"300px",marginLeft:"300px"},3000,function(){
					$("#prizeBanner").css({"width":"0px","margin-left":"400px","display":"block"});
					$("#prizeBanner").animate({width:"600px", marginLeft:"130px"},500);

					/*this method call is a major security loophole. since anyone can call this function in the console and add gems. However, this isn't the only problem. since they can also change their computer date manually to get gems as well.*/
					Meteor.call("givePrize", "adminOnly");
					$("#treasureChest").fadeOut(2000);
					$("#prizeBanner").fadeOut(3000);
					Meteor.call("setDate");
				});
    		}
    	}	
    }
    
	
});


Template.registerHelper('updateUserStats', function(){
	if(Meteor.user() !== null && Meteor.loggingIn() === false){
		var currentUserId = Meteor.userId();
		var eqp = eqpList.find( {_id:{$in:Meteor.user().equipped}}).fetch();
		var hpPlus = 0;
		var armourPlus = 0;
		var atkPlus = 0;
		for(var i=0; i< eqp.length; i++){
			hpPlus += eqp[i].hpBonus;
			armourPlus += eqp[i].armourBonus;
			atkPlus += eqp[i].attackBonus;
		}
		Meteor.call('updateUserstat' ,hpPlus, armourPlus, atkPlus, currentUserId);
	}
});


Template.gamePage.events({
	'click #audio': function() {
		BGsound.toggleMute()

		document.getElementById('audio').src = (BGsound.isMuted())?
		"/images/gamePage/musicOff.png"	: "/images/gamePage/musicOn.png"
	}
});
