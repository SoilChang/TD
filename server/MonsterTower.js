var allItemData	= [
		/*#############################################
                         Plasma Tower
		###############################################*/
	{
		name: "plasma1",
		image: '/images/gameImages/light_tower.png',
		type: 'plasma',
		level: 1,
		cost: 15,
		range: 96,
		damage: 10,
		cd:15
	},
	{
		name: "plasma2",
		image: '/images/gameImages/light_tower_2.png',
		type: 'plasma',
		level: 2,
		cost: 30,
		range: 112,
		damage: 20,
		cd:10
	},
	{
		name: "plasma3",
		image: '/images/gameImages/light_tower_3.png',
		type: 'plasma',
		level: 3,
		cost: 65,
		range: 128,
		damage: 35,
		cd:5
	},
	{
		name: "plasma4",
		image: '/images/gameImages/light_tower_4.png',
		type: 'plasma',
		level: 4,
		cost: 140,
		range: 160,
		damage: 65,	
		cd:3
	},

	/*#############################################
                         Icy Glyph
		###############################################*/
	{
		name: "glyph1",
		image: '/images/gameImages/ice_tower.png',
		type: 'glyph',
		level: 1,
		cost: 20,
		range: 80,
		damage: 5,
		slow: 0.3,
		duration:20,
		cd:20,
		splash:32
	},
	{
		name: "glyph2",
		image: '/images/gameImages/ice_tower_2.png',
		type: 'glyph',
		level: 2,
		cost: 40,
		range: 80,
		damage: 10,
		slow: 0.5,
		duration:40,
		cd: 18,
		splash:48
	},
	{
		name: "glyph3",
		image: '/images/gameImages/ice_tower_3.png',
		type: 'glyph',
		level: 3,
		cost: 80,
		range: 96,
		damage: 30,
		slow: 0.6,
		duration:60,
		cd: 15,
		splash:64
	},
	{
		name: "glyph4",
		image: '/images/gameImages/ice_tower_4.png',
		type: 'glyph',
		level: 4,
		cost: 160,
		range: 112,
		damage: 50,
		slow:0.8,
		duration:80,
		cd: 12,
		splash:64
	},


	/*#############################################
                         fountain
		###############################################*/
	{
		name: "fountain1",
		image: '/images/gameImages/regenTower_1.png',
		type: 'fountain',
		level: 1,
		cost: 100,
		damage: 1,
		cd: 2
	},
	{
		name: "fountain2",
		image: '/images/gameImages/regenTower_2.png',
		type: 'fountain',
		level: 2,
		cost: 150,
		damage: 1,
		cd: 1
	},
	{
		name: "fountain3",
		image: '/images/gameImages/regenTower_3.png',
		type: 'fountain',
		level: 3,
		cost: 200,
		damage: 2,
		cd: 1
	},
	{
		name: "fountain4",
		image: '/images/gameImages/regenTower_4.png',
		type: 'fountain',
		level: 4,
		cost: 250,
		damage: 4,
		cd: 1
	},

	/*#############################################
                         MONSTERS
		###############################################*/
	{
		name: "Mario",
		image: '/images/gameImages/marioSingle.png',
		sequence:1,
		type: 'monster',
		speed: 4.5,
		hp: 10,
		bounty: 1,
		damage: 2,
		description:"An average monster."
	},
	{
		name: "Speedy",
		image: '/images/gameImages/DarkNutSingle.png',
		sequence:2,
		type: 'monster',
		speed: 7,
		hp: 6,
		bounty: 1,
		damage: 2,
		description:"As its name suggest the monster has a high speed but has low hp."
	},
	{
		name: "Armos",
		image: '/images/gameImages/ArmosSingle.png',
		sequence:3,
		type: 'monster',
		speed: 2.5,
		hp: 30,
		bounty: 1,
		damage: 2,
		description:"A monster with high hp but slow speed."
	},
	{
		name: "FireWizard",
		image: '/images/gameImages/fireWizardSingle.png',
		sequence:4,
		type: 'monster',
		speed: 4,
		hp: 30,
		bounty: 2,
		damage: 3,
		description:"With his magic powers, he can deal more damage to your castle than an average monster."
	},
	{
		name: "Batman",
		image: '/images/gameImages/blueFlash_single.png',
		sequence:5,
		type: 'monster',
		speed: 2,
		hp: 300,
		bounty: 10,
		damage: 5,
		description:"The boss monster, dealing more damage and giving you more gold."
	},

	/*#############################################
                         system variables
		###############################################*/
	{
		name: "systemVariables",
		allyBonus: 0.3
	},

];




var len = allItemData.length;
// loop through each item in the fixtures
for(var i=0; i<len; i++){
	var object = MonsterTower.findOne({name: allItemData[i].name });

	if(!object){
		// if cannot find anything
		MonsterTower.insert(allItemData[i]);
	}else{
		// if found
		/*MonsterTower.update({_id: object._id},{$set:{

		}});*/
	}
}


// image: allItemData[i].image,
// speed: allItemData[i].speed,
// hp: allItemData[i].hp,
// bounty: allItemData[i].bounty,
// damage:allItemData[i].damage,
// description:allItemData[i].description,
// sequence: allItemData[i].sequence,

// level: allItemData[i].level,
// cost: allItemData[i].cost,
// range: allItemData[i].range,
// cd: allItemData[i].cd,
// slow: allItemData[i].slow,
// duration: allItemData[i].duration,
// splash: allItemData[i].splash