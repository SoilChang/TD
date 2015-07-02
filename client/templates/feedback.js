Template.feedback.onCreated(function() {
	Session.set('commentSubmitErrors', {});
});


Template.feedback.events({
	'submit form': function(e) {

		// reading text from the form
		e.preventDefault();
		var feedback = {
			name: $(e.target).find('[name=name]').val(),
			email: $(e.target).find('[name=email]').val(),
			title: $(e.target).find('[name=title]').val(),
			comments: $(e.target).find('[name=comments]').val()
		};

		var errors = validatePost(feedback);
		if (errors.title || errors.name || errors.email || errors.comments)
			return Session.set('commentSubmitErrors', errors);
		

		Meteor.call('sendEmail', feedback, function(err, result){
			if(err)
				return alert(err.reason);

			if(result){
				alert("Once again, thank you for your feedback.");
				Router.go('gamePage');
			}
		});
		
	}
});


Template.feedback.helpers({
	errorMessage: function(field) {
		return Session.get('commentSubmitErrors')[field];
	},
	errorClass: function (field) {
		return !!Session.get('commentSubmitErrors')[field] ? 'has-error' : '';
	}
});


// check for missing field
validatePost = function (post) {
	var errors = {};
	if(!post.name){
		errors.name = "Please let us know how to address you";
	}
	if(!post.email){
		errors.email = "Please let us know how to reply to you";
	}
	if(!post.title){
		errors.title = "Please let us know what this is about";
	}
	if(!post.comments){
		errors.comments = "You forgot to type something";
	}
	return errors;
}

