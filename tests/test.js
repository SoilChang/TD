describe("when 'setStatusMessage' function is called",function(){
  it("should set the user's statusMessage to the text input",function(){
    var currentUserId = Meteor.userId();
    Meteor.call("setStatusMessage", "Hello World" ,currentUserId);

    var message = Meteor.user().statusMessage;

    expect(message).toEqual("Hello World");
  });
});