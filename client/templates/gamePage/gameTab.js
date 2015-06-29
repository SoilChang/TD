Template.gameTab.events({
	'mouseenter #c-game-closeButton': function(){
		$('#c-game-closeButton').css({'margin-left':'1015px', 'width': '40px', 'height': '40px'});
	},
	'mouseleave #c-game-closeButton': function(){
		$('#c-game-closeButton').css({'margin-left':'1020px', 'width': '30px', 'height': '30px'});
	},

	'click #pauseBtn': function() {
		togglePause();
	},
	'click #restartBtn': function(){
		restart();
	},
	'click #rangeBtn': function(){
		towerType=(towerType) ? false:true;
		toggleAoe();
	},
	'click #nextBtn': function(){
		nextWave();
	},
    'click #ffBtn': function(){
        ff();
    },
	'click #iceBtn': function(){
		buyTower('iceTower');
	},
	'click #lightBtn': function(){
		buyTower('lightTower')
	},
	'click #freezePower': function(){
		power('freeze')
	}

});
var attBonus, hpBonus, armorBonus, gameState
attBonus = 0;
hpBonus = 0;
armorBonus = 0;
gameState = 0;

Template.gameTab.helpers({
    checker:function() {
        if(Meteor.user() !== null && Meteor.loggingIn() !== true){
<<<<<<< HEAD
            hpBonus = Meteor.user().hpBonus;
            attBonus = Meteor.user().attackBonus;
            armorBonus = Meteor.user().armourBonus;
=======
            test2 = Meteor.user().hpBonus;
>>>>>>> origin/master
        }
    }

});



Template.gameTab.onRendered(function() {
	$('#c-game-left_hand_menu').css({'left':'180px', 'height':'540px'});
	$('#c-game-left_hand_menu').animate({left:'0px',height:'610'},1000);
	$('#btmMenu').css({'top':'480px'});
	$('#btmMenu').animate({top:'550px'},1000);
    if (!gameState) {
        init();
    } else {
        continueGame();
    }
});


"use strict";
/*content page
-Game Data
-Initializing
-Power Effects
-Tower Objects
-Monster Objects
-Game Events
-Game Buttons
-Behind the Game*/


var stage, hitsT, hit0, hit1, hit2, hit3, hit4, hit5, hit6, hit7, hit8, hit9,
gameProgress, cash, score, health, coordinates, time, castleData, wave, //game data
s1, s2, s3,//monster sprites
backgroundI, background, castleIm, castleI, castle, //canvas images & variable
castleLifebar,castleHp, castleHpI, castleText,
heroI, lightTowerI, iceTowerI, //tower images
itS, ice, ltS, light,
healthbarI, healthbar, marioI, warriorI, armoredI,//monster images
towerData, towers, towerType, towerName, targetTower, towerNum,//tower variables
monsterData, monsters, //monster variables
shots, //shots variables
t1, t1i, t1a, t2, t2i, t2a, hoverTower, hoverGrid, hoverT,
checkGG, ffCount, ffCounter, errorCD, countDown, lastMon, pScreen

/*#########################################################################

                Game Data

#########################################################################*/
castleData = {"hp":20, "armor":0,"attack":0,"regen":0}
gameProgress = {} //saved game
monsterData = {} //types of monsters
monsters = [] //monsters on map
shots = [] //shots on map
towerData = {} //types of towers
towerNum = 0 //index of tower being built
towers = []   //towers currently on map
targetTower = false //selected tower on map
towerType = false //selected tower to buy
towerName = false 
hoverGrid = false //identify current grid
hoverT = false //image of tower selected to buy
cash = 40;
health = castleData["hp"];
wave = 0;
score = 0;
checkGG = 0;
ffCount = [20,40,80]
ffCounter = 1
errorCD = 0
countDown = 0
lastMon = false
coordinates = [
[96, 0],
[96, 480],
[800, 480],
[800, 96],
[224, 96],
[224, 352],
[672, 352],
[672, 224],
[384, 224]
];



/*#########################################################################

                Initializing

#########################################################################*/

function init() {
    stage = new createjs.Stage("playingField");
    stage.enableMouseOver();

    pauseScreen(); //load pause screen in canvas
    imageload(); //load image into canvas
    grid(); //load grid onto map
    addTower(); //creates tower data
    gridData(); //adds grid data into canvas
    addMonster(); //creates monster data
    //line of creep path
    //path();

    //update castle with equipment bonus
    castleData["armor"] = armorBonus;
    castleData["attack"] = attBonus;

    //edit UI
    document.getElementById("pauseBtn").value = "start";
    document.getElementById("armor").innerHTML = castleData["armor"]; 
    document.getElementById("bonus").innerHTML = castleData["attack"];
    document.getElementById("regen").innerHTML = castleData["regen"]

    document.getElementById("score").innerHTML = score; 
    document.getElementById("cash").innerHTML = cash;
    document.getElementById("wave").innerHTML = wave; 
    document.getElementById("health").innerHTML = health;
    document.getElementById("cdTimer").innerHTML = (countDown/20);

    // creates ticks
    if (!gameState) {
        createjs.Ticker.on("tick", tick);
        gameState=1
    };
    createjs.Ticker.setPaused(true);
    createjs.Ticker.setFPS(20);

    stage.update();
};

function continueGame() {
    stage = new createjs.Stage("playingField");
    stage.enableMouseOver();

    stage.addChild(background);
    stage.addChild(castle);

    grid();

    castleData["armor"] = armorBonus
    castleData["attack"] = attBonus

    document.getElementById('pauseBtn').value = 'play';
    document.getElementById("armor").innerHTML = castleData["armor"]; 
    document.getElementById("bonus").innerHTML = castleData["attack"];
    document.getElementById("regen").innerHTML = castleData["regen"]

    document.getElementById("score").innerHTML = score; 
    document.getElementById("cash").innerHTML = cash;
    document.getElementById("wave").innerHTML = wave; 
    document.getElementById("health").innerHTML = health;
    document.getElementById("cdTimer").innerHTML = (countDown/20);

    if (towers) {
        addition(towers);    
        for (var i=0;i<towers.length;i++) {
            var t = towers[i].bg;
            hitsT[t[0]][t[1]][t[2]].mouseEnabled = false;
        }
    }
    if (monsters) {
        addition(monsters);
    }
    if (shots) {
        addition(shots);
    }


    stage.addChild(pScreen);
}

function saving() {

}



function path() {
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
function imageload() {
    //background image
    backgroundI = new Image();
    backgroundI.src = "/images/gameImages/firstStage.png"
    //load background
    background = new createjs.Bitmap(backgroundI);
    stage.addChild(background);

    //castle image
    castleIm = new Image();
    castleIm.src = "/images/gameImages/castle64.png"
    castleI = new createjs.Bitmap(castleIm);

    castleHp = new Image();
    castleHp.src = "/images/gameImages/castleLifebar.png"
    castleHpI = new createjs.Bitmap(castleHp);
    castleHpI.y = -15
    castleHpI.sourceRect = new createjs.Rectangle(0,0,64,10);

    castleText = new createjs.Text(
        health + "/" + castleData["hp"] , "11px Arial", "#fff");
    castleText.y = -16
    castleText.x = 33
    castleText.textAlign = "center"
    
    castle = new createjs.Container();
    castle.addChild(castleHpI, castleI, castleText);
    castle.x = 320;
    castle.y = 192;
    stage.addChild(castle);

    //light tower
    lightTowerI = new Image();
    lightTowerI.src = "/images/gameImages/light_tower.png";
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

    //ice tower
    iceTowerI = new Image();
    iceTowerI.src = "/images/gameImages/ice_tower.png";
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

    //hp image
    healthbarI = new Image();
    healthbarI.src = "/images/gameImages/lifebar.png";

    //mario
    s1 = {
        images: ["/images/gameImages/mario.png"],
        frames: {width:21, height:40, count:32},
        animations: {
            right:[0,7],
            up:[8,15],
            left:[16,23],
            down:[24,31,'down',.7]
        }
    };
    marioI = new createjs.SpriteSheet(s1);

    //warrior
    s2 = {
        images: ["/images/gameImages/DarkNut.png"],
        frames: {width:24, height:31, count:16},
        animations: {
            right:[0,3],
            up:[4,7],
            left:[8,11],
            down:[12,15]
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

};

/*#########################################################################

                Power Effects

#########################################################################*/

function power(type) {
    if (type == "freeze") {
        for (var i=0;i<monsters.length;i++) {
            monsters[i].speed=0
            monsters[i].freezeCd = 60
        }
        stopAnimate(true);
    }
}





/*#########################################################################

                Tower Objects

#########################################################################*/
//create tower data
function addTower() {
    //light tower
    towerData["lightTower"] =
    {"image":lightTowerI, "w":30, "h":30,//dimension of shots
    "type":"Single", "splash":[false],
    "effect":false,
    "range":[96,96,112,112], "cost":[15,30,60,120], "cd":[15,15,10,5],
     "damage":[10,20,40,80], "shot":light, "speed":10}

    //ice tower
    towerData["iceTower"] =
    {"image":iceTowerI, "w":30, "h":30,
    "type":"Splash", "splash":[16,32,32,48], 
    "effect":true, "slow":[.25,.4,.5,.8], "slowDuration":[20,25,30,35],
    "range":[80,80,96,96], "cost":[20,40,80,160], "cd":[20,20,15,15],
    "damage":[5,10,20,40], "shot":ice, "speed":10}
}


//buying tower
function buyTower(type) {
    var splash = ""
    var effect = ""
    towerType = towerData[type];
    towerName = type
    if (towers.length != 0) {
        toggleAoe();        
    }

    if (towerType["effect"]) {
        if (towerName=="iceTower") {
            effect = "Slow: " +  
            (towerType["slow"][0]*100) + "%" + "<br>"
        }
    }

    if (towerType["splash"][0]) {    
        splash = "Splash: " +
        towerType["splash"][0]/32 + "<br>" 
    };
    stage.removeChild(targetGrid);
    document.getElementById("infoText").innerHTML = 
    "Dmg Type: " + towerType["type"] + "<br>" +
    "Dmg: " + towerType["damage"][0] + "<br>" +
    splash +
    "Range: " + towerType["range"][0]/32 + "<br>" +
    "Atk Spd: " + towerType["cd"][0]/20 + "<br>" +
    effect +
    "Cost: " + towerType["cost"][0] + "<br>"
};

//building tower onto canvas
function buildTower(event) {
    event.target.alpha = (event.type == "mouseover") ? .3 : 0.01;
    //show tower image when over grid
    if (towerName) {
        if (event.type == "mouseover") {
            if (event.target !== hoverGrid) {
                hoverGrid = event.target
                hoverT = hoverTower[towerName]
                hoverT.x = event.target.coord[0]
                hoverT.y = event.target.coord[1]
                stage.addChild(hoverT)
                stage.addChild(hoverGrid)
            }
        } else {
            stage.removeChild(hoverT)
            hoverGrid = false
        }  
    }
    //buying of tower
    if (event.type == "click") {
        if (towerType) {
            if (towerType["cost"][0]<=cash) {
                $(function() {
                    $('.towerBtn').removeClass('selected');
                });
                stage.removeChild(hoverT);
                event.target.mouseEnabled = false;
                var newImage = new createjs.Bitmap(towerType["image"]);
                var newTower = new createjs.Container();
                newTower.mouseChildren = false;
                newTower.bg = event.target.pt;
                newTower.name = towerName;
                newTower.num = towerNum;
                newTower.level = 1;
                newTower.maxLevel = towerType["damage"].length;
                newTower.range = towerType["range"][0];
                newTower.maxCd = towerType["cd"][0];
                newTower.cd = 0;
                newTower.shot = towerType["shot"];
                newTower.w = towerType["w"];
                newTower.h = towerType["h"];
                newTower.speed = towerType["speed"]
                newTower.damage = towerType["damage"][0];
                newTower.bonus = 
                Math.round(castleData["attack"]/100*newTower.damage);
                newTower.effect = towerType["effect"];
                newTower.cost = towerType["cost"][1];
                newTower.sell = towerType["cost"][0];
                newTower.x = event.target.coord[0];
                newTower.y = event.target.coord[1];
                newTower.coord = event.target.coord
                newTower.on("click", handleTower); 
                newTower.splash = towerType["splash"][0];
                if (towerName == "iceTower") {
                    newTower.slow = towerType["slow"][0];
                    newTower.slowDuration = towerType["slowDuration"][0];
                }
                //aoe of tower range
                newTower.aoe = new createjs.Shape();
                newTower.aoe.graphics.beginStroke("#000").drawCircle(16,16,newTower.range);
                newTower.aoe.alpha = .5;
                newTower.addChild(newImage);
                towers.push(newTower);
                stage.addChild(newTower);
                towerNum++;
                cash -= towerType["cost"][0];
                document.getElementById("cash").innerHTML = cash;
                towerType = false;
                towerName = false;
                toggleAoe();
            } else {
                error("Insufficient cash")
            }
        };
    };
    
    // to save CPU, we're only updating when we need to, instead of on a tick:1
    stage.update(event);
};

//handle tower info & upgrades
function handleTower(event) {
    if (event.type=="click") {
        $(function() {
            $('.towerBtn').removeClass('selected');
        });
        towerType = false;
        towerName = false;

        targetGrid.x=event.target.coord[0];
        targetGrid.y=event.target.coord[1];
        stage.addChild(targetGrid);
        targetTower = event.target
        updateInfo(targetTower);
        event.target.addChild(event.target.aoe);
    }
};

//update tower info
function updateInfo(tower) {
    var effect = ""
    var splash = ""
    var sellPrice = Math.ceil(tower.sell*.7)

    if (wave==0) {
        sellPrice = tower.sell
    }

    if (tower.effect) {
        if (tower.name=="iceTower") {
            effect = "Slow: " + (tower.slow*100) + "%" + " --> " +  
            (towerData[tower.name]["slow"][tower.level]*100) + "%" + "<br>"
        }
    }

    if (tower.splash) {    
        splash = "Splash: " + tower.splash/32 + " --> " +  
        towerData[tower.name]["splash"][tower.level]/32 + "<br>" 
    };
    //tower info
    document.getElementById("infoText").innerHTML = 
    (targetTower.level < targetTower.maxLevel)?
    "Lvl: " + tower.level +" --> " + (tower.level+1) + "<br>" +
    "Dmg: " + tower.damage + "(+"+ tower.bonus + ")" +" --> " + 
    towerData[tower.name]["damage"][tower.level] + "<br>" +
    "Range: " + tower.range/32 + " --> " +  
    towerData[tower.name]["range"][tower.level]/32 + "<br>" +
    splash +
    "Atk Spd: " + tower.maxCd/20 + " --> " +  
    towerData[tower.name]["cd"][tower.level]/20 + "<br>" +
    effect +
    "<input type='button' value='Upgrade' onclick='upgradeTower()'>" + 
    towerData[tower.name]["cost"][tower.level] + "<br>" +
    "<input type='button' value='Sell' onclick='sellTower()'>" +
    sellPrice

    : "Lvl: " + tower.level + "<br>" +
    "Dmg: " + tower.damage + "(+" + tower.bonus + ")" + "<br>" +
    "Range: " + tower.range/32 +  "<br>" + 
    splash +
    "Atk Spd: " + tower.maxCd/20 + "<br>" +
    effect +
    "Max level" + "<br>" +
    "<input type='button' value='Sell' onclick='sellTower()'>" +
    sellPrice
};

//upgrading of tower
function upgradeTower() {
    if (targetTower.cost<=cash) {
        cash-=targetTower.cost
        document.getElementById("cash").innerHTML = cash
        if (targetTower.name == 'iceTower') {
            targetTower.slow = 
            towerData[targetTower.name]["slow"][targetTower.level]
            targetTower.slowDuration = 
            towerData[targetTower.name]["slowDuration"][targetTower.level]
        }
        targetTower.sell += targetTower.cost
        targetTower.damage = 
        towerData[targetTower.name]["damage"][targetTower.level];
        targetTower.bonus = 
        Math.round(castleData["attack"]/100*targetTower.damage);
        targetTower.range = 
        towerData[targetTower.name]["range"][targetTower.level];
        targetTower.maxCd = 
        towerData[targetTower.name]["cd"][targetTower.level];
        targetTower.cost = 
        towerData[targetTower.name]["cost"][targetTower.level];
        targetTower.aoe = new createjs.Shape();
        targetTower.aoe.graphics.beginStroke("#000")
        .drawCircle(16,16,
            towerData[targetTower.name]["range"][targetTower.level]);
        targetTower.aoe.alpha = .5;
        targetTower.level += 1;


        updateInfo(targetTower);
    } else {
        error("Insufficient Cash!");
    }

};

function sellTower() {
    targetTower.bg.mouseEnabled = true
    if (wave!=0) {
        cash += Math.ceil(targetTower.sell/2)
    } else {
        cash += targetTower.sell
    }
    var finalScore
    finalScore = score - towerData[targetTower.name]["cost"][0]
    if (finalScore<0) {
        score = 0
    } else {
        score = finalScore
    }
    document.getElementById("cash").innerHTML = cash
    document.getElementById("score").innerHTML = score
    document.getElementById("infoText").innerHTML = ""
    stage.removeChild(targetGrid)
    stage.removeChild(targetTower)
    towers[targetTower.num] = false;

};

/*#########################################################################

                Monster Objects

#########################################################################*/
//creates monster data
function addMonster() {
    //mario
    monsterData["mario"] =
    {"image":marioI, "w": 21, "h": 40, 
    "speed":3, "hp":10, "bounty":2, "damage":1}

    //warrior
    monsterData["warrior"] =
    {"image":warriorI, "w": 24, "h": 31, 
    "speed":6, "hp":6, "bounty":2, "damage":1}

    //armored
    monsterData["armored"] =
    {"image":armoredI, "w": 32, "h": 35, 
    "speed":2, "hp":20, "bounty":2, "damage":1}
}


//add monster to canvas
function cMonster(type,amt) {
    for (var i=0; i<amt; i++) {
        var mtype = monsterData[type]
        //hp appear above monster
        healthbar = new createjs.Bitmap(healthbarI)
        healthbar.sourceRect = new createjs.Rectangle(0,0,mtype["w"],3);
        healthbar.y = -5
        var m1 = new createjs.Sprite(mtype["image"])
        //add properties to monster
        var newMonster = new createjs.Container()
        newMonster.addChild(healthbar, m1)
        newMonster.pos = [0,0,1,0]
        newMonster.w = mtype["w"]
        newMonster.h = mtype["h"] 
        newMonster.x = 96 - newMonster.w/2
        newMonster.y = - newMonster.h - (amt-i-1)*newMonster.h*1.5
        newMonster.damage = mtype["damage"]
        newMonster.originSpeed = mtype["speed"]
        newMonster.speed = mtype["speed"]
        newMonster.currentHp = mtype["hp"]
        newMonster.maxHp = mtype["hp"]
        newMonster.bounty = mtype["bounty"]
        newMonster.freezeCd = 0
        newMonster.slowCd = 0
        newMonster.dead = 0
        //add monster to array
        monsters.push(newMonster)
        stage.addChild(newMonster)
        if (i==0) {
            lastMon = newMonster
        }
    }
    stage.addChild(castle)
}

//check animation direction
function cAnimation() {
    for (var i=0;i<monsters.length;i++) {
        for (var j=0;j<4;j++) {
            var checkPos = monsters[i].pos[j]
            //up
            if (j==0) {
                if (checkPos==1) {
                    monsters[i].getChildAt(1).gotoAndPlay("up")
                };
            }
            else if (j==1) {
                if (checkPos==1) {
                    monsters[i].getChildAt(1).gotoAndPlay("right")
                };
            }
            else if (j==2) {
                if (checkPos==1) {
                    monsters[i].getChildAt(1).gotoAndPlay("down")
                };
            }
            else if (j==3) {
                if (checkPos==1) {
                    monsters[i].getChildAt(1).gotoAndPlay("left")
                };
            }
        }    
    }
}

/*#########################################################################

                Game Events

#########################################################################*/

//ticker events
function tick(event) {
    errorTextcd();
    if (document.getElementById("cash")==null) {
        createjs.Ticker.setPaused(true);
    }

    if (!createjs.Ticker.getPaused()) {
        timer();//countdown of next wave


        monsterEffect();//controls effect on monster
        towerAttacks();//check for tower attack
        if (shots) {
            shotsHit();//check for collison
            shotsMovement();//controls movement of shots fired
        };
        monsterMovement();//controls monster movement


        if (health==0) {
            checkGG++;
            if (checkGG==1) {
                isOver();
                checkGG++;
            }
        }
    };

    stage.update(event); // important!!
};

//to show any error to player
function errorTextcd() {
    if (errorCD) {
        if (errorCD==1) {
            document.getElementById("errorText").innerHTML = ""
        }
        errorCD--;
    }    
}

//timer for next wave
function timer() {
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

//monster path
function monsterMovement() {
    for (var i=0;i<monsters.length;i++) {
        var mob = monsters[i]

        //section 1
        if (mob.y<=coordinates[1][1]-mob.h/2 &&
            mob.x<=coordinates[1][0]) {
            mob.y+=mob.speed;
            if (mob.pos[2]==1) {
                cAnimation();
                mob.pos[2]++;
            }
        }
        //section 2
        else if (mob.x<=coordinates[2][0]-mob.w/2 &&
            mob.y>=coordinates[2][1]-mob.h/2) {
            mob.x+=mob.speed;
            if (mob.pos[1]==0) {
                mob.pos=[0,1,0,0];
            }
            else if (mob.pos[1]==1) {
                cAnimation();
                mob.pos[1]++;
            }
        }
        //section 3
        else if (mob.y>=coordinates[3][1]-mob.h/2 &&
            mob.x>=coordinates[3][0]-mob.w/2) {
            mob.y-=mob.speed;
            if (mob.pos[0]==0) {
                mob.pos=[1,0,0,0];
            }
            else if (mob.pos[0]==1) {
                cAnimation();
                mob.pos[0]++;
            }
        }
        //section 4
        else if (mob.x>=coordinates[4][0]-mob.w/2 &&
            mob.y<=coordinates[4][1]-mob.h/2) {
            mob.x-=mob.speed;
            if (mob.pos[3]==0) {
                mob.pos=[0,0,0,1];
            }
            else if (mob.pos[3]==1) {
                cAnimation();
                mob.pos[3]++;
            }
        }
        //section 5
        else if (mob.y<=coordinates[5][1]-mob.h/2 &&
            mob.x<=coordinates[5][0]-mob.w/2) {
            mob.y+=mob.speed;
            if (mob.pos[2]==0) {
                mob.pos=[0,0,1,0];
            }
            else if (mob.pos[2]==1) {
                cAnimation();
                mob.pos[2]++;
            }
        }
        //section 6
        else if (mob.x<=coordinates[6][0]-mob.w/2 &&
            mob.y>=coordinates[6][1]-mob.h/2) {
            mob.x+=mob.speed;
            if (mob.pos[1]==0) {
                mob.pos=[0,1,0,0];
            }
            else if (mob.pos[1]==1) {
                cAnimation();
                mob.pos[1]++;
            }
        }
        //section 7
        else if (mob.y>=coordinates[7][1]-mob.h/2) {
            mob.y-=mob.speed;
            if (mob.pos[0]==0) {
                mob.pos=[1,0,0,0];
            }
            else if (mob.pos[0]==1) {
                cAnimation();
                mob.pos[0]++;
            }
        }
        //section 8
        else if (mob.x>=coordinates[8][0]-mob.w) {
            mob.x-=mob.speed;
            if (mob.pos[3]==0) {
                mob.pos=[0,0,0,1];
            }
            else if (mob.pos[3]==1) {
                cAnimation();
                mob.pos[3]++;
            }
        }
        //monster attacks castle
        else { 
            if (!mob.dead) {
                if ((mob.damage-castleData["armor"])<=0){

                } else {
                    health-=(mob.damage-castleData["armor"]);
                }
                document.getElementById("health").innerHTML = health;
                castleText.text = health + "/" + castleData["hp"]
                castleHpI.sourceRect = 
                new createjs.Rectangle(0,0,health/castleData["hp"]*64,10);
                mob.dead++;
                stage.removeChild(mob);
                monsters.splice(i,1);

            }
        }
    }
};

function monsterEffect() {
    for (var i=0;i<monsters.length;i++) {
        var mob = monsters[i]

        //control freeze
        if (mob.freezeCd>=1) {
            mob.freezeCd--;
        } 
        else if (mob.freezeCd == 0) {
            mob.speed = mob.originSpeed
            mob.freezeCd--
            stopAnimate(false);
        }

        //control slow
        if (mob.slowCd>=1) {
            mob.slowCd--;
        } 
        else if (mob.slowCd == 0) {
            mob.speed = mob.originSpeed
            mob.slowCd--
        }
    }
}

//check if monster is dead
function isDead(index) {
    stage.removeChild(monsters[index]);
    cash+=monsters[index].bounty;
    score+=monsters[index].bounty;
    monsters.splice(index,1);
    document.getElementById("cash").innerHTML= cash;
    document.getElementById("score").innerHTML= score;
}

//tower attacking
function towerAttacks() {
    if (towers) {
        for (var i=0;i<towers.length;i++) {
            if (towers[i]) {
                if (towers[i].cd>0) {
                    towers[i].cd--;
                    continue;
                };
                for (var j=0;j<monsters.length;j++) {
                    if (inRange(towers[i],monsters[j]) && monsters[j].y>=0) {
                        cShots(towers[i],monsters[j])
                        towers[i].cd = towers[i].maxCd;
                        break;
                    }
                }
            } else {
                continue;
            }
        }
    }
}

//check range
function inRange(tower,monster) {
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

//create shot animation
function cShots(tower,monster) {
    var dx=((monster.x + monster.w/2) - tower.x);
    var dy=((monster.y + monster.h) - tower.y);
    var dist=Math.sqrt(Math.pow(Math.abs(dx),2) + Math.pow(Math.abs(dy),2));
    var newShot = new createjs.Sprite(tower.shot,'fire')
    //calculations for travelling
    newShot.x = tower.x
    newShot.y = tower.y - tower.h/2
    newShot.d = dist //destination
    var degree = Math.asin(dy/dist)
    if (dx>0) {
        newShot.dX = tower.speed*Math.cos(degree)
    } else {
        newShot.dX = -tower.speed*Math.cos(degree)
    }
    newShot.dY = tower.speed*Math.sin(degree)
    newShot.c = 0 //counter for dist travelled
    //shots properties
    newShot.name = tower.name
    newShot.w = tower.w
    newShot.h = tower.h
    newShot.speed = tower.speed
    newShot.damage = tower.damage + tower.bonus
    newShot.splash = tower.splash
    newShot.effect = tower.effect
    //special properties
    if (tower.name == "iceTower") {
        newShot.slow = tower.slow
        newShot.slowDuration = tower.slowDuration
    };

    shots.push(newShot)
    stage.addChild(newShot)
};

//shots movement
function shotsMovement() {
    var shotsRemoved = [];
    for (var i=0;i<shots.length;i++) {
        if (shots[i].c<shots[i].d) {
            shots[i].x += shots[i].dX
            shots[i].y += shots[i].dY
            shots[i].c += shots[i].speed
        } else {
            shotsRemoved.push(i);
        }
    }
    if (shotsRemoved) {
        shotsRemoved.sort(function(a,b){return b-a});//sort descending order
        for (var i=0;i<shotsRemoved.length;i++) {
            stage.removeChild(shots[shotsRemoved[i]])
            shots.splice(i,1)
        }
    }
};

function shotsHit() {
    var shotsRemoved = [];
    for (var i=0;i<shots.length;i++) {
        for (var j=0;j<monsters.length;j++) {
            if (shots[i].x <= (monsters[j].x+monsters[j].w) &&
                monsters[j].x <= (shots[i].x+shots[i].w) &&
                shots[i].y <= (monsters[j].y+monsters[j].h) &&
                monsters[j].y <= (shots[i].y+shots[i].h)) {

                shotsRemoved.push(i);

                if (shots[i].splash) {
                    shotsSplash(shots[i]);
                } 
                else { //single hits
                monsters[j].currentHp-=shots[i].damage
                monsters[j].getChildAt(0).sourceRect = 
                new createjs.Rectangle(0,0,monsters[j]
                    .currentHp/monsters[j].maxHp*monsters[j].w,3);

                if (shots[i].effect && monsters[j].slowCd) {
                    shotsEffect(shots[i],monsters[j]);
                };

                //remove monster when dead
                if (monsters[j].currentHp<=0) {
                    isDead(j);
                }

                }
                break;
            }
        }
    }
    if (shotsRemoved) {
        shotsRemoved.sort(function(a,b){return b-a});//sort descending order
        for (var i=0;i<shotsRemoved.length;i++) {
            stage.removeChild(shots[shotsRemoved[i]])
            shots.splice(shotsRemoved[i],1)
        }
    }
};

//splash damage
function shotsSplash(shot) {
    var hitX = shot.x - shot.splash
    var hitY = shot.y - shot.splash
    var rangeX = shot.w + shot.splash*2
    var rangeY = shot.h + shot.splash*2
    var monstersDead = []
    for (var i=0;i<monsters.length;i++) {
        if (hitX <= (monsters[i].x+monsters[i].w) &&
            monsters[i].x <= (hitX+rangeX) &&
            hitY <= (monsters[i].y+monsters[i].h) &&
            monsters[i].y <= (hitY+rangeY)) {

            monsters[i].currentHp -= shot.damage;
            monsters[i].getChildAt(0).sourceRect = 
            new createjs.Rectangle(0,0,monsters[i]
                .currentHp/monsters[i].maxHp*monsters[i].w,3);

            if (monsters[i].currentHp<=0) {
                monstersDead.push(i)
            } 
            else { //apply effects
                if (shot.effect) {
                    shotsEffect(shot, monsters[i]);
                }
            }
        }
    }
    if (monstersDead) {
        monstersDead.sort(function(a,b){return b-a});
        for (var i=0;i<monstersDead.length;i++) {
            isDead(monstersDead[i]);
        }
    }
};

//handle effects on monsters
function shotsEffect(shot,monster) {
    if (shot.name=="iceTower") {
        if (monster.slowCd<=0 || (monster.originSpeed*(1-shot.slow))<monster.speed) {
            if (monster.speed*(1-shot.slow)<=.25) {
                monster.speed = .25
            } else {
                monster.speed *= (1-shot.slow)
            }
        } 
    }
    monster.slowCd = shot.slowDuration
}


/*#########################################################################

                Game Buttons

#########################################################################*/
//error text
function error(txt) {
    document.getElementById("errorText").innerHTML = txt;
    errorCD = 30;
}

//toggle aoe
function toggleAoe() {
    if (towers.length == 0) {
        towerType = false;
        towerName = false;
        $(function() {
            $('.towerBtn').removeClass('selected');
        });        
    } else {
        for (var i=0;i<towers.length;i++) {
            if (towers[i]) {
                if (towerType) {
                    towers[i].addChild(towers[i].aoe);
                } else {
                    towerName = false;
                    $(function() {
                        $('.towerBtn').removeClass('selected');
                    });
                    towers[i].removeChild(towers[i].aoe);
                }
            } else {
                continue;
            }
        }
    }
}

// fast forward
function ff() {
    createjs.Ticker.setFPS(ffCount[ffCounter]);
    switch(ffCounter) {
        case 1:
            ffCounter++;
            document.getElementById("ffBtn").value="2x";
            break;
        case 2:
            ffCounter=0;
            document.getElementById("ffBtn").value="4x";
            break;
        case 0:
            ffCounter++;
            document.getElementById("ffBtn").value="1x";
            break;
    }
}

//next wave
function nextWave() {
    if (!createjs.Ticker.getPaused()) {
        wave++;
        document.getElementById("cdTimer").innerHTML = 0;
        document.getElementById("wave").innerHTML = wave;
        if (wave%10 ==0) {
            monsterData["mario"]["bounty"]+=1
            monsterData["warrior"]["bounty"]+=1
            monsterData["armored"]["bounty"]+=1

            monsterData["mario"]["damage"]+=1
            monsterData["warrior"]["damage"]+=1
            monsterData["armored"]["damage"]+=1
        }
        if (wave%5 == 0) {
            cMonster("warrior",10);
            monsterData["warrior"]["hp"]*=2.4
        }
        else if (wave%3 == 0) {
            cMonster("armored",10);
            monsterData["armored"]["hp"]*=2.5
        }
        else {
            cMonster("mario",10);
            monsterData["mario"]["hp"]*=1.3
        }
    }
}

//toggle pause
function togglePause() {
    var paused = createjs.Ticker.getPaused();
    createjs.Ticker.setPaused(!paused);
    if (!paused) {
        stage.addChild(pScreen);
    } else {
        stage.removeChild(pScreen);
    }
    document.getElementById("pauseBtn").value = !paused ? "play" : "pause";

    //stop animation when paused
    stopAnimate(!paused)

};

function stopAnimate(condition) {
    for (var i=0;i<monsters.length;i++) {
        for (var j=0;j<4;j++) {
            if (condition) {
                if (monsters[i].pos[j]==2) {
                    monsters[i].getChildAt(1).gotoAndStop();
                    break;
                }
            } else {
                monsters[i].getChildAt(1).gotoAndPlay();
            }
        }
    }
}

//restart
function restart() {
    document.location.reload();
}

//game over
function isOver() {
    if (confirm("Game Over!!"+"\n"+"Do you want to restart?") == true) {
        restart();
    } else {
        togglePause();
    }
}

/*#########################################################################

                Behind the Game 

#########################################################################*/

//adds image back to canvas
function addition(arrays) {
    for (var i=0;i<arrays.length;i++) {
        stage.addChild(arrays[i]);
    };
};

//highlight grid when tower is selected
var targetGrid = new createjs.Shape();
targetGrid.graphics.beginStroke("#fff").drawRect(0,0,32,32);

//show tower image when hover over grid
function gridData() {
    t1i = new createjs.Bitmap("/images/gameImages/light_tower.png");
    t1a = new createjs.Shape();
    t1a.graphics.beginStroke("#000").drawCircle(16,16,
        towerData["lightTower"]["range"][0]);
    t1a.alpha = .5;
    t1 = new createjs.Container();
    t1.addChild(t1i,t1a);

    t2i = new createjs.Bitmap("/images/gameImages/ice_tower.png");
    t2a = new createjs.Shape();
    t2a.graphics.beginStroke("#000").drawCircle(16,16,
        towerData["iceTower"]["range"][0]);
    t2a.alpha = .5;
    t2 = new createjs.Container();
    t2.addChild(t2i,t2a);

    hoverTower = {"lightTower": t1, "iceTower":t2}

};

//paused screen
function pauseScreen() {
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
function grid() {
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
            hitsT[9][i][j].coord=[704+32*i,128+32*j];
            hitsT[9][i][j].pt=[9,i,j];
            hitsT[9][i][j].on("mouseover", buildTower);
            hitsT[9][i][j].on("mouseout", buildTower);
            hitsT[9][i][j].on("click", buildTower); 
            stage.addChild(hitsT[9][i][j]);
        };
    };
};




