Router.configure({
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',

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
	layoutTemplate: 'gamePage'
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
	layoutTemplate: 'gamePage'
});

// game page with allies tab
Router.route('/gamePage/allies', {
	name: 'alliesTab',
	template: 'alliesTab',
	layoutTemplate: 'gamePage'
});

// game page with shop tab
Router.route('/gamePage/shop', {
	name: 'shopTab',
	template: 'shopTab',
	layoutTemplate: 'gamePage',
});

// game page with game tab
Router.route('/gamePage/game', {
	name: 'gameTab',
	template: 'gameTab',
	layoutTemplate: 'gamePage'
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
	layoutTemplate: 'leaderBoard'
})

