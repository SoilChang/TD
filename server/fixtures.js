/*This document is to insert all the equipment into the shop. With this formate
new equipment can be checked and automatically added to the shop*/
var allItemData = [
	{
		/*##########################################################
		helmet
		###########################################################*/
		name: 'Golden Crown',
		url: '/images/gamePage/goldenCrown.png',
		type: 'helmet',
		price: 2,
		hpBonus: 0,
		armourBonus: 0,
		attackBonus: 20,
	},
	{
		name: "Chief's Expression",
		url: '/images/gamePage/chielfsExpression.png',
		type: 'helmet',
		price: 4,
		hpBonus: 0,
		armourBonus: 0,
		attackBonus: 35,

	},
	{
		name: "Crown Of RedMoon",
		url: '/images/gamePage/CrownOfRedMoon.png',
		type: 'helmet',
		price: 6,
		hpBonus: 6,
		armourBonus: 1,
		attackBonus: 40,

	},
	{
		name: "Mom's Face When We Do Sth Wrong",
		url: '/images/gamePage/momFaceWhenWeDoSthWrong.png',
		type: 'helmet',
		price: 8,
		hpBonus: 4,
		armourBonus: 1,
		attackBonus: 40,

	},
	/*##########################################################

	chestPlate

	###########################################################*/
	{
		name: 'Scorched Plate',
		url: '/images/gamePage/chest_plate1.png',
		type: 'chestPlate',
		price: 5,
		hpBonus: 5,
		armourBonus: 1,
		attackBonus: 40,

	},
	
	{
		name: "Shared Blood",
		url: '/images/gamePage/chestplateOfSharedBlood.png',
		type: 'chestPlate',
		price: 8,
		hpBonus: 8,
		armourBonus: 1,
		attackBonus: 40,
	
	},
	{
		name: "Black Widow's Disguise",
		url: '/images/gamePage/chest_plate2.png',
		type: 'chestPlate',
		price: 12,
		hpBonus: 2,
		armourBonus: 2,
		attackBonus: 80,
	
	},
	/*##########################################################

	leg

	###########################################################*/
	{
		name: "Bull's Legs",
		url: '/images/gamePage/armour_leg3.png',
		type: 'leg',
		price: 2,
		hpBonus: 1,
		armourBonus: 0,
		attackBonus: 40,
	
	},
	{
		name: "Crystal Greave",
		url: '/images/gamePage/armour_leg.png',
		type: 'leg',
		price: 3,
		hpBonus: 3,
		armourBonus: 0,
		attackBonus: 40,
	
	},
	{
		name: "Gold-Plated Greave",
		url: '/images/gamePage/armour_leg2.png',
		type: 'leg',
		price: 7,
		hpBonus: 8,
		armourBonus: 1,
		attackBonus: 60,
	
	},
	
	{
		name: "Burnished Boots",
		url: '/images/gamePage/BurnishedBoots.png',
		type: 'leg',
		price: 12,
		hpBonus: 12,
		armourBonus: 1,
		attackBonus: 60,
		
	},
	{
		name: "Royal Greaves",
		url: '/images/gamePage/RoyalGreaves.png',
		type: 'leg',
		price: 18,
		hpBonus: 13,
		armourBonus: 2,
		attackBonus: 80,
		
	},
	/*##########################################################

	arm

	###########################################################*/
	{
		name: "Vanity Bracers",
		url: '/images/gamePage/vanityBracers.png',
		type: 'arm',
		price: 3,
		hpBonus: 3,
		armourBonus: 0,
		attackBonus: 80,
		
	},
	{
		name: "Fish Scales",
		url: '/images/gamePage/fishScales.png',
		type: 'arm',
		price: 8,
		hpBonus: 6,
		armourBonus: 0,
		attackBonus: 120,
		
	},
	{
		name: "Gauntlet Of Vengence",
		url: '/images/gamePage/gauntletOfVengence.png',
		type: 'arm',
		price: 12,
		hpBonus: 7,
		armourBonus: 1,
		attackBonus: 100,
		
	},

	{
		name: "Phoenix Flame",
		url: '/images/gamePage/PhoenixFlame.png',
		type: 'arm',
		price: 20,
		hpBonus: 10,
		armourBonus: 1,
		attackBonus: 160,
		
	},
	
	{
		name: "Snow Breaker",
		url: '/images/gamePage/arm1.png',
		type: 'arm',
		price: 30,
		hpBonus: 10,
		armourBonus: 2,
		attackBonus: 240,
		
	},
	/*##########################################################

	weapon

	###########################################################*/
	{
		name: "Common Sword",
		url: '/images/gamePage/armour_weapon3.png',
		type: 'weapon',
		price: 10,
		hpBonus: 0,
		armourBonus: 0,
		attackBonus: 120,
	
	},
	{
		name: "Mystical Staff",
		url: '/images/gamePage/armour_weapon1.png',
		type: 'weapon',
		price: 20,
		hpBonus: 0,
		armourBonus: 0,
		attackBonus: 200,
		
	},
	{
		name: "Holy Spear",
		url: '/images/gamePage/armour_weapon2.png',
		type: 'weapon',
		price: 30,
		hpBonus: 10,
		armourBonus: 0,
		attackBonus: 320,
		
	},
	
	{
		name: "Abyssal Blade",
		url: '/images/gamePage/armour_weapon4.png',
		type: 'weapon',
		price: 50,
		hpBonus: 15,
		armourBonus: 0,
		attackBonus: 440,

	},

	{
		name: "Soul Reaper",
		url: '/images/gamePage/soulReaper.png',
		type: 'weapon',
		price: 70,
		hpBonus: 15,
		armourBonus: 1,
		attackBonus: 600,

	},
	{
		name: "Raging Star",
		url: '/images/gamePage/ragingStar.png',
		type: 'weapon',
		price: 100,
		hpBonus: 15,
		armourBonus: 1,
		attackBonus: 800,

	},
	/*##########################################################

	relic

	###########################################################*/
	{
		name: "diamond Eye",
		url: '/images/gamePage/diamondEye.png',
		type: 'relic',
		price: 5,
		hpBonus: 2,
		armourBonus: 0,
		attackBonus: 10,
		magicalPower: 'The owner of this ring get extra starting gold'
	},
	{
		name: "Leoric's Jewellery",
		url: '/images/gamePage/leoricJewwlry.png',
		type: 'relic',
		price: 10,
		hpBonus: 5,
		armourBonus: 0,
		attackBonus: 0,
		magicalPower: 'This ring grants you the ability to build regenerative tower'
	},
	{
		name: "Sand Wall",
		url: '/images/gamePage/sandWall.png',
		type: 'relic',
		price: 10,
		hpBonus: 1,
		armourBonus: 1,
		attackBonus: 0,
		magicalPower: 'Block all damages for 5 instances.'
	},
	{
		name: "Undead Bone",
		url: '/images/gamePage/UndeadBone.png',
		type: 'relic',
		price: 10,
		hpBonus: 3,
		armourBonus: 0,
		attackBonus: 0,
		magicalPower: 'This ring grants you the ability to freeze all enemy monster for 3 second'
	},
	{
		name: "Dragon's Blood",
		url: '/images/gamePage/dragonsBlood.png',
		type: 'relic',
		price: 10,
		hpBonus: 2,
		armourBonus: 0,
		attackBonus: 80,
		magicalPower: "Double tower damage for 10 seconds."
	},
	{
		name: "Death Of Horror",
		url: '/images/gamePage/deathOfHorror.png',
		type: 'relic',
		price: 10,
		hpBonus: 3,
		armourBonus: 0,
		attackBonus: 0,
		magicalPower: "The wearer of this ring can bomb his enemy with horror"
	},
	{
		name: "Ring Of Darkness",
		url: '/images/gamePage/ringOfDarkness.png',
		type: 'relic',
		price: 15,
		hpBonus: 2,
		armourBonus: 0,
		attackBonus: 45,
		magicalPower: 'This ring grants you the ability to shower your enemies with meteorite.'
	},
	

];

var len = allItemData.length;
// loop through each item in the fixtures
for(var i=0; i<len; i++){
	var object = eqpList.findOne({name: allItemData[i].name });

	if(!object){
		// if cannot find anything
		eqpList.insert(allItemData[i]);
	}else{
		// if found
		eqpList.remove({_id: object._id});
		_.extend( {_id:object._id} , allItemData[i] );
		eqpList.insert(allItemData[i]);
	}
}




