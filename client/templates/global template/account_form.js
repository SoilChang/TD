Template.signupForm.events({
  "submit #signup-form": function(event, template) {
    event.preventDefault();
    Accounts.createUser({
      profile: {
        name: template.find("#signUp_name").value
        // Other required field values can go here
      },
      password: template.find("#signUp_password").value,
      email: template.find("#signUp_email").value,
    }, function(error) {
      if (error) {
        // Display the user creation error to the user however you want
      }
    });
  }
});

Template.loginForm.events({
  "submit #login-form": function(event, template) {
    event.preventDefault();
    Meteor.loginWithPassword(
      template.find("#sign_name").value,
      template.find("#logIn_password").value,
      function(error) {
        if (error) {
          // Display the login error to the user however you want
        }
      }
    );

    return false;
  }
});

Template.logoutForm.events({
  "submit #logout-form": function(event, template) {
    event.preventDefault();
    Meteor.logout(function(error) {
      if (error) {
        // Display the logout error to the user however you want
      }
    });
  }
});