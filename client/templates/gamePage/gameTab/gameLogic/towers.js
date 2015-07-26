/*#########################################################################

                 Tower Objects

#########################################################################*/

//create tower data
addTower = function() {
    //light tower
    var plasma = MonsterTower.find({type:"plasma"},{sort:{level:1}}).fetch();
    towerData["lightTower"] ={
        "image":[lightTower1,lightTower2,lightTower3,lightTower4], 
        "w":30,
        "h":30,//dimension of shots
        "type":"Single", 
        "splash":[false],
        "effect":false,
        "range": [plasma[0].range,  plasma[1].range,  plasma[2].range,  plasma[3].range], 
        "cost":  [plasma[0].cost,   plasma[1].cost,   plasma[2].cost,   plasma[3].cost], 
        "cd":    [plasma[0].cd,     plasma[1].cd,     plasma[2].cd,     plasma[3].cd],
        "damage":[plasma[0].damage, plasma[1].damage, plasma[2].damage, plasma[3].damage], 
        "shot":light, 
        "speed":14//speed of shot
    };

    var glyph = MonsterTower.find({type:"glyph"},{sort:{level:1}}).fetch();
    //ice tower
    towerData["iceTower"] ={
        "image":[iceTower1,iceTower2,iceTower3,iceTower4], 
        "w":30,
        "h":30,//dimension of shots
        "type":"Splash", 
        "splash":      [glyph[0].splash,   glyph[1].splash,   glyph[2].splash,   glyph[3].splash], 
        "effect":true, 
        "slow":        [glyph[0].slow,     glyph[1].slow,     glyph[2].slow,     glyph[3].slow], 
        "slowDuration":[glyph[0].duration, glyph[1].duration, glyph[2].duration, glyph[3].duration],
        "range":       [glyph[0].range,    glyph[1].range,    glyph[2].range,    glyph[3].range], 
        "cost":        [glyph[0].cost,     glyph[1].cost,     glyph[2].cost,     glyph[3].cost], 
        "cd":          [glyph[0].cd,       glyph[1].cd,       glyph[2].cd,       glyph[3].cd],
        "damage":      [glyph[0].damage,   glyph[1].damage,   glyph[2].damage,   glyph[3].damage], 
        "shot":ice, 
        "speed":10
    };

    var ft = MonsterTower.find({type:"fountain"},{sort:{level:1}}).fetch();
    //fountain
    towerData["fountain"] ={
        "image":[fountain1,fountain2,fountain3,fountain4],
        "type":"Heal", 
        "splash":[false],
        "effect":false,
        "cost":   [ft[0].cost,   ft[1].cost,   ft[2].cost,   ft[3].cost], 
        "cd":     [ft[0].cd,     ft[1].cd,     ft[2].cd,     ft[3].cd],
        "damage": [ft[0].damage, ft[1].damage, ft[2].damage, ft[3].damage]
    };
}


//buying tower
buyTower = function(type) {
    towerType = towerData[type]
    towerName = type

    var name = "Name: "
    var splash = ""
    var effect = "" 
    var basic = "Heal: " + towerType["damage"][0] + "<br>" +
        "Range: Global" + "<br>"

    if (towers.length != 0) {
        toggleAoe();        
    }
    if (type=='iceTower'){
        name += "Ice Tower" + "<br>"
    } else if (type=='lightTower') {
        name += "Light Tower" + "<br>"
    } else {
        name += "Fountain" + "<br>"
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
    if (type!='fountain') {
        basic = 
        "Dmg: " + towerType["damage"][0] + "<br>" +
        "Range: " + towerType["range"][0]/32 + "<br>" +
        "Atk Rate: " + towerType["cd"][0]/20 + "<br>" +
        splash +
        effect 
    }

    stage.removeChild(targetGrid);
    document.getElementById("infoText").innerHTML = 
    name + 
    "Dmg Type: " + towerType["type"] + "<br>" +
    basic +
    "Cost: " + towerType["cost"][0] + "<br>"

    if (type=='fountain') {
        if (Meteor.user()!==null) { 
            if (!Meteor.user().ability_regen){
                towerType = false
                towerName = false     
                error("Please buy the <span class='item'>'Leoric" +
                    "'s " + "Jewellery'</span> " + 
                    "to build the <span class='item'>fountain</span>.")           
            }        
        } else {
            towerType = false
            towerName = false       
            error("Please sign in to build the <span class='item'>Fountain</span>.")
        }
    }
};

//building tower onto canvas
buildTower = function(event) {
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
    if (event.type == "click" && (!createjs.Ticker.getPaused() || wave==0)) {
        if (towerType && towerType!=true) {
            if (towerName!='fountain' && towerType["cost"][0]<=cash) {
                $('.towerBtn').removeClass('selected');                
                stage.removeChild(hoverT);
                event.target.mouseEnabled = false;
                var newImage = new createjs.Bitmap(towerType["image"][0]);
                var newTower = new createjs.Container();
                newTower.mouseChildren = false;
                newTower.bg = event.target.pt;
                newTower.name = towerName;
                newTower.num = towers.length;
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
                Math.round(attBonus/100*newTower.damage);
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
                newTower.aoe.graphics.beginStroke("#f00").drawCircle(16,16,newTower.range);
                //newTower.aoe.alpha = .5;
                newTower.addChild(newImage);
                towers.push(newTower);
                stage.addChild(newTower);
                cash -= towerType["cost"][0];
                document.getElementById("cash").innerHTML = cash;
                towerType = false;
                towerName = false;
                toggleAoe();
            } 
            else if (towerType["cost"][0]<=cash) {
                $('.towerBtn').removeClass('selected');                
                stage.removeChild(hoverT);
                event.target.mouseEnabled = false;
                var newImage = new createjs.Bitmap(towerType["image"][0]);
                var newTower = new createjs.Container();
                newTower.mouseChildren = false;
                newTower.bg = event.target.pt;
                newTower.name = towerName;
                newTower.num = healers.length;
                newTower.level = 1;
                newTower.maxLevel = towerType["damage"].length;
                newTower.maxCd = towerType["cd"][0];
                newTower.cd = 0;
                newTower.damage = towerType["damage"][0];
                newTower.effect = towerType["effect"];
                newTower.cost = towerType["cost"][1];
                newTower.sell = towerType["cost"][0];
                newTower.x = event.target.coord[0];
                newTower.y = event.target.coord[1];
                newTower.coord = event.target.coord
                newTower.on("click", handleTower); 
                newTower.splash = towerType["splash"][0];

                newTower.addChild(newImage);
                healers.push(newTower);
                stage.addChild(newTower);
                cash -= towerType["cost"][0];
                document.getElementById("cash").innerHTML = cash;
                regen+=newTower.damage
                document.getElementById("regen").innerHTML = regen;
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
handleTower = function(event) {
    if (event.type=="click") {
        $('.towerBtn').removeClass('selected');
        towerType = true;
        towerName = false;

        for (var i=0;i<towers.length;i++) {
            if (towers[i]) {
                towers[i].removeChild(towers[i].aoe)                
            }
        }

        targetGrid.x=event.target.coord[0];
        targetGrid.y=event.target.coord[1];
        stage.addChild(targetGrid);
        targetTower = event.target
        updateInfo(targetTower);
        if (event.target.name!='fountain') {            
            event.target.addChild(event.target.aoe);
        }
    }
};

//update tower info
updateInfo = function(tower) {
    var effect = ""
    var splash = ""
    var basic = ""
    var sellPrice = (wave==0)? tower.sell : Math.ceil(tower.sell*.7)

    //tower info
    if (targetTower.level<targetTower.maxLevel) {
        if (tower.name=='fountain') {            
            basic = 
            "Heal: " + tower.damage +" --> " + 
            towerData[tower.name]["damage"][tower.level] + "<br>" +
            "Range: Global" + "<br>"
        } else {
            basic = 
            "Dmg: " + tower.damage + "(+"+ tower.bonus + ")" +" --> " + 
            towerData[tower.name]["damage"][tower.level] + "<br>" +
            "Range: " + tower.range/32 + " --> " +  
            towerData[tower.name]["range"][tower.level]/32 + "<br>" +
            "Atk Rate: " + tower.maxCd/20 + " --> " +  
            towerData[tower.name]["cd"][tower.level]/20 + "<br>" 
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
        document.getElementById("infoText").innerHTML = 
        "Lvl: " + tower.level +" --> " + (tower.level+1) + "<br>" +
        basic +
        splash +
        effect +
        "<input type='button' value='Upgrade' id='upgradeBtn'>" + 
        towerData[tower.name]["cost"][tower.level] + "<br>" +
        "<input type='button' value='Sell' id='sellBtn'>" +
        sellPrice
    } else {
        if (tower.name=='fountain') {            
            basic = 
            "Heal: " + tower.damage + "<br>" +
            "Range: Global" + "<br>"
        } else {
            basic = 
            "Dmg: " + tower.damage + "(+" + tower.bonus + ")" + "<br>" +
            "Range: " + tower.range/32 +  "<br>" + 
            "Atk Rate: " + tower.maxCd/20 + "<br>"
        }
        if (tower.effect) {
            if (tower.name=="iceTower") {
                effect = "Slow: " + (tower.slow*100) + "%" + "<br>"
            }
        }
        if (tower.splash) {
            splash = "Splash: " + tower.splash/32 + "<br>" 
        };
        document.getElementById("infoText").innerHTML = 
        "Lvl: " + tower.level + "<br>" +
        basic +
        splash +
        effect +
        "Max level" + "<br>" +
        "<input type='button' value='Sell' id='sellBtn'>" +
        sellPrice
    }
};

//upgrading of tower
upgradeTower = function() {
    if (targetTower.name!='fountain' && targetTower.cost<=cash) {
        cash-=targetTower.cost
        document.getElementById("cash").innerHTML = cash
        if (targetTower.name == 'iceTower') {
            targetTower.slow = 
            towerData[targetTower.name]["slow"][targetTower.level]
            targetTower.slowDuration = 
            towerData[targetTower.name]["slowDuration"][targetTower.level]
        }
        if (targetTower.splash){
            targetTower.splash = 
            towerData[targetTower.name]["splash"][targetTower.level]; 
        };
        targetTower.sell += targetTower.cost
        targetTower.damage = 
        towerData[targetTower.name]["damage"][targetTower.level];
        targetTower.bonus = 
        Math.round(attBonus/100*targetTower.damage);
        targetTower.range = 
        towerData[targetTower.name]["range"][targetTower.level];
        targetTower.maxCd = 
        towerData[targetTower.name]["cd"][targetTower.level];
        targetTower.cost = 
        towerData[targetTower.name]["cost"][targetTower.level+1];

        targetTower.removeAllChildren()
        //updates tower image
        var newImage = new createjs.Bitmap(towerData[targetTower.name]["image"]
            [targetTower.level])
        targetTower.addChild(newImage)

        //updates aoe on canvas
        targetTower.aoe = new createjs.Shape();
        targetTower.aoe.graphics.beginStroke("#f00")
        .drawCircle(16,16,
            towerData[targetTower.name]["range"][targetTower.level]);
        targetTower.addChild(targetTower.aoe);
        //targetTower.aoe.alpha = .5;
        targetTower.level += 1;


        updateInfo(targetTower);
    } 
    else if (targetTower.cost<=cash) {
        cash-=targetTower.cost
        document.getElementById("cash").innerHTML = cash

        regen -= targetTower.damage
        targetTower.removeAllChildren()
        targetTower.sell += targetTower.cost
        targetTower.damage = 
        towerData[targetTower.name]["damage"][targetTower.level];
        targetTower.maxCd = 
        towerData[targetTower.name]["cd"][targetTower.level];
        targetTower.cost = 
        towerData[targetTower.name]["cost"][targetTower.level+1];

        //updates tower image
        var newImage = new createjs.Bitmap(towerData[targetTower.name]["image"]
            [targetTower.level])
        targetTower.addChild(newImage)

        targetTower.level += 1;

        regen += targetTower.damage
        document.getElementById("regen").innerHTML = regen
        updateInfo(targetTower);

    } else {
        error("Insufficient Cash!");
    }

};

sellTower = function() {
    var g = targetTower.bg
    hitsT[g[0]][g[1]][g[2]].mouseEnabled = true

    if (wave!=0) {
        cash += Math.ceil(targetTower.sell*.7)
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
    if (targetTower.name=="fountain") {
        healers[targetTower.num] = false
    } else {
        towers[targetTower.num] = false;        
    }

};

/*#########################################################################

                 Tick Events

#########################################################################*/
//tower attacking
towerAttacks = function() {
    if (towers!=false) {
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
