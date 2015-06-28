Template.gameTab.events({
	'mouseenter #c-game-closeButton': function(){
		$('#c-game-closeButton').css({'margin-left':'1015px', 'width': '40px', 'height': '40px'});
	},
	'mouseleave #c-game-closeButton': function(){
		$('#c-game-closeButton').css({'margin-left':'1020px', 'width': '30px', 'height': '30px'});
	}

});