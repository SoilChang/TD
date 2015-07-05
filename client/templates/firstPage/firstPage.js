Template.firstPage.onRendered(function(){
	// hide everything
	$('#photoBook, #credit,#enter').hide();

	// animation for the second tower
	$("#secTower").css({"margin-top":"-100px"});
	$("#secTower").animate({marginTop:"169px"},2000, function(){
		$("#secTower").hover(
			function(){
				$('#secTower').height('130px');
				$('#secTower').css('margin-left','440px');
				$('#secTower').css('margin-top','145px');
				$('#photoBook').show();
			},function(){
				$('#secTower').height('100px');
				$('#secTower').css('margin-left','452px');
				$('#secTower').css('margin-top','169px');
				$('#photoBook').hide();
			});
	});

	// animation for the lighthouse
	$("#lighthouse").css({"margin-top":"-200px"});
	$("#lighthouse").animate({marginTop:"10px"},2000, function(){
		$("#lighthouse").hover(
			function(){
				$('#lighthouse').height('250px');
				$('#lighthouse').css('margin-left','695px');
				$('#lighthouse').css('margin-top','-15px');
				$('#credit').show();
			},function(){
				$('#lighthouse').height('220px');
				$('#lighthouse').css('margin-left','703px');
				$('#lighthouse').css('margin-top','10px');
				$('#credit').hide();
			});
	});

	// animation for the knight
	$("#knight").css({"margin-left":"450px","margin-top":"450px", "height":"0px"});
	$("#knight").animate({marginTop:"415px", marginLeft:"475px", height:"100px"},2000, function(){
		$("#knight").hover(
			function(){
				$('#knight').height('120px');
				$('#knight').css('margin-left','470px');
				$('#knight').css('margin-top','395px');
				$('#enter').show();
			},function(){
				$('#knight').height('100px');
				$('#knight').css('margin-left','475px');
				$('#knight').css('margin-top','415px');
				$('#enter').hide();
			});
	});

	// facebook sdk stuff
	 try {
        FB.XFBML.parse();
    }catch(e) {}  

});


