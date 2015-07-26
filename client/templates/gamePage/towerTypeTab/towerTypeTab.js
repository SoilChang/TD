Template.towerTypeTab.events({
	'mouseenter #c-TowerType-closeButton': function(){
		$('#c-TowerType-closeButton').css({'margin-left': '840px', 'width': '40px', 'height': '40px'});
	},

	'mouseleave #c-TowerType-closeButton': function(){
		$('#c-TowerType-closeButton').css({'margin-left':'845px', 'width': '30px', 'height': '30px'});
	}
})

Template.towerTypeTab.helpers({
	loadPlasma:function(){
		return MonsterTower.find({type:"plasma"},{sort:{level:1}});
	},

	loadGlyph:function(){
		return MonsterTower.find({type:"glyph"},{sort:{level:1}});
	},

	loadFountain:function(){
		return MonsterTower.find({type:"fountain"},{sort:{level:1}});
	},

	loadMonster:function(){
		return MonsterTower.find({type:"monster"},{sort:{sequence:1}});
	},

	convertRange:function(range){
		// convert to one decimal place
		return Math.floor(range*10/32)/10;
	},

	convertDuration:function(duration){
		// convert to one decimal place
		return Math.floor(duration*10/20)/10;
	},

	convertSlow:function(slow){
		// convert to % 
		return slow*100;
	}
});

