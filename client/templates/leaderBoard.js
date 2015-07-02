Template.leaderBoard.events({
	'mouseenter #bluejay': function(){
		$('#bluejay').css({'width':'170px', 'margin-top':'530px', 'margin-left': '1050px'});
	},

	'mouseleave #bluejay': function(){
		$('#bluejay').css({'width':'150px', 'margin-top':'535px', 'margin-left': '1060px'});
	}
})

Template.leaderBoard.helpers({
	globalRanking: function(){
		return Ranking.find({},{sort: {score:-1}, limit: 10});
	},

	personalRanking: function(){
		return Ranking.find({createdBy: Meteor.userId()}, {sort: {score:-1}});
	}
});