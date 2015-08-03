/*#########################################################################

                 Content Page

###########################################################################
-Variables
-Game Data
-Template functions
-Initializing
-Track Game State
-Game Events
-Game Buttons
-Behind the Game

###########################################################################

                 Variables

#########################################################################*/
keys = {};
attBonus = 0;
hpBonus = 0;
armorBonus = 0;
regen = 0;
allyHp = 0;
allyArmor = 0;
allyAttack = 0;
gameLoaded = 0;
gameRunning = 0;
onGame = 0;

//#########################################################################
var gameTicker, hit0, hit1, hit2, hit3, hit4, hit5, hit6, hit7, hit8, hit9,
s1, s2, s3, s4, s5,//monster sprites
backgroundI, castleIm, castleI, castleInvincibleI,//canvas images & variable
castleLifebar, castleHpI,
castleHitI, castleBlockI, monsterKillI, //added animations
itS, ltS,
monsterDead,//monster variables
redCircleI, //meteorite animation
t1, t1i, t1a, t2, t2i, t2a,
ffCount, errorCD, pScreen;

/*#########################################################################

                 Game Data

#########################################################################*/
gameProgress = {}; //saved game
monsterData = {}; //types of monsters
monsterImage = []//image of monsters
towerData = {}; //types of towers
ffCount = [20,40,80,160];
coordinates = [
[96, 0],
[94, 480],
[800, 480],
[800, 96],
[220, 96],
[220, 352],
[668, 352],
[668, 224],
[384, 224]
];

gameData = function(type) {
    switch (type) {
        case 'new' :
            hpBonus = 0
            attBonus = 0
            armorBonus = 0
            allyHp = 0
            allyArmor = 0
            allyAttack = 0
            speed = 20; //speed of game
            addMonster();
            dmgCount = [];
            bombs = [] //bombs on map
            bomb.level = 1
            bomb.cost = [5,5,10,15]
            bomb.upgrade = [40,70,90]
            bomb.damage = [50,500,2000,20000]
            monsters = []; //monsters on map
            monsterDead = []; //animation when monster die
            shots = []; //shots on map
            towers = [];   //towers currently on map
            healers = []; //fountain on map
            powerFreeze = 0; //cooldown of power
            powerMeteorite = 0; 
            meteoriteOver = 0;
            //resets meteorite image
            redCircle.scaleX = .2;
            redCircle.scaleY = .2;
            redCircle.x = 627;
            redCircle.y = 268;
            //resets invincibility power
            castleInvincible.active = 0;
            castleInvincible.cd = 0;
            castleInvincible.blocks = 5;
            powerDD=0;
            powerCD=0;
            bombActive = false
            scorez = 0;
            maxHealth = 18;
            health = maxHealth;
            wave = 0;
            checkGG = 0;
            errorCD = 0; //time for error message to stay on canvas
            countDown = 0; //countdown to next wave
            lastMon = false; //to start countdown
            targetTower = false; //selected tower on map
            towerType = false; //selected tower to buy
            towerName = false; 
            hoverGrid = false; //identify current grid
            hoverT = false; //image of tower selected to buy
            document.getElementById("infoText").innerHTML = 
            "Before the game starts, you can click the tower/power buttons to see"+
            " the info.<br> For keyboard SHORTCUTS, view under Guides tab no.5.";

            $('.powerBtn').addClass('cooldown');
            $('#fountainBtn').addClass('cooldown');
            if (Meteor.user()!=null) {
                if (Meteor.user().ability_extraGold) {
                    cashy =65;
                } else {cashy=40;};

                if (Meteor.user().ability_regen){
                    $('#fountainBtn').removeClass('cooldown');
                }
                if (Meteor.user().ability_freeze){
                    $('#freezePower').removeClass('cooldown');
                };
                if (Meteor.user().ability_meteorite){
                    $('#meteoritePower').removeClass('cooldown');
                };
                if (Meteor.user().ability_block){
                    $('#invinciblePower').removeClass('cooldown');
                };
                if (Meteor.user().ability_doubleDamage){
                    $('#ddPower').removeClass('cooldown');
                };
            } else {cashy=40;};

            break;
        case 'saved' :
            speed = 20
            addMonster();
            monsters = []; 
            monsterDead = [];
            shots = [];
            towers = [];
            healers = [];
            bombs = [];
            bomb.level = gameProgress['bombLevel']
            dmgCount = gameProgress['dmgCount'];
            powerFreeze = gameProgress['powerFreeze'];
            powerMeteorite = gameProgress['powerMeteorite'];
            meteoriteOver = gameProgress['meteoriteOver'];
            redCircle.scaleX = gameProgress['scaleX']
            redCircle.scaleY = gameProgress['scaleY']
            redCircle.x = gameProgress['x']
            redCircle.y = gameProgress['y']
            castleInvincible.active = gameProgress['invinActive'];
            castleInvincible.cd = gameProgress['invinCd'];
            castleInvincible.blocks = gameProgress['invinBlock'];
            powerDD = gameProgress['powerDD'];
            powerCD = gameProgress['powerCD'];
            scorez = gameProgress['score'];
            maxHealth = gameProgress['maxHealth'];
            health = gameProgress['health'];
            cashy = gameProgress['cash'];
            wave = gameProgress['wave'];
            countDown = gameProgress['countDown'];
            hpBonus = gameProgress['hpBonus'];
            attBonus = gameProgress['attBonus'];
            armorBonus = gameProgress['armorBonus'];
            allyHp  = gameProgress['allyHp'];
            allyArmor = gameProgress['allyArmor'];
            allyAttack = gameProgress['allyAttack']; 
            checkGG = 0;
            errorCD = 0; //time for error message to stay on canvas
            targetTower = false; //selected tower on map
            towerType = false; //selected tower to buy
            towerName = false; 
            hoverGrid = false; //identify current grid
            hoverT = false; //image of tower selected to buy

            for (var i=2;i<=wave;i++) {
                if (wave%15 == 0){
                    monsterData["wizard"]["damage"]+=2            
                    monsterData["mario"]["damage"]+=1
                    monsterData["warrior"]["damage"]+=1
                    monsterData["armored"]["damage"]+=1
                }
                if (wave%10 == 0){
                    if (wave<=30){
                        monsterData["mario"]["bounty"]+=1
                        monsterData["warrior"]["bounty"]+=1
                        monsterData["armored"]["bounty"]+=1                
                    }
                    else if(wave<=60){                
                        monsterData["mario"]["bounty"]+=2
                        monsterData["warrior"]["bounty"]+=2
                        monsterData["armored"]["bounty"]+=2  
                    }else{
                        monsterData["mario"]["bounty"]+=3
                        monsterData["warrior"]["bounty"]+=3
                        monsterData["armored"]["bounty"]+=3                
                    }
                }
                if (wave%7 == 0){
                    if (i==7){
                        continue;
                    }
                    monsterData['wizard']['hp']*=3
                    if (wave<=21){
                        monsterData["wizard"]["bounty"]+=1
                    }
                    else if(wave<=42){
                        monsterData["wizard"]["bounty"]+=2                
                    }else{
                        monsterData["wizard"]["bounty"]+=3  
                    }
                }
                if (i%5 == 0) {
                    if (i==5) {
                        continue;
                    };
                    if (wave<=42){
                        monsterData["armored"]["hp"]*=2.4                
                    }else{
                        monsterData["armored"]["hp"]*=2
                    }
                }
                else if (i%3 == 0) {
                    if (i==3) {
                        continue;
                    };
                    if (wave<=42){
                        monsterData["warrior"]["hp"]*=2                
                    }else{                
                        monsterData["warrior"]["hp"]*=1.5
                    }
                }
                else {
                    if (wave<=42){
                        monsterData["mario"]["hp"]*=1.4                
                    }else{                
                        monsterData["mario"]["hp"]*=1.2
                    }
                };
            };
            $('.powerBtn').addClass('cooldown');

            if (Meteor.user()!=null){
                if (Meteor.user().ability_freeze && powerFreeze==0) {
                    $('#freezePower').removeClass('cooldown');
                };
                if (Meteor.user().ability_meteorite && powerMeteorite==0) {
                    $('#meteoritePower').removeClass('cooldown');
                };
                if (Meteor.user().ability_block && castleInvincible.cd==0) {
                    $('#invinciblePower').removeClass('cooldown');
                };
                if (Meteor.user().ability_doubleDamage && powerDD==0) {
                    $('#ddPower').removeClass('cooldown');
                };                
            }

            break;
    };
};

/*#########################################################################

                 Template functions

#########################################################################*/
Template.gameTab.events({
	'mouseenter #c-game-closeButton': function(){
		$('#c-game-closeButton').css({'margin-left':'1015px', 'width': '40px', 'height': '40px'});
	},
	'mouseleave #c-game-closeButton': function(){
		$('#c-game-closeButton').css({'margin-left':'1020px', 'width': '30px', 'height': '30px'});
	},  
    'click button': function(){
        document.getElementById('errorText').innerHTML = ""
    },
	'click #pauseBtn': function() {
        if (checkGG==0) {
            togglePause();
        } else {
            clearStage();
            clearIcon();
            setNewGame();
            newGame();
            $('.towerBtn').removeClass('selected');  
        }
	},
    'click #saveBtn': function(){
        saving();
    },
	'click #nextBtn': function(){
        if (countDown>0){
            countDown=1            
        }else {
            error('Please wait for monsters to finish spawning')
        }
	},
    'click #ff1': function(){
        ff(0);
    },
    'click #ff2': function(){
        ff(1);
    },
    'click #ff4': function(){
        ff(2);
    },
    'click #ff8': function(){
        ff(3);
    },
	'click #iceBtn': function(){
		buyTower('iceTower');
	},
	'click #lightBtn': function(){
		buyTower('lightTower')
	},
    'click #fountainBtn': function(){
        buyTower('fountain')
    },
    'click #bombPower': function(){
        power('bomb')
    },
	'click #freezePower': function(){
        power('freeze')
	},
    'click #meteoritePower': function(){ 
        power('meteorite');   
    },
    'click #invinciblePower': function(){
        power('invincibility')
    },
    'click #ddPower': function(){
        power('dd')
    },
    'click #menuBtn': function(){
        $('#c-game-left_hand_menu').animate({left:'180', height:'540'},1000);
        $('#btmMenu').animate({top:'480'},1000);
        clearStage();
        clearIcon();
        menu();
        document.getElementById("infoText").innerHTML = ""
        $('.towerBtn').removeClass('selected');  
        $('.powerBtn').removeClass('selected');  
        $('.ff').removeClass('selected');  
    },
    'click #upgradeBtn': function() {
        upgradeTower();
    },
    'click #upgradeBombBtn': function(){
        upgradeBomb();
    },
    'click #sellBtn': function() {
        sellTower();
    },
    'click #soundBtn': function() {
        toggleSound();
    }
});

Template.gameTab.onRendered(function() {
    $('.towerBtn').click(
        function(){
        bombActive=false
        $('.towerBtn').removeClass('selected');
        $('.powerBtn').removeClass('selected');        
        $(this).addClass('selected');
    });
    $('.powerBtn').click(
        function(){
        $('.powerBtn').removeClass('selected');
    });
    $('.ff').click(
        function(){
        $('.ff').removeClass('selected');
        $(this).addClass('selected');
    });
	$('#c-game-left_hand_menu').css({'left':'180px', 'height':'540px'});
    $('#btmMenu').css({'top':'480px'});
	//$('#c-game-left_hand_menu').animate({left:'0px',height:'610'},1000);
	//$('#btmMenu').animate({top:'550px'},1000);
    if (!gameLoaded) {
        init();
        menu();
    } else {
        menu();
    }
});

/*#########################################################################

                 Initializing

#########################################################################*/
//set up game data
init = function() {
    stage = new createjs.Stage("playingField");
    stage.enableMouseOver();
    bombActive = false
    stage.on("stagemousemove",function(evt) {
        if (bombActive) {
            bomb.x = evt.stageX-20;
            bomb.y = evt.stageY-22;
        }
    })

    imageload(); //load image into canvas
    pauseScreen(); //load pause screen in canvas
    addTower(); //creates tower data
    gridData(); //adds grid data into canvas
    addMonster(); //creates monster data

    //detects keyboard
    this.document.onkeydown = keydown;

    gameLoaded = 1;
}

menu = function() {
    if (gameLoaded) {
        stage = new createjs.Stage("playingField");
        stage.enableMouseOver();
    }

    //initialized page
    var stageColor = new createjs.Shape();
    stageColor.graphics.beginFill('#424646').drawRect(0,0,896,544);
    stage.addChild(stageColor);

    var redArrowI = new Image();
    redArrowI.src = "/images/gameImages/red.png"
    var blueArrowI = new Image();
    blueArrowI.src = "/images/gameImages/blue.png"

    var redArrow1 = new createjs.Bitmap(redArrowI);
    redArrow1.y = 5;
    var blueArrow1 = new createjs.Bitmap(blueArrowI);
    blueArrow1.y = 5;
    var line1 = new createjs.Text("New Game",
    "48px Florence", "#ffa500");
    line1.x = 40;
    var c1 = new createjs.Container();
    c1.mouseChildren = false;
    c1.x = 100;
    c1.y = 15;
    c1.red = redArrow1
    c1.blue = blueArrow1
    var over1 = new createjs.Shape();
    over1.graphics.beginFill("#000").drawRect(0, 0,
        line1.getMeasuredWidth() + 38, line1.getMeasuredHeight());
    c1.hitArea = over1;
    c1.on('mouseover',handleLine)
    c1.on('mouseout',handleLine)
    c1.on('click',handleLine)

    var redArrow2 = new createjs.Bitmap(redArrowI);
    redArrow2.y = 5;
    var blueArrow2 = new createjs.Bitmap(blueArrowI);
    blueArrow2.y = 5;
    var line2 = new createjs.Text("Continue Game (Current)",
    "48px Florence", '#888');
    line2.x = 40;
    var c2 = new createjs.Container();
    c2.mouseChildren = false;
    c2.x = 100;
    c2.y = 60;
    c2.red = redArrow2
    c2.blue = blueArrow2
    var over2 = new createjs.Shape();
    over2.graphics.beginFill("#000").drawRect(0, 0,
        line2.getMeasuredWidth() + 38, line2.getMeasuredHeight());
    c2.hitArea = over2;

    //to enable continue game
    if (gameRunning) {
        line2.color = '#ffa500'
        c2.on('mouseover',handleLine)
        c2.on('mouseout',handleLine)
        c2.on('click',handleLine)

    }

    var redArrow3 = new createjs.Bitmap(redArrowI);
    redArrow3.y = 5;
    var blueArrow3 = new createjs.Bitmap(blueArrowI);
    blueArrow3.y = 5;
    var line3 = new createjs.Text("Continue Game (Saved)",
    "48px Florence", '#888');
    line3.x = 40;
    var c3 = new createjs.Container();
    c3.mouseChildren = false;
    c3.x = 100;
    c3.y = 110;
    c3.red = redArrow3
    c3.blue = blueArrow3
    var over3 = new createjs.Shape();
    over3.graphics.beginFill("#000").drawRect(0, 0,
        line3.getMeasuredWidth() + 38, line3.getMeasuredHeight());
    c3.hitArea = over3;

    //to enable continue game
    if (Meteor.user() !== null && Meteor.loggingIn() !== true) {
        if (Meteor.user().savedGame!=false) {
            line3.color = "#ffa500"
            c3.on('mouseover',handleLine)
            c3.on('mouseout',handleLine)
            c3.on('click',handleLine)
        }
        else if (localStorage.towerDefense!==undefined){
            line3.color = "#ffa500"
            c3.on('mouseover',handleLine)
            c3.on('mouseout',handleLine)
            c3.on('click',handleLine)
        }
    }else if (localStorage.towerDefense!==undefined){
        line3.color = "#ffa500"
        c3.on('mouseover',handleLine)
        c3.on('mouseout',handleLine)
        c3.on('click',handleLine)
    }

    var ticking = createjs.Ticker.on("tick", stage);

    c1.addChild(line1,blueArrow1)
    c2.addChild(line2,blueArrow2)
    c3.addChild(line3,blueArrow3)
    stage.addChild(c1,c2,c3)
    stage.update() 
    function animateGame() {
        $('#c-game-left_hand_menu').animate({left:'0px',height:'610'},1000);
        $('#btmMenu').animate({top:'550px'},1000);
        createjs.Ticker.off("tick", ticking);
        stage.removeAllChildren();

        // creates ticks
        gameTicker = createjs.Ticker.on("tick", tick); 
        createjs.Ticker.setPaused(true);
        createjs.Ticker.setFPS(20);   

        stage.addChild(background)
        grid(); //load grid onto map   
        bombGrid() //load grid for bomb
        onGame = 1 //controls keyboard functions

        $('#ff1').addClass('selected');            
    }

    function handleLine(event) {
        if (event.type == "mouseover") {
            event.target.getChildAt(0).color = '#f00'
            event.target.removeChildAt(1)
            event.target.addChild(event.target.red)
        } else {
            event.target.getChildAt(0).color = '#ffa500'
            event.target.removeChildAt(1)
            event.target.addChild(event.target.blue)
        }
        if (event.type == 'click') {
            if (event.target == c1) {
                animateGame();
                newGame();
            } 
            else if (event.target == c2) {
                animateGame();
                currentGame();
            }
            else if (event.target == c3) {
                animateGame();
                if (Meteor.user() !== null && Meteor.user().savedGame) {
                    if (localStorage.towerDefense!=undefined){
                        if (confirm('Local data - Wave:'+
                            JSON.parse(localStorage.towerDefense)['wave'] + '\n' +
                            'Account data - Wave:'+ Meteor.user().savedGame['wave'] + '\n'+
                            'Click OK to load Local data' + '\n'+
                            'and CANCEL to load Account data')){
                            gameProgress = JSON.parse(localStorage.towerDefense)                            
                        }else{gameProgress = Meteor.user().savedGame;}
                    }else{gameProgress = Meteor.user().savedGame;}   
                } else {                    
                    gameProgress = JSON.parse(localStorage.towerDefense)
                }
                continueGame();
            }
        }
    }
}

path = function() {
    //show on map the path of creep
    var line = new createjs.Shape();

    for (var i=1;i<coordinates.length;i++) {
        var point1=coordinates[i-1];
        var point2=coordinates[i];
    //start drawing 
    line.graphics.setStrokeStyle(1).beginStroke("#000")
    .moveTo(point1[0],point1[1])
    .lineTo(point2[0],point2[1]);
    stage.addChild(line);
    };
}

//loads required image into canvas
imageload = function() {
    //background image
    backgroundI = new Image();
    backgroundI.src = "/images/gameImages/3dStage.png"
    //load background
    background = new createjs.Bitmap(backgroundI);

    //ice background image
    iceBackgroundI = new Image();
    iceBackgroundI.src = "/images/gameImages/3dStage_frozen.png"
    //load background
    iceBackground = new createjs.Bitmap(iceBackgroundI);

    //castle image
    castleIm = new Image();
    castleIm.src = "/images/gameImages/castle64.png"
    castleI = new createjs.Bitmap(castleIm);

    castleHpI = new Image();
    castleHpI.src = "/images/gameImages/castleLifebar.png"
    castleHp = new createjs.Bitmap(castleHpI);
    castleHp.y = 55

    castleText = new createjs.Text(
        0 + "/" + 0 , "11px Arial", "#fff");
    castleText.y = 54
    castleText.x = 33
    castleText.textAlign = "center"
    
    castle = new createjs.Container();
    castle.addChild(castleI,castleHp, castleText);
    castle.x = 320;
    castle.y = 192;

    //castle invincible
    castleInvincibleI = new Image();
    castleInvincibleI.src = "/images/gameImages/invinCastle.png"
    castleInvincible = new createjs.Bitmap(castleInvincibleI);
    castleInvincible.x = 305;
    castleInvincible.y = 170;
    castleInvincible.cd = 0;
    castleInvincible.blocks = 5;

    //castle hit
    castleHitI = new Image();
    castleHitI.src = "/images/gameImages/castleHit.png"
    castleHit = new createjs.Bitmap(castleHitI);
    castleHit.x = 368;
    castleHit.y = 208;
    castleHit.cd = -1;

    //castle block
    castleBlockI = new Image();
    castleBlockI.src = "/images/gameImages/castleBlock.png"
    castleBlock = new createjs.Bitmap(castleBlockI);
    castleBlock.x = 368;
    castleBlock.y = 208;
    castleBlock.cd = -1;

    chI = {
        images: ["/images/gameImages/castleHeal.png"],
        frames: {width:74, height:64, count:9},
        animations: {
            heal:[0,8,'end',.4],
            end:[9]
        }
    };

    castleHealI = new createjs.SpriteSheet(chI);
    castleHeal = new createjs.Sprite(castleHealI,'end')
    castleHeal.x=315
    castleHeal.y=182

    //light tower level 1
    lightTower1 = new Image();
    lightTower1.src = "/images/gameImages/light_tower.png";
    //light tower level 2
    lightTower2 = new Image();
    lightTower2.src = "/images/gameImages/light_tower_2.png";
    //light tower level 3
    lightTower3 = new Image();
    lightTower3.src = "/images/gameImages/light_tower_3.png";
    //light tower level 4
    lightTower4 = new Image();
    lightTower4.src = "/images/gameImages/light_tower_4.png";

    //light tower shots
    ltS = {
        images: ["/images/gameImages/lightShot.png"],
        frames: {width:30, height:30, count:20},
        animations: {
            fire:[10,12,'fire1',2],
            fire1:[13]
        }
    };
    light = new createjs.SpriteSheet(ltS);


    //ice tower level 1
    iceTower1 = new Image();
    iceTower1.src = "/images/gameImages/ice_tower.png";
    //ice tower level 2
    iceTower2 = new Image();
    iceTower2.src = "/images/gameImages/ice_tower_2.png";
    //ice tower level 3
    iceTower3 = new Image();
    iceTower3.src = "/images/gameImages/ice_tower_3.png";
    //ice tower level 4
    iceTower4 = new Image();
    iceTower4.src = "/images/gameImages/ice_tower_4.png";
    //ice tower shots
    itS = {
        images: ["/images/gameImages/iceShot.png"],
        frames: {width:30, height:30, count:4},
        animations: {
            fire:[3,3,"fire1"],
            fire1:[2,2,"fire2"],
            fire2:[1,1,"fire3"],
            fire3:[0]
        }
    };
    ice = new createjs.SpriteSheet(itS);


    //fountain level 1
    fountain1 = new Image();
    fountain1.src = "/images/gameImages/regenTower_1.png";
    //fountain level 2
    fountain2 = new Image();
    fountain2.src = "/images/gameImages/regenTower_2.png";
    //fountain level 3
    fountain3 = new Image();
    fountain3.src = "/images/gameImages/regenTower_3.png";
    //fountain level 4
    fountain4 = new Image();
    fountain4.src = "/images/gameImages/regenTower_4.png";

    bI = {
        images: ["/images/gameImages/bomb.png"],
        frames: {width:32, height:32, count:3},
        animations: {
            explode:[0,3,'end',.2],
            end:[4],
            ignite:[0]
        }
    };

    bombI = new createjs.SpriteSheet(bI);
    bomb = new createjs.Sprite(bombI)

    eI = {
        images: ["/images/gameImages/ice_explosion.png"],
        frames: {width:32, height:32, count:7},
        animations: {
            explode:[0,6,'end',.5],
            end:[7],
        }
    };

    explosiveI = new createjs.SpriteSheet(eI);

    //hp image
    healthbarI = new Image();
    healthbarI.src = "/images/gameImages/lifebar.png";

    //monster killed
    monsterKillI = new Image();
    monsterKillI.src = "/images/gameImages/monsterDie.png"

    //mario
    s1 = {
        images: ["/images/gameImages/mario.png"],
        frames: {width:21, height:40, count:32},
        animations: {
            right:[0,7,'right',.6],
            up:[8,15,'up',.6],
            left:[16,23,'left',.6],
            down:[24,31,'down',.7]
        }
    };
    marioI = new createjs.SpriteSheet(s1);

    //warrior
    s2 = {
        images: ["/images/gameImages/DarkNut.png"],
        frames: {width:24, height:31, count:16},
        animations: {
            right:[0,3,'right',.8],
            up:[4,7,'up',.8],
            left:[8,11,'left',.8],
            down:[12,15,'down',.8]
        }
    };
    warriorI = new createjs.SpriteSheet(s2);

    //armor unit
    s3 = {
        images: ["/images/gameImages/Armos.png"],
        frames: {width:32, height:35, count:16},
        animations: {
            right:[0,3,'right',.3],
            up:[4,7,'up',.3],
            left:[8,11,'left',.3],
            down:[12,15,'down',.3]
        }
    };
    armoredI = new createjs.SpriteSheet(s3); 

    //wizard unit
    s4 = {
        images: ["/images/gameImages/fireWizard.png"],
        frames: {width:32, height:45, count:16},
        animations: {
            right:[0,3,'right',.4],
            up:[4,7,'up',.4],
            down:[8,11,'down',.4],
            left:[12,15,'left',.4]
        }
    };
    wizardI = new createjs.SpriteSheet(s4); 

    //wizard unit
    s5 = {
        images: ["/images/gameImages/blueFlash.png"],
        frames: {width:29, height:40, count:12, spacing:1},
        animations: {
            right:[3,5,'right',.4],
            up:[6,8,'up',.4],
            down:[0,2,'down',.4],
            left:[9,11,'left',.4]
        }
    };
    batmanI = new createjs.SpriteSheet(s5); 

    //power animations
    redCircleI = new Image();
    redCircleI.src = "/images/gameImages/redCircle.png"
    redCircle = new createjs.Bitmap(redCircleI);
    redCircle.scaleX = .01;
    redCircle.scaleY = .01;
    redCircle.x = 673;
    redCircle.y = 314;
};

monsterImageLoad = 
function(name,link,w,h,c,u,r,d,l,s){
    //name, link, width, height, count, up,right,down,left,speed
    var num = c/4
    var r1 = num*2-1
    var d1 = num*2
    var d2 = num*3-1
    var l1 = num*3
    var l2 = c-1

    var newS = {
        images: [link],
        frames: {width:w, height:h, count:c},
        animations: {
            up:[0,num-1,'up',s],
            right:[num,r1,'right',s],
            down:[d1,d2,'down',s],
            left:[l1,l2,'left',s]
        }
    };
    name = new createjs.SpriteSheet(newS)

} 

/*#########################################################################

                 Track Game State

#########################################################################*/
newGame = function() {
    gameData('new');//load game data

    gameRunning = 0
    //load data from equipment
    if(Meteor.user() !== null && Meteor.loggingIn() !== true){
        hpBonus = Meteor.user().hpBonus;
        attBonus = Meteor.user().attackBonus;
        armorBonus = Meteor.user().armourBonus;

        allyHp = Meteor.user().allyHp;
        allyArmor = Meteor.user().allyArmour;
        allyAttack = Meteor.user().allyAttack;
    }
    //update castle with equipment bonus
    maxHealth += hpBonus
    health = maxHealth
    castleText.text = (maxHealth+allyHp) + '/' + maxHealth
    castleHp.sourceRect = new createjs.Rectangle(0,0,64,10);

    stage.addChild(castle)
    //line of creep path
    //path();


    //edit UI
    $('.ff').removeClass('selected');  
    $('#ff1').addClass('selected');
    document.getElementById('pauseBtn').value = 'Start'

    document.getElementById('freezeCd').innerHTML = ''
    document.getElementById('invincibleCd').innerHTML = ''
    document.getElementById('invincibleBlock').innerHTML = ''
    document.getElementById('ddCd').innerHTML = ''

    document.getElementById("armor").innerHTML = armorBonus+
    '<span class="ally">+'+allyArmor+'</span>'
    document.getElementById("bonus").innerHTML = attBonus+
    '<span class="ally">+'+allyAttack+'</span>'
    document.getElementById("regen").innerHTML = regen

    document.getElementById("score").innerHTML = scorez; 
    document.getElementById("cash").innerHTML = cashy;
    document.getElementById("wave").innerHTML = wave; 
    document.getElementById("health").innerHTML = health+
    '<span id="ally">+'+allyHp+'</span>'
    document.getElementById("cdTimer").innerHTML = (countDown/20);

    stage.update();
};

currentGame = function() {
    $('.ff').removeClass('selected');  
    $('#ff1').addClass('selected');
    document.getElementById('pauseBtn').value = 'Play';

    document.getElementById("armor").innerHTML = armorBonus+
    '<span class="ally">+'+allyArmor+'</span>'
    document.getElementById("bonus").innerHTML = attBonus+
    '<span class="ally">+'+allyAttack+'</span>'
    document.getElementById("regen").innerHTML = regen

    document.getElementById("score").innerHTML = scorez; 
    document.getElementById("cash").innerHTML = cashy;
    document.getElementById("wave").innerHTML = wave; 
    document.getElementById("health").innerHTML = health+
    '<span id="ally">+'+allyHp+'</span>'
    document.getElementById("cdTimer").innerHTML = 
    ((countDown/20)<=0) ? 0 : (countDown/20);

    if (towers) {
        addition(towers);    
        for (var i=0;i<towers.length;i++) {
            var t = towers[i].bg;
            hitsT[t[0]][t[1]][t[2]].mouseEnabled = false;
        }
    }
    if (monsters) {
        addition(monsters);
        stopAnimate(true);
    };
    if (shots) {
        addition(shots);
    };


    stage.enableMouseOver(0);
    stage.addChild(castle);
    stage.addChild(pScreen);

    stage.update();
};
continueGame = function() {
    gameData('saved');

    creation('tower')
    creation('fountain')
    creation('monster')
    creation('shot')
    creation('bomb')

    if (gameProgress['lastMon']){
        lastMon = monsters[monsters.length-1]
    }else{lastMon=false}

    gameRunning = 1
    //edit UI
    $('.ff').removeClass('selected');  
    $('#ff1').addClass('selected');
    document.getElementById('pauseBtn').value = 'Play';
    
    document.getElementById("armor").innerHTML = armorBonus+
    '<span class="ally">+'+allyArmor+'</span>'
    document.getElementById("bonus").innerHTML = attBonus+
    '<span class="ally">+'+allyAttack+'</span>'
    document.getElementById("regen").innerHTML = regen

    document.getElementById("score").innerHTML = scorez; 
    document.getElementById("cash").innerHTML = cashy;
    document.getElementById("wave").innerHTML = wave; 
    document.getElementById("health").innerHTML = health+
    '<span id="ally">+'+allyHp+'</span>'
    document.getElementById("cdTimer").innerHTML = 
    ((countDown/20)<=0) ? 0 : (countDown/20);

    stopAnimate(true);
    stage.enableMouseOver(0);
    stage.addChild(castle)
    stage.addChild(pScreen);

    stage.update();
};



/*#########################################################################

                 Game Events

#########################################################################*/

//ticker events
tick = function(event) {
    errorTextcd();
    
    if (document.getElementById("cash")==null) {
        createjs.Sound.stop()
        clearStage();
        onGame = 0
    } else {
        keyboards()
    }

    if (!createjs.Ticker.getPaused()) {
        timer();//countdown of next wave
        extraAnimate(); // adds extra animation
        if (monsterDead!=false) {
            animateDead(); //animation when monster die            
        }
        if (bombs.length!=0){
            bombHit()
            bombCd()
        }

        monsterMovement();//controls monster movement
        powerCd(); // cooldown for powers
        monsterEffect();//controls effect on monster
        towerAttacks();//check for tower attack
        if (shots!=false) {
            shotsHit();//check for collison
            shotsMovement();//controls movement of shots fired
        };


    };

    stage.update(event); // important!!
};


//to show any error to player
errorTextcd = function() {
    if (errorCD) {
        if (errorCD==1) {
            document.getElementById("errorText").innerHTML = ""
        }
        errorCD--;
    }    
}

//timer for next wave
timer = function() {
    if (lastMon) {
        if (lastMon.y>0) {
            countDown = 160;
            lastMon = false
        }
    }
    else if (countDown==0) {
        nextWave()
        countDown--
    } 
    else if (countDown>0) {
        countDown--;
        document.getElementById("cdTimer").innerHTML = Math.round(countDown/2)/10;
    }
}

//extra animations
extraAnimate = function() {
    if (castleHit.cd>0) {
        castleHit.cd--
    } 
    else if (castleHit.cd==0) {
        stage.removeChild(castleHit)
        castleHit.cd--
    };
    if (castleBlock.cd>0) {
        castleBlock.cd--
    } 
    else if (castleBlock.cd==0) {
        stage.removeChild(castleBlock)
        castleBlock.cd--
    };
};

//check if monster is dead
isDead = function(index) {
    var monsterKill = new createjs.Bitmap(monsterKillI);
    monsterKill.x = monsters[index].x-5;
    monsterKill.y = monsters[index].y;
    monsterKill.cd = 3;
    stage.addChild(monsterKill)
    monsterDead.push(monsterKill)

    stage.removeChild(monsters[index]);
    cashy+=monsters[index].bounty;
    scorez+=monsters[index].bounty;
    monsters.splice(index,1);
    document.getElementById("cash").innerHTML= cashy;
    document.getElementById("score").innerHTML= scorez;


}

function animateDead() {
    var kill = []
    for (var i=0;i<monsterDead.length;i++) {
        if (monsterDead[i].cd>0) {
            monsterDead[i].cd--
        }
        else if (monsterDead[i].cd==0) {
            kill.push(i)
        }
    }
    if (kill.length!=0) {
        kill.sort(function(a,b){return b-a});
        for (var i=0;i<kill.length;i++) {
            stage.removeChild(monsterDead[kill[i]])
            monsterDead.splice(kill[i],1)
        }        
    }
}

//check range
inRange = function(tower,monster) {
    var dx=Math.abs(tower.x+16-(monster.x+monster.w/2));
    var dy=Math.abs(tower.y+16-(monster.y+monster.h));
    var dist=Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
    if (dist<=tower.range) {
        return true
    }
    else {
        return false
    }
};


/*#########################################################################

                 Game Buttons

#########################################################################*/
//error text
error= function(txt) {
    document.getElementById("errorText").innerHTML = txt;
    errorCD = 50;
}

//toggle aoe
toggleAoe = function() {
    if (towers.length == 0) {
        towerType = false;
        towerName = false;
        $('.towerBtn').removeClass('selected');
    } else {
        for (var i=0;i<towers.length;i++) {
            if (towers[i]) {
                if (towerType) {
                    towers[i].addChild(towers[i].aoe);
                } else {
                    towerName = false;
                    $('.towerBtn').removeClass('selected');
                    towers[i].removeChild(towers[i].aoe);
                }
            } else {
                continue;
            }
        }
    }
}

// fast forward
ff = function(ffSpeed) {
    createjs.Ticker.setFPS(ffCount[ffSpeed]);
    speed = ffCount[ffSpeed];
}

//next wave
nextWave = function() {
    if (!createjs.Ticker.getPaused()) {
        wave++;
        document.getElementById("cdTimer").innerHTML = 0;
        document.getElementById("wave").innerHTML = wave;

        if (wave%12 == 0){
            monsterData["wizard"]["damage"]+=2            
            monsterData["mario"]["damage"]+=1
            monsterData["warrior"]["damage"]+=1
            monsterData["armored"]["damage"]+=1
            monsterData["boss"]["damage"]+=5
        }
        if (wave%10 == 0) {
            cMonster("boss",1)
            if(wave<=42){
                monsterData['boss']['hp']*=3       
            }else{
                monsterData['boss']['hp']*=1.6
            }
            if (wave<=30){
                monsterData["mario"]["bounty"]+=1
                monsterData["warrior"]["bounty"]+=1
                monsterData["armored"]["bounty"]+=1 
                monsterData["boss"]["bounty"]+=5              
            }
            else if(wave<=60){                
                monsterData["mario"]["bounty"]+=2
                monsterData["warrior"]["bounty"]+=2
                monsterData["armored"]["bounty"]+=2
                monsterData["boss"]["bounty"]+=10 
            }else{
                monsterData["mario"]["bounty"]+=3
                monsterData["warrior"]["bounty"]+=3
                monsterData["armored"]["bounty"]+=3 
                monsterData["boss"]["bounty"]+=15               
            }
        }
        else if (wave%7 ==0) {
            cMonster("wizard",5)
            if(wave<=42){
                monsterData['wizard']['hp']*=3
                monsterData["wizard"]["bounty"]+=2                
            }else{
                monsterData['wizard']['hp']*=1.5
                monsterData["wizard"]["bounty"]+=3  
            }
        }
        else if (wave%5 == 0) {
            cMonster("armored",8);
            if (wave<=42){
                monsterData["armored"]["hp"]*=2.4                
            }else{
                monsterData["armored"]["hp"]*=1.4
            }
        }
        else if (wave%3 == 0) {
            cMonster("warrior",6);
            if (wave<=42){
                monsterData["warrior"]["hp"]*=2                
            }else{                
                monsterData["warrior"]["hp"]*=1.2
            }
        }
        else {
            cMonster("mario",9);
            if (wave<=42){
                monsterData["mario"]["hp"]*=1.4                
            }else{                
                monsterData["mario"]["hp"]*=1.05
            }
        }  

        //heal the castle
        fountainHeal()      
    }
}

//toggle pause
togglePause = function() {
    if (!gameRunning) {
        gameRunning=1
        $(".powerBtn").removeClass('selected')
    }

    var paused = createjs.Ticker.getPaused();
    createjs.Ticker.setPaused(!paused);
    if (!paused) {
        stage.addChild(pScreen);
        stage.enableMouseOver(0);
    } else {    
        if (!onGame){
            onGame = 1
        }
        stage.removeChild(pScreen);
        stage.enableMouseOver();
    }
    document.getElementById("pauseBtn").value = !paused ? "play" : "pause";

    //stop animation when paused
    if (powerFreeze==0){
        stopAnimate(!paused)
    } else{stopAnimate(true)}

};

stopAnimate = function(condition) {
    for (var i=0;i<monsters.length;i++) {
        for (var j=0;j<4;j++) {
            if (condition) {
                monsters[i].getChildAt(1).gotoAndStop();
                break;
            } else {
                monsters[i].getChildAt(1).gotoAndPlay();
                break;
            }
        }
    }
    for (var i=0;i<bombs.length;i++) {
        if (condition){
            bombs[i].gotoAndStop();
        }else{bombs[i].gotoAndPlay();}
        
    }
}

//game over
isOver = function() {
    createjs.Sound.play('gameOverSound').volume=.2
    gameRunning=0
    var minWave = []
    for (var i=0;i<monsters.length;i++) {
        minWave.push(monsters[i].level)
    }
    wave = Math.min.apply(Math, minWave)-1

    if (Meteor.user() !== null) {
        var gameRecord = {
            createdBy: Meteor.userId(),
            warriorName: (Meteor.user().username) ? 
                Meteor.user().username : Meteor.user().profile.name ,
            waveCleared: wave,
            score: scorez,
            date: new Date()
        }

        Meteor.call('gameOver', Meteor.userId());
        delete localStorage.towerDefense
        Meteor.call('pushRanking', gameRecord);

        if (confirm("Game Over!!"+"\n"+
            "Do you want to view the leaderboard?") == true) {  
            clearStage();
            Router.go('/leaderBoard');
        } else { gameOverAlert(); }
    } else {
        delete localStorage.towerDefense 
        gameOverAlert(); 
    }
}

gameOverAlert = function() {
    if (confirm("Game Over!!"+"\n"+"Do you want to restart?") == true) {
        clearStage();
        setNewGame();
        newGame();
    } else {
        stage.removeChild(stage)
        createjs.Ticker.setPaused(true);
        stopAnimate(true)
        pScreen.getChildAt(1).text = "GAME OVER"
        stage.addChild(pScreen)
        document.getElementById('pauseBtn').value = 'Restart';
    }

}

/*#########################################################################

                 Behind the Game 

#########################################################################*/
//remove canvas
clearStage = function() {
    createjs.Ticker.off("tick", gameTicker);
    stage.removeAllChildren();
}

clearIcon = function(){
    document.getElementById("freezeIcon").innerHTML = ""
    document.getElementById("meteoriteIcon").innerHTML = ""
    document.getElementById("invincibleIcon").innerHTML = ""
    document.getElementById("ddIcon").innerHTML = ""

    document.getElementById('freezeCd').innerHTML = ''
    document.getElementById('invincibleCd').innerHTML = ''
    document.getElementById('invincibleBlock').innerHTML = ''
    document.getElementById('ddCd').innerHTML = ''
}
//set up new game
setNewGame = function() {
    gameTicker = createjs.Ticker.on("tick", tick); 
    createjs.Ticker.setPaused(true);
    createjs.Ticker.setFPS(20);   

    stage.addChild(background)
    grid(); //load grid onto map 

    pScreen.getChildAt(1).text = "GAME PAUSED"
}

//adds image back to canvas
addition = function(arrays) {
    for (var i=0;i<arrays.length;i++) {
        stage.addChild(arrays[i]);
    };
};


//highlight grid when tower is selected
targetGrid = new createjs.Shape();
targetGrid.graphics.beginStroke("#fff").drawRect(0,0,32,32);

//show tower image when hover over grid
gridData = function() {
    t1i = new createjs.Bitmap("/images/gameImages/light_tower.png");
    t1a = new createjs.Shape();
    t1a.graphics.beginStroke("#f00").drawCircle(16,16,
        towerData["lightTower"]["range"][0]);
    //t1a.alpha = .5;
    t1 = new createjs.Container();
    t1.addChild(t1i,t1a);

    t2i = new createjs.Bitmap("/images/gameImages/ice_tower.png");
    t2a = new createjs.Shape();
    t2a.graphics.beginStroke("#f00").drawCircle(16,16,
        towerData["iceTower"]["range"][0]);
    //t2a.alpha = .5;
    t2 = new createjs.Container();
    t2.addChild(t2i,t2a);

    t3 = new createjs.Bitmap("/images/gameImages/regenTower_1.png");

    hoverTower = {"lightTower": t1, "iceTower":t2, "fountain":t3}

};

//paused screen
pauseScreen = function() {
    var shade = new createjs.Shape();
    shade.graphics.beginFill("#d3d3d3").drawRect(0, 0,
        stage.canvas.width,stage.canvas.height);
    shade.alpha = .85

    var label = new createjs.Text("GAME PAUSED", "bold 40px Arial", "#FFFFFF");
    label.textAlign = "center";
    label.textBaseline = "middle";
    label.x = stage.canvas.width/2;
    label.y = stage.canvas.height/2;

    pScreen = new createjs.Container();

    pScreen.addChild(shade, label);
}

//grid
grid = function() {
    //hitarea of map
    hitsT=[]
    //left area
    hitsT[0] = []
    hit0=[2, stage.canvas.height/32]

    for (var i=0;i<hit0[0];i++) {
        hitsT[0][i] = [];
    };

    for (var i=0;i<hit0[0];i++) {
        for (var j=0;j<hit0[1];j++) {
            hitsT[0][i][j] = new createjs.Shape();
            hitsT[0][i][j].graphics.beginFill("#f00").drawRect(32*i,32*j,32,32);
            hitsT[0][i][j].alpha=0.01;
            hitsT[0][i][j].coord=[32*i,32*j]
            hitsT[0][i][j].pt=[0,i,j];
            hitsT[0][i][j].on("mouseover", buildTower);
            hitsT[0][i][j].on("mouseout", buildTower);
            hitsT[0][i][j].on("click", buildTower); 
            stage.addChild(hitsT[0][i][j]);
        };
    };
    //bottom area
    hitsT[1] = []
    hit1=[(stage.canvas.width/32)-4,1]

    for (var i=0;i<hit1[0];i++) {
        hitsT[1][i] = [];
    };

    for (var i=0;i<hit1[0];i++) {
        for (var j=0;j<hit1[1];j++) {
            hitsT[1][i][j] = new createjs.Shape();
            hitsT[1][i][j].graphics.beginFill("#f00").drawRect(64+32*i,
                (stage.canvas.height-32),32,32);
            hitsT[1][i][j].alpha=0.01;
            hitsT[1][i][j].coord=[64+32*i,stage.canvas.height-32];
            hitsT[1][i][j].pt=[1,i,j];
            hitsT[1][i][j].on("mouseover", buildTower);
            hitsT[1][i][j].on("mouseout", buildTower);
            hitsT[1][i][j].on("click", buildTower); 
            stage.addChild(hitsT[1][i][j]);
        };
    };
    //top area
    hitsT[2] = []
    hit2=[(stage.canvas.width/32)-6,2]

    for (var i=0;i<hit2[0];i++) {
        hitsT[2][i] = [];
    };

    for (var i=0;i<hit2[0];i++) {
        for (var j=0;j<hit2[1];j++) {
            hitsT[2][i][j] = new createjs.Shape();
            hitsT[2][i][j].graphics.beginFill("#f00").drawRect(128+32*i,
                32*j,32,32);
            hitsT[2][i][j].alpha=0.01;
            hitsT[2][i][j].coord=[128+32*i,32*j];
            hitsT[2][i][j].pt=[2,i,j];
            hitsT[2][i][j].on("mouseover", buildTower);
            hitsT[2][i][j].on("mouseout", buildTower);
            hitsT[2][i][j].on("click", buildTower); 
            stage.addChild(hitsT[2][i][j]);
        };
    };
    //left inner area
    hitsT[3] = []
    hit3=[2,12]

    for (var i=0;i<hit3[0];i++) {
        hitsT[3][i] = [];
    };

    for (var i=0;i<hit3[0];i++) {
        for (var j=0;j<hit3[1];j++) {
            hitsT[3][i][j] = new createjs.Shape();
            hitsT[3][i][j].graphics.beginFill("#f00").drawRect(128+32*i,
                64+32*j,32,32);
            hitsT[3][i][j].alpha=0.01;
            hitsT[3][i][j].coord=[128+32*i,64+32*j];
            hitsT[3][i][j].pt=[3,i,j];
            hitsT[3][i][j].on("mouseover", buildTower);
            hitsT[3][i][j].on("mouseout", buildTower);
            hitsT[3][i][j].on("click", buildTower); 
            stage.addChild(hitsT[3][i][j]);
        };
    };       
    //bottom inner area
    hitsT[4] = []
    hit4=[16,2]

    for (var i=0;i<hit4[0];i++) {
        hitsT[4][i] = [];
    };

    for (var i=0;i<hit4[0];i++) {
        for (var j=0;j<hit4[1];j++) {
            hitsT[4][i][j] = new createjs.Shape();
            hitsT[4][i][j].graphics.beginFill("#f00").drawRect(192+32*i,
                stage.canvas.height-160+32*j,32,32);
            hitsT[4][i][j].alpha=0.01;
            hitsT[4][i][j].coord=[192+32*i,stage.canvas.height-160+32*j];
            hitsT[4][i][j].pt=[4,i,j];
            hitsT[4][i][j].on("mouseover", buildTower);
            hitsT[4][i][j].on("mouseout", buildTower);
            hitsT[4][i][j].on("click", buildTower); 
            stage.addChild(hitsT[4][i][j]);
        };
    };
    //top inner area
    hitsT[5] = []
    hit5=[14,2]

    for (var i=0;i<hit5[0];i++) {
        hitsT[5][i] = [];
    };

    for (var i=0;i<hit5[0];i++) {
        for (var j=0;j<hit5[1];j++) {
            hitsT[5][i][j] = new createjs.Shape();
            hitsT[5][i][j].graphics.beginFill("#f00").drawRect(256+32*i,
                128+32*j,32,32);
            hitsT[5][i][j].alpha=0.01;
            hitsT[5][i][j].coord=[256+32*i,128+32*j];
            hitsT[5][i][j].pt=[5,i,j];
            hitsT[5][i][j].on("mouseover", buildTower);
            hitsT[5][i][j].on("mouseout", buildTower);
            hitsT[5][i][j].on("click", buildTower); 
            stage.addChild(hitsT[5][i][j]);
        };
    };
    //bot inner-most area
    hitsT[6] = []
    hit6=[12,2]

    for (var i=0;i<hit6[0];i++) {
        hitsT[6][i] = [];
    };

    for (var i=0;i<hit6[0];i++) {
        for (var j=0;j<hit6[1];j++) {
            hitsT[6][i][j] = new createjs.Shape();
            hitsT[6][i][j].graphics.beginFill("#f00").drawRect(256+32*i,
                256+32*j,32,32);
            hitsT[6][i][j].alpha=0.01;
            hitsT[6][i][j].coord=[256+32*i,256+32*j];
            hitsT[6][i][j].pt=[6,i,j];
            hitsT[6][i][j].on("mouseover", buildTower);
            hitsT[6][i][j].on("mouseout", buildTower);
            hitsT[6][i][j].on("click", buildTower); 
            stage.addChild(hitsT[6][i][j]);
        };
    };
    //left inner-most area
    hitsT[7] = []
    hit7=[2,2]

    for (var i=0;i<hit7[0];i++) {
        hitsT[7][i] = [];
    };

    for (var i=0;i<hit7[0];i++) {
        for (var j=0;j<hit7[1];j++) {
            hitsT[7][i][j] = new createjs.Shape();
            hitsT[7][i][j].graphics.beginFill("#f00").drawRect(256+32*i,
                192+32*j,32,32);
            hitsT[7][i][j].alpha=0.01;
            hitsT[7][i][j].coord=[256+32*i,192+32*j];
            hitsT[7][i][j].pt=[7,i,j];
            hitsT[7][i][j].on("mouseover", buildTower);
            hitsT[7][i][j].on("mouseout", buildTower);
            hitsT[7][i][j].on("click", buildTower); 
            stage.addChild(hitsT[7][i][j]);
        };
    };
    //right inner area
    hitsT[8] = []
    hit8=[2,10]

    for (var i=0;i<hit8[0];i++) {
        hitsT[8][i] = [];
    };

    for (var i=0;i<hit8[0];i++) {
        for (var j=0;j<hit8[1];j++) {
            hitsT[8][i][j] = new createjs.Shape();
            hitsT[8][i][j].graphics.beginFill("#f00").drawRect(704+32*i,
                128+32*j,32,32);
            hitsT[8][i][j].alpha=0.01;
            hitsT[8][i][j].coord=[704+32*i,128+32*j];
            hitsT[8][i][j].pt=[8,i,j];
            hitsT[8][i][j].on("mouseover", buildTower);
            hitsT[8][i][j].on("mouseout", buildTower);
            hitsT[8][i][j].on("click", buildTower); 
            stage.addChild(hitsT[8][i][j]);
        };
    };
    //right area
    hitsT[9] = []
    hit9=[2,17]

    for (var i=0;i<hit9[0];i++) {
        hitsT[9][i] = [];
    };

    for (var i=0;i<hit9[0];i++) {
        for (var j=0;j<hit9[1];j++) {
            hitsT[9][i][j] = new createjs.Shape();
            hitsT[9][i][j].graphics.beginFill("#f00").drawRect(832+32*i,
                32*j,32,32);
            hitsT[9][i][j].alpha=0.01;
            hitsT[9][i][j].coord=[832+32*i,32*j];
            hitsT[9][i][j].pt=[9,i,j];
            hitsT[9][i][j].on("mouseover", buildTower);
            hitsT[9][i][j].on("mouseout", buildTower);
            hitsT[9][i][j].on("click", buildTower); 
            stage.addChild(hitsT[9][i][j]);
        };
    };
};



