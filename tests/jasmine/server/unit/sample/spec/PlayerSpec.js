/* globals Player: false, Song: false */

describe('Player', function() {
  var player;
  var song;

  beforeEach(function() {
    player = new Player();
    song = new Song();
  });

  it('should be able to play a Song', function() {
    player.play(song);
    expect(player.currentlyPlayingSong).toEqual(song);

    //demonstrates use of custom matcher
    expect(player).toBePlaying(song);
  });

  describe('when song has been paused', function() {
    beforeEach(function() {
      player.play(song);
      player.pause();
    });

    it('should indicate that the song is currently paused', function() {
      expect(player.isPlaying).toBeFalsy();

      // demonstrates use of 'not' with a custom matcher
      expect(player).not.toBePlaying(song);
    });

    it('should be possible to resume', function() {
      player.resume();
      expect(player.isPlaying).toBeTruthy();
      expect(player.currentlyPlayingSong).toEqual(song);
    });
  });

  // demonstrates use of spies to intercept and test method calls
  it('tells the current song if the user has made it a favorite', function() {
    spyOn(song, 'persistFavoriteStatus');

    player.play(song);
    player.makeFavorite();

    expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  });
});


describe("When 'setDate' method is called", function(){
  it("should set the 'prizeDate' to the current date. If the user isn't logged in, this function should not be called.", function(){
    if(Meteor.user() === null || Meteor.loggingIn() === true){
      expect(Meteor.user()).toEqual(null);
      expect(Meteor.loggingIn()).toEqual(true);
    }else{
      Meteor.call("setDate");
      var prizeDate = Meteor.user().prizeDate;

      expect(moment(prizeDate).format('DD/MM/YYYY')).toEqual(moment(new Date()).format('DD/MM/YYYY'))
    }
    
  });

});

// describe("when 'setStatusMessage' function is called",function(){
//   it("should set the user's statusMessage to the text input",function(){
//     var currentUserId = Meteor.userId();
//     Meteor.call("setStatusMessage", "Hello World" ,currentUserId);

//     var message = Meteor.user().statusMessage;

//     expect(message).toEqual("Hello World");
//   });
// });