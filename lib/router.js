Router.configure({
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	data:function(){
		return [Meteor.subscribe('userData'),
				Meteor.subscribe('equipments'),
				Meteor.subscribe('allUserData'),
				Meteor.subscribe('ChatMessage'),
				Meteor.subscribe('ranking'),
				Meteor.subscribe("monstertower"),
				Meteor.subscribe("systemVariable")
		];
	},


});

// home page
Router.route('/', {
	name: 'firstPage',
	layoutTemplate: 'firstPage'
});

// empty template of game page
Router.route('/gamePage', {
	name: 'gamePage',
	template: 'empty',
	layoutTemplate: 'gamePage',

});

// game page with kingdom tab
Router.route('/gamePage/kingdom', {
	name: 'kingdomTab',
	template: 'kingdomTab',
	layoutTemplate: 'gamePage',
});

// game page with rule tab
Router.route('/gamePage/rule', {
	name: 'ruleTab',
	template: 'ruleTab',
	layoutTemplate: 'gamePage'
});

// game page with tower type tab
Router.route('/gamePage/towerType', {
	name: 'towerTypeTab',
	template: 'towerTypeTab',
	layoutTemplate: 'gamePage',
	waitOn:function(){
		return Meteor.subscribe("monstertower");
	}
});

// game page with allies tab
Router.route('/gamePage/allies', {
	name: 'alliesTab',
	template: 'alliesTab',
	layoutTemplate: 'gamePage',
	waitOn:function(){
		return Meteor.subscribe('ChatMessage');
	}
});

// game page with shop tab
Router.route('/gamePage/shop', {
	name: 'shopTab',
	template: 'shopTab',
	layoutTemplate: 'gamePage',
	waitOn:function(){
		return Meteor.subscribe('equipments');
	}
});

// game page with game tab
Router.route('/gamePage/game', {
	name: 'gameTab',
	template: 'gameTab',
	layoutTemplate: 'gamePage',
	waitOn:function(){
		return [Meteor.subscribe("monstertower"),
				Meteor.subscribe("systemVariable")];
	}
});

// album page
Router.route('/albumPage', {
	name: 'albumPage',
	layoutTemplate: 'albumPage'
});


// feedback page
Router.route('/feedback', {
	name: 'feedback',
	layoutTemplate: "feedback"
});


Router.route('/leaderBoard', {
	name: 'leaderBoard',
	layoutTemplate: 'leaderBoard',
	waitOn:function(){
		return Meteor.subscribe('ranking');
	}
});

Router.route('/adminStory',{
	name: "adminStory",
	
});

 var requireLogin = function(){
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction( requireLogin , {only: 'feedback'});