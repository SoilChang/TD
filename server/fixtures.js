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
		hpBonus: 1,
		armourBonus: 0,
		attackBonus: 0,
	},
	{
		name: "Chief's Expression",
		url: '/images/gamePage/chielfsExpression.png',
		type: 'helmet',
		price: 4,
		hpBonus: 0,
		armourBonus: 1,
		attackBonus: 0,

	},
	{
		name: "Crown Of RedMoon",
		url: '/images/gamePage/CrownOfRedMoon.png',
		type: 'helmet',
		price: 6,
		hpBonus: 6,
		armourBonus: 1,
		attackBonus: 0,

	},
	{
		name: "Mom's Face When We Do Sth Wrong",
		url: '/images/gamePage/momFaceWhenWeDoSthWrong.png',
		type: 'helmet',
		price: 8,
		hpBonus: 4,
		armourBonus: 2,
		attackBonus: 0,

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
		armourBonus: 2,
		attackBonus: 0,

	},
	
	{
		name: "Shared Blood",
		url: '/images/gamePage/chestplateOfSharedBlood.png',
		type: 'chestPlate',
		price: 8,
		hpBonus: 5,
		armourBonus: 3,
		attackBonus: 0,
	
	},
	{
		name: "Black Widow's Disguise",
		url: '/images/gamePage/chest_plate2.png',
		type: 'chestPlate',
		price: 12,
		hpBonus: 2,
		armourBonus: 5,
		attackBonus: 0,
	
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
		attackBonus: 0,
	
	},
	{
		name: "Crystal Greave",
		url: '/images/gamePage/armour_leg.png',
		type: 'leg',
		price: 3,
		hpBonus: 3,
		armourBonus: 0,
		attackBonus: 0,
	
	},
	{
		name: "Gold-Plated Greave",
		url: '/images/gamePage/armour_leg2.png',
		type: 'leg',
		price: 7,
		hpBonus: 8,
		armourBonus: 2,
		attackBonus: 0,
	
	},
	
	{
		name: "Burnished Boots",
		url: '/images/gamePage/BurnishedBoots.png',
		type: 'leg',
		price: 12,
		hpBonus: 8,
		armourBonus: 4,
		attackBonus: 0,
		
	},
	{
		name: "Royal Greaves",
		url: '/images/gamePage/RoyalGreaves.png',
		type: 'leg',
		price: 18,
		hpBonus: 8,
		armourBonus: 7,
		attackBonus: 0,
		
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
		armourBonus: 2,
		attackBonus: 20,
		
	},
	{
		name: "Fish Scales",
		url: '/images/gamePage/fishScales.png',
		type: 'arm',
		price: 8,
		hpBonus: 6,
		armourBonus: 2,
		attackBonus: 30,
		
	},
	{
		name: "Gauntlet Of Vengence",
		url: '/images/gamePage/gauntletOfVengence.png',
		type: 'arm',
		price: 12,
		hpBonus: 7,
		armourBonus: 4,
		attackBonus: 25,
		
	},

	{
		name: "Phoenix Flame",
		url: '/images/gamePage/PhoenixFlame.png',
		type: 'arm',
		price: 20,
		hpBonus: 8,
		armourBonus: 6,
		attackBonus: 40,
		
	},
	
	{
		name: "Snow Breaker",
		url: '/images/gamePage/arm1.png',
		type: 'arm',
		price: 30,
		hpBonus: 10,
		armourBonus: 8,
		attackBonus: 60,
		
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
		attackBonus: 30,
	
	},
	{
		name: "Mystical Staff",
		url: '/images/gamePage/armour_weapon1.png',
		type: 'weapon',
		price: 20,
		hpBonus: 0,
		armourBonus: 0,
		attackBonus: 50,
		
	},
	{
		name: "Holy Spear",
		url: '/images/gamePage/armour_weapon2.png',
		type: 'weapon',
		price: 30,
		hpBonus: 10,
		armourBonus: 0,
		attackBonus: 60,
		
	},
	
	{
		name: "Abyssal Blade",
		url: '/images/gamePage/armour_weapon4.png',
		type: 'weapon',
		price: 50,
		hpBonus: 15,
		armourBonus: 0,
		attackBonus: 80,

	},

	{
		name: "Soul Reaper",
		url: '/images/gamePage/soulReaper.png',
		type: 'weapon',
		price: 70,
		hpBonus: 15,
		armourBonus: 1,
		attackBonus: 100,

	},
	{
		name: "Raging Star",
		url: '/images/gamePage/ragingStar.png',
		type: 'weapon',
		price: 100,
		hpBonus: 15,
		armourBonus: 5,
		attackBonus: 130,

	},
	/*##########################################################

	relic

	###########################################################*/
	{
		name: "Leoric's Jewellery",
		url: '/images/gamePage/leoricJewwlry.png',
		type: 'relic',
		price: 30,
		hpBonus: 5,
		armourBonus: 1,
		attackBonus: 0,
		magicalPower: 'This ring grants you the ability to build regenerative tower'
	},
	{
		name: "Undead Bone",
		url: '/images/gamePage/UndeadBone.png',
		type: 'relic',
		price: 30,
		hpBonus: 5,
		armourBonus: 1,
		attackBonus: 0,
		magicalPower: 'This ring grants you the ability to freeze all enemy monster for 3 second'
	}
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
		eqpList.update({_id: object._id},{$set:{
			price: allItemData[i].price,
			hpBonus: allItemData[i].hpBonus,
			armourBonus: allItemData[i].armourBonus,
			attackBonus: allItemData[i].attackBonus,
		}});
	}
}

// to fix error
eqpList.remove({name:"Leoric's Jewlry"});



