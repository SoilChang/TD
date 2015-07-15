/*This document is to insert all the equipment into the shop. With this formate
new equipment can be checked and automatically added to the shop*/




/*##########################################################

helmet

###########################################################*/
if( eqpList.findOne({name:'Golden Crown'}) === undefined ){
	eqpList.insert({
		name: 'Golden Crown',
		url: '/images/gamePage/goldenCrown.png',
		type: 'helmet',
		price: 10,
		hpBonus: 1,
		armourBonus: 0,
		attackBonus: 0,

	});
};

if( eqpList.findOne({name:"Chief's Expression"}) === undefined ){
	eqpList.insert({
		name: "Chief's Expression",
		url: '/images/gamePage/chielfsExpression.png',
		type: 'helmet',
		price: 4,
		hpBonus: 2,
		armourBonus: 1,
		attackBonus: 0,

	});
}


if( eqpList.findOne({name:"Crown Of RedMoon"}) === undefined ){
	eqpList.insert({
		name: "Crown Of RedMoon",
		url: '/images/gamePage/CrownOfRedMoon.png',
		type: 'helmet',
		price: 4,
		hpBonus: 2,
		armourBonus: 1,
		attackBonus: 0,

	});
}

if( eqpList.findOne({name:"Mom's Face When We Do Sth Wrong"}) === undefined ){
	eqpList.insert({
		name: "Mom's Face When We Do Sth Wrong",
		url: '/images/gamePage/momFaceWhenWeDoSthWrong.png',
		type: 'helmet',
		price: 4,
		hpBonus: 2,
		armourBonus: 1,
		attackBonus: 0,

	});
}

/*##########################################################

chestPlate

###########################################################*/
if( eqpList.findOne({name:'Scorched Plate'}) === undefined ){
	eqpList.insert({
		name: 'Scorched Plate',
		url: '/images/gamePage/chest_plate1.png',
		type: 'chestPlate',
		price: 2,
		hpBonus: 3,
		armourBonus: 4,
		attackBonus: 0,

	});
}

if( eqpList.findOne({name:"Black Widow's Disguise"}) === undefined ){
	eqpList.insert({
		name: "Black Widow's Disguise",
		url: '/images/gamePage/chest_plate2.png',
		type: 'chestPlate',
		price: 3,
		hpBonus: 1,
		armourBonus: 2,
		attackBonus: 0,
	
	});
}

if( eqpList.findOne({name:"Shared Blood"}) === undefined ){
	eqpList.insert({
		name: "Shared Blood",
		url: '/images/gamePage/chestplateOfSharedBlood.png',
		type: 'chestPlate',
		price: 2,
		hpBonus: 2,
		armourBonus: 3,
		attackBonus: 0,
	
	});
}

/*##########################################################

leg

###########################################################*/

if( eqpList.findOne({name:"Crystal Greave"}) === undefined ){
	eqpList.insert({
		name: "Crystal Greave",
		url: '/images/gamePage/armour_leg.png',
		type: 'leg',
		price: 4,
		hpBonus: 3,
		armourBonus: 3,
		attackBonus: 0,
	
	});
}

if( eqpList.findOne({name:"Gold-Plated Greave"}) === undefined ){
	eqpList.insert({
		name: "Gold-Plated Greave",
		url: '/images/gamePage/armour_leg2.png',
		type: 'leg',
		price: 3,
		hpBonus: 2,
		armourBonus: 1,
		attackBonus: 0,
	
	});
}

if( eqpList.findOne({name:"Bull's Legs"}) === undefined ){
	eqpList.insert({
		name: "Bull's Legs",
		url: '/images/gamePage/armour_leg3.png',
		type: 'leg',
		price: 6,
		hpBonus: 4,
		armourBonus: 2,
		attackBonus: 0,
	
	});
}

if( eqpList.findOne({name:"Burnished Boots"}) === undefined ){
	eqpList.insert({
		name: "Burnished Boots",
		url: '/images/gamePage/BurnishedBoots.png',
		type: 'leg',
		price: 5,
		hpBonus: 3,
		armourBonus: 2,
		attackBonus: 0,
		
	});
}

if( eqpList.findOne({name:"Royal Greaves"}) === undefined ){
	eqpList.insert({
		name: "Royal Greaves",
		url: '/images/gamePage/RoyalGreaves.png',
		type: 'leg',
		price: 5,
		hpBonus: 2,
		armourBonus: 3,
		attackBonus: 0,
		
	});
}
/*##########################################################

arm

###########################################################*/

if( eqpList.findOne({name:"Snow Breaker"}) === undefined ){
	eqpList.insert({
		name: "Snow Breaker",
		url: '/images/gamePage/arm1.png',
		type: 'arm',
		price: 4,
		hpBonus: 0,
		armourBonus: 3,
		attackBonus: 1,
		
	});
}

if( eqpList.findOne({name:"Fish Scales"}) === undefined ){
	eqpList.insert({
		name: "Fish Scales",
		url: '/images/gamePage/fishScales.png',
		type: 'arm',
		price: 4,
		hpBonus: 2,
		armourBonus: 3,
		attackBonus: 1,
		
	});
}

if( eqpList.findOne({name:"Gauntlet Of Vengence"}) === undefined ){
	eqpList.insert({
		name: "Gauntlet Of Vengence",
		url: '/images/gamePage/gauntletOfVengence.png',
		type: 'arm',
		price: 4,
		hpBonus: 3,
		armourBonus: 5,
		attackBonus: 2,
		
	});
}

if( eqpList.findOne({name:"Phoenix Flame"}) === undefined ){
	eqpList.insert({
		name: "Phoenix Flame",
		url: '/images/gamePage/PhoenixFlame.png',
		type: 'arm',
		price: 3,
		hpBonus: 3,
		armourBonus: 2,
		attackBonus: 1,
		
	});
}

if( eqpList.findOne({name:"Vanity Bracers"}) === undefined ){
	eqpList.insert({
		name: "Vanity Bracers",
		url: '/images/gamePage/vanityBracers.png',
		type: 'arm',
		price: 0,
		hpBonus: 0,
		armourBonus: 3,
		attackBonus: 1,
		
	});
}
/*##########################################################

weapon

###########################################################*/

if( eqpList.findOne({name:"Mystical Staff"}) === undefined ){
	eqpList.insert({
		name: "Mystical Staff",
		url: '/images/gamePage/armour_weapon1.png',
		type: 'weapon',
		price: 10,
		hpBonus: 0,
		armourBonus: 0,
		attackBonus: 5,
		
	});
}


if( eqpList.findOne({name:"Holy Spear"}) === undefined ){
	eqpList.insert({
		name: "Holy Spear",
		url: '/images/gamePage/armour_weapon2.png',
		type: 'weapon',
		price: 7,
		hpBonus: 0,
		armourBonus: 0,
		attackBonus: 3,
		
	});
}

if( eqpList.findOne({name:"Common Sword"}) === undefined ){
	eqpList.insert({
		name: "Common Sword",
		url: '/images/gamePage/armour_weapon3.png',
		type: 'weapon',
		price: 3,
		hpBonus: 0,
		armourBonus: 0,
		attackBonus: 0.5,
	
	});
}

if( eqpList.findOne({name:"Abyssal Blade"}) === undefined ){
	eqpList.insert({
		name: "Abyssal Blade",
		url: '/images/gamePage/armour_weapon4.png',
		type: 'weapon',
		price: 15,
		hpBonus: 0,
		armourBonus: 0,
		attackBonus: 10,

	});
}

if( eqpList.findOne({name:"Raging Star"}) === undefined ){
	eqpList.insert({
		name: "Raging Star",
		url: '/images/gamePage/ragingStar.png',
		type: 'weapon',
		price: 18,
		hpBonus: 0,
		armourBonus: 2,
		attackBonus: 7,

	});
}

if( eqpList.findOne({name:"Soul Reaper"}) === undefined ){
	eqpList.insert({
		name: "Soul Reaper",
		url: '/images/gamePage/soulReaper.png',
		type: 'weapon',
		price: 20,
		hpBonus: 3,
		armourBonus: 0,
		attackBonus: 9,

	});
}
/*##########################################################

relic

###########################################################*/

if( eqpList.findOne({name:"Leoric's Jewlry"}) === undefined ){
	eqpList.insert({
		name: "Leoric's Jewlry",
		url: '/images/gamePage/leoricJewwlry.png',
		type: 'relic',
		price: 30,
		hpBonus: 0,
		armourBonus: 0,
		attackBonus: 0,
		magicalPower: 'This ring grants you the ability to build regenrative tower'
	});
}

if( eqpList.findOne({name:"Undead Bone"}) === undefined ){
	eqpList.insert({
		name: "Undead Bone",
		url: '/images/gamePage/UndeadBone.png',
		type: 'relic',
		price: 30,
		hpBonus: 0,
		armourBonus: 0,
		attackBonus: 0,
		magicalPower: 'This ring grants you the ability to freeze all enemy monster for 2 second'
	});
}


