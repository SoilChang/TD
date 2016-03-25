Template.firstPage.onRendered(function(){

	// hide everything
	$('#photoBook, #credit,#enter,#dialog').hide();

	// animation for the second tower
	$("#secTower").css({"margin-top":"-100px"});
	$("#secTower").animate({marginTop:"169px"},1500, function(){
		var shineSecTower = Meteor.setInterval(function(){
			$("#shineSecTower").fadeIn(2000, function(){
				$("#shineSecTower").fadeOut(1900);
			});
		},4000);
	
		$("#secTower").hover(
			function(){
				$("#shineSecTower").css({"z-index":"-1"});
				$('#secTower').height('130px');
				$('#secTower').css('margin-left','440px');
				$('#secTower').css('margin-top','145px');
				$('#photoBook').show();
			},function(){
				$('#secTower').height('100px');
				$('#secTower').css('margin-left','452px');
				$('#secTower').css('margin-top','169px');
				$('#photoBook').hide();
				$("#shineSecTower").css({"z-index":"1"});
			});
	});

	// animation for the lighthouse
	$("#lighthouse").css({"margin-top":"-200px"});
	$("#lighthouse").animate({marginTop:"10px"},1500, function(){

		// continuous animation
		var shineSecTower = Meteor.setInterval(function(){
			$("#shineLighthouse").fadeIn(2000, function(){
				$("#shineLighthouse").fadeOut(1900);
			});
		},4000);

		$("#lighthouse").hover(
			function(){
				$("#shineLighthouse").css({"z-index":"-1"});
				$('#lighthouse').height('250px');
				$('#lighthouse').css('margin-left','695px');
				$('#lighthouse').css('margin-top','-15px');
				$('#credit').show();
			},function(){
				$('#lighthouse').height('220px');
				$('#lighthouse').css('margin-left','703px');
				$('#lighthouse').css('margin-top','10px');
				$('#credit').hide();
				$("#shineLighthouse").css({"z-index":"1"});
			});
	});

	// animation for the knight
	$("#knight").css({"margin-left":"450px","margin-top":"450px", "height":"0px"});
	$("#knight").animate({marginTop:"415px", marginLeft:"475px", height:"100px"},1500, function(){
		
		// continuous animation
		var shineKnight = Meteor.setInterval(function(){
			$("#shineknight").fadeIn(2000, function(){
				$("#shineknight").fadeOut(1900);
			});
		},4000);
	
		// on hover/unhover
		$("#knight").hover(
			function(){
				$("#shineknight").css({"z-index":"-1"});
				$('#knight').height('120px');
				$('#knight').css('margin-left','470px');
				$('#knight').css('margin-top','395px');
				$('#enter').show();

			},function(){
				$('#knight').height('100px');
				$('#knight').css('margin-left','475px');
				$('#knight').css('margin-top','415px');
				$('#enter').hide();
				$("#shineknight").css({"z-index":"1"});
		});
	});


	// animate the dialog box
	function popText(name,time){
		window.setTimeout(function(){
			$(name).animate({"font-size":"30"},300,function(){
				$(name).animate({"font-size":"14"},300)
			});
		},time);
	}
	window.setTimeout(function(){
		$("#dialog").fadeIn(1500,function(){
			window.setTimeout(function(){
				$("#dialog").fadeOut(7000)
			},3000)

			// poping each word
			var selectionCount = document.getElementById("dialog_text").childElementCount;
			console.log("selectionCount="+selectionCount.toString());
			for(var i = 1; i<=selectionCount;i++){
				elem = "#dialogPop"+ i.toString();
				console.log(elem);
				popText(elem, 1500+i*300);
			}

		})
	},1600)
	


	// facebook sdk stuff
	 try {
        FB.XFBML.parse();
    }catch(e) {}  

});


