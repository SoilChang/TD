var allItemData=[
	/*#############################################
                         system variables
		###############################################*/
	{
		name: "systemVariables",
		allyBonus: 0.15
	},
	{
		name:'mario1',
		type:"multiplier",//mario
		sequence:1,
		damage:1,
		damage1:0,
		bounty:1,
		bounty1:2,
		hp:1.4,
		hp1:1.1,
		hp2:1

	},
	{
		name:'warrior1',
		type:"multiplier",
		sequence:2,
		damage:1,
		damage1:0,
		bounty:1,
		bounty1:2,
		hp:2.2,
		hp1:1.2,
		hp2:1
		
	},
	{
		name:'armoured1',
		type:"multiplier",
		sequence:3,
		bounty:1,
		bounty1:2,
		hp:4,
		hp1:2.5,
		hp2:1
		
	},
	{
		name:'wizard1',
		type:"multiplier",
		sequence:4,
		bounty:2,
		bounty1:3,
		hp:3.4,
		hp1:1.3,
		hp2:1
		
	},
	{
		name:'boss1',
		type:"multiplier",
		sequence:5,
		bounty:4,
		bounty1:6,
		hp:5,
		hp1:3,
		hp2:1
		
	},
	{
		name:'wave',
		type:"multiplier",
		sequence:0,
		waveDamage:12,
		waveWarrior:3,
		waveArmored:5,
		waveWizard:7,
		waveBoss:10,
		waveBounty:35,
		marioHpWave:30,
		marioHpWave1:100,
		warriorHpWave:30,
		warriorHpWave1:100,
		armoredHpWave:30,
		armoredHpWave1:100,
		wizardHpWave:30,
		wizardHpWave1:100,
		bossHpWave:30,
		bossHpWave1:100
		
	}
];






var len = allItemData.length;
// loop through each item in the fixtures
for(var i=0; i<len; i++){
	var object = SystemVariable.findOne({name: allItemData[i].name });
	if(!object){
		// if cannot find anything
		SystemVariable.insert(allItemData[i]);
	}else{
		// if found
		SystemVariable.remove({_id: object._id});
		_.extend( {_id:object._id} , allItemData[i] );
		SystemVariable.insert(allItemData[i]);
	}
}