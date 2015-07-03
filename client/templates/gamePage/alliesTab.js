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
		var userName;
		if(Meteor.user().username !== null){
			userName = Meteor.user().username;
		}else{
			userName = Meteor.user().profile.name;
		}

		_.extend(message, { sentBy:userName, date:new Date()});

		Meteor.call('pushMessage',message);
	},
})

Template.alliesTab.helpers({
	loadMessage: function(){
		return ChatMessage.find({},{sort: {date:-1}, limit:20});
	}
});