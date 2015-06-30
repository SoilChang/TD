Template.feedback.events({
	'submit form': function(e) {
		e.preventDefault();
		var feedback = {
			name: $(e.target).find('[name=name]').val(),
			email: $(e.target).find('[name=email]').val(),
			title: $(e.target).find('[name=title]').val(),
			comments: $(e.target).find('[name=comments]').val()
		};


		Meteor.call('sendEmail', feedback, function(err, result){
			if(result){
				alert("Once again, thank you for your feedback.");
				Router.go('gamePage');
			}
		});
		
	}
});