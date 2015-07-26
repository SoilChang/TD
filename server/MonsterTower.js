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
		cost: 135,
		range: 160,
		damage: 60,	
		cd:3
	},

	/*#############################################
                         Icy Glyph
		###############################################*/
	{
		name: "glyph1",
		/*-------------display---------------*/
		image: '/images/gameImages/ice_tower.png.png',
		type: 'glyph',
		level: 1,
		cost: 20,
		dps: 5,
		range: 80,
		damage: 5,
		slow: 0.3,
		duration:20,
		cd:20
	},
	{
		name: "glyph2",
		image: '/images/gameImages/ice_tower_2.png',
		type: 'glyph',
		level: 2,
		cost: 40,
		dps: 10,
		range: 80,
		damage: 10,
		slowDisplay: "40% (1.5s)",
		slow: 0.5,
		duration:40,
		cd: 20
	},
	{
		name: "glyph3",
		image: '/images/gameImages/ice_tower_3.png',
		type: 'glyph',
		level: 3,
		cost: 80,
		dps: 26.7,
		range: 96,
		damage: 30,
		slow: 0.7,
		duration:60,
		cd: 15
	},
	{
		name: "glyph4",
		image: '/images/gameImages/ice_tower_4.png',
		type: 'glyph',
		level: 4,
		cost: 1650,
		dps: 53.3,
		range: 112,
		damage: 50,
		slow:0.9,
		duration:80,
		cd: 15
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
		type: 'monster',
		speed: 4,
		hp: 30,
		bounty: 2,
		damage: 3,
		description:"With his magic powers, he can deal more damage to your castle than an average monster."
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
		MonsterTower.update({_id: object._id},{$set:{
			image: allItemData[i].image,
			speed: allItemData[i].speed,
			hp: allItemData[i].hp,
			bounty: allItemData[i].bounty,
			damage:allItemData[i].damage,
			description:allItemData[i].description,

			level: allItemData[i].level,
			cost: allItemData[i].cost,
			range: allItemData[i].range,
			cd: allItemData[i].cd,
			slow: allItemData[i].slow,
			duration: allItemData[i].duration,
		}});
	}
}