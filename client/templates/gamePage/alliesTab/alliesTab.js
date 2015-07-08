Template.alliesTab.onRendered(function(){
	$("#scrollLeftOpen").hide();
	$("#scrollRightFold").click(function(){
		$("#scrollRightFold").animate({marginLeft:"50px"},1000, function(){
			$("#scrollRightFold").hide();
			$("#scrollLeftOpen").show();
		});
		
		$("#scrollRight").animate({marginLeft:"50px"},1000);
		$("#scrollPaper").animate({width:'60px'},1000);
		
	});
	$("#scrollLeftOpen").click(function(){
		$("#scrollRight").animate({marginLeft:"820px"},1000,function(){
			$("#scrollRightFold").css({'margin-left':'820px'});
			$("#scrollRightFold").show();
			$("#scrollLeftOpen").hide();
		});
		$("#scrollPaper").animate({width:'830px'},1000);		
	});

	$("#followingPanel").click(function(){
		$("#followingBox").show();
		$("#followerBox").hide();
		$("#friendBox").hide();
	});
	$("#followerPanel").click(function(){
		$("#followingBox").hide();
		$("#followerBox").show();
		$("#friendBox").hide();
	});


	$("#seeFriend").hover(function(){
		$("#seeFriend").css({"cursor":"pointer"});
		$("#seeFriend").click(function(){
			$("#followingBox").hide();
			$("#followerBox").hide();
			$("#friendBox").show();
		});
	},
	function(){
		// set nothing here
	});
	
	
});


Template.alliesTab.events({
	'mouseenter #c-Allies-closeButton': function(){
		$('#c-Allies-closeButton').css({'margin-left': '840px', 'width': '40px', 'height': '40px'});
	},

	'mouseleave #c-Allies-closeButton': function(){
		$('#c-Allies-closeButton').css({'margin-left':'845px', 'width': '30px', 'height': '30px'});
	},


	'submit form': function(e) {
		e.preventDefault();

		// if the user ain't logged in,he ain't allowed to post message
		if(Meteor.user() === null || Meteor.loggingIn === true){
			alert("Log In to Chat");
			return;
		}

		// reading text from the form
		var message = {
			content: $(e.target).find('[name=message]').val()
		};

		// clear the field for further input
		$(e.target).find('[name=message]').val("");

		// if there is nothing in the message, we will close the function call
		if(message.content === ""){
			return;
		}

		// insert in the nessary fields
		var userName =Meteor.user().username ? Meteor.user().username : Meteor.user().profile.name;
		
		_.extend(message, { sentBy:userName, date:new Date()});

		Meteor.call('pushMessage',message);
	},

	'click #followUser':function(){
		if(Meteor.user() === null || Meteor.loggingIn === true){
			alert("Log In to unfollow other users");
			return;
		}
		Meteor.call("followUser",this._id);
	},

	"click #unfollowUser":function(){
		if(Meteor.user() === null || Meteor.loggingIn === true){
			alert("Log In to follow other users");
			return;
		}
		Meteor.call("unfollowUser",this._id);
	},

	
})



Template.alliesTab.helpers({
	loadMessage: function(){
		return ChatMessage.find({},{sort: {date:-1}, limit:20});
	},

	findAllUser:function(){
		return Meteor.users.find({_id:{$not:Meteor.userId()}});
	},

	findFollowing:function(){
		if(Meteor.user() === null || Meteor.loggingIn === true){
			return;
		}else{
			return Meteor.users.find({_id:{$in:Meteor.user().following, $nin:Meteor.user().followers}});
		}
	},

	findFollowers:function(){
		if(Meteor.user() === null || Meteor.loggingIn === true){
			return;
		}else{
			return Meteor.users.find({_id:{$in:Meteor.user().followers,$nin:Meteor.user().following}});
		}
	},

	loadFriends:function(){
		if(Meteor.user() === null || Meteor.loggingIn === true){
			return;
		}else{
			return Meteor.users.find({_id:{$in:Meteor.user().followers, $in:Meteor.user().following}});
		}
	}


});