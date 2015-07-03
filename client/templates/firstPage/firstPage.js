Template.firstPage.helpers({

});


Template.firstPage.events({
	// hide everything
	'load #secTower': function(){
		$('#photoBook, #credit,#enter').hide();
	},
	// hide and show photobook
	'mouseleave #secTower': function(){
		$('#secTower').height('100px');
		$('#secTower').css('margin-left','452px');
		$('#secTower').css('margin-top','169px');
		$('#photoBook').hide();
	},

	'mouseenter #secTower':function(){
		$('#secTower').height('130px');
		$('#secTower').css('margin-left','440px');
		$('#secTower').css('margin-top','145px');
		$('#photoBook').show();
	},
	// hide and show credit banner
	'mouseleave #lighthouse': function(){
		$('#lighthouse').height('220px');
		$('#lighthouse').css('margin-left','703px');
		$('#lighthouse').css('margin-top','10px');
		$('#credit').hide();
	},

	'mouseenter #lighthouse':function(){
		$('#lighthouse').height('250px');
		$('#lighthouse').css('margin-left','695px');
		$('#lighthouse').css('margin-top','-15px');
		$('#credit').show();
	},

	// hide and show enter sign
	'mouseleave #knight': function(){
		$('#knight').height('100px');
			$('#knight').css('margin-left','475px');
			$('#knight').css('margin-top','415px');
		$('#enter').hide();
	},

	'mouseenter #knight':function(){
		$('#knight').height('120px');
			$('#knight').css('margin-left','470px');
			$('#knight').css('margin-top','395px');
		$('#enter').show();
	}


});