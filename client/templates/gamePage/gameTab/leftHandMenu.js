Template.leftHandMenu.event({
	'click #pauseBtn': function() {
		togglePause();
	}
});
/*left hand menu bar animation*/
Template.leftHandMenu.onRendered(function(){
	$('#c-game-left_hand_menu').css({'left':'180px', 'height':'540px'});
	$('#c-game-left_hand_menu').animate({left:'0px',height:'610'},1000);
});