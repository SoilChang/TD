Template.leaderBoard.onRendered(function(){
	$("#globalBtn").click(function(){
		$('#lb_globalRanking').show();
		$('#lb_personalRanking').hide();
	});
	$("#personalBtn").click(function(){
		$('#lb_globalRanking').hide();
		$('#lb_personalRanking').show();
	});

	// shine the bird
	Meteor.setInterval(function(){
		$("#shineBird").fadeIn(2000,function(){
			$("#shineBird").fadeOut(2000);
		});
	},4000);


	$("#bluejay").hover(function(){
		$('#bluejay').css({'width':'170px', 'margin-top':'530px', 'margin-left': '1050px'});
		$("#shineBird").css({"z-index":"-1"});
		$("#back").show();

	},function(){
		$('#bluejay').css({'width':'150px', 'margin-top':'535px', 'margin-left': '1060px'});
		$("#shineBird").css({"z-index":"1"});
		$("#back").hide();
	});
});



Template.leaderBoard.helpers({
	globalRanking: function(){
		return Ranking.find({},{sort: {score:-1}, limit: 10});
	},

	personalRanking: function(){
		return Ranking.find({createdBy: Meteor.userId()}, {sort: {score:-1}, limit:10});
	}
});