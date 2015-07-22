/*#########################################################################

                 Save Game

#########################################################################*/
saving = function() {
    gameProgress['score'] = score;
    gameProgress['cash'] = cash;
    gameProgress['maxHealth'] = maxHealth;
    gameProgress['health'] = health;
    gameProgress['wave'] = wave;
    gameProgress['countDown'] = countDown;

    gameProgress['powerFreeze'] = powerFreeze;
    gameProgress['powerMeteorite'] = powerMeteorite;
    gameProgress['meteoriteOver'] = meteoriteOver;
    gameProgress['invinCd'] = castleInvincible.cd;
    gameProgress['invinBlock'] = castleInvincible.blocks;
    gameProgress['powerDD'] = powerDD;
    gameProgress['powerCD'] = powerCD;

    if (Meteor.user()!==null) {
        gameProgress['hpBonus'] = hpBonus 
        gameProgress['attBonus'] = attBonus
        gameProgress['armorBonus'] = armorBonus

        gameProgress['allyHp'] = allyHp 
        gameProgress['allyArmor'] = allyArmor
        gameProgress['allyAttack'] = allyAttack
    }

    gameProgress['tower'] = [];
    gameProgress['healer'] = [];
    gameProgress['monster'] = [];
    gameProgress['shot'] = [];

    if (towers!=false) {
        for (var i=0;i<towers.length;i++) {
            if (towers[i]==false) {
                gameProgress['tower'].push(false)
                continue
            }
            var tObj = {}
            tObj.name = towers[i].name
            tObj.x = towers[i].x
            tObj.y = towers[i].y
            tObj.level = (towers[i].level-1)
            tObj.bg = towers[i].bg
            gameProgress['tower'].push(tObj)
        }
    }
    if (healers!=false) {
        for (var i=0;i<healers.length;i++) {
            if (healers[i]==false) {
                gameProgress['healer'].push(false)
                continue
            }
            var hObj = {}
            hObj.name = healers[i].name
            hObj.x = healers[i].x
            hObj.y = healers[i].y
            hObj.level = (healers[i].level-1)
            hObj.bg = healers[i].bg
            gameProgress['healer'].push(hObj)
        }
    }
    if (monsters!=false) {
        for (var i=0;i<monsters.length;i++) {
            if (monsters[i].dead==1) {
                continue
            }
            var mObj = {}
            mObj.level = monsters[i].level
            mObj.name = monsters[i].name
            mObj.x = monsters[i].x
            mObj.y = monsters[i].y
            mObj.pos = monsters[i].pos
            mObj.damage = monsters[i].damage
            mObj.bounty = monsters[i].bounty
            mObj.maxHp = monsters[i].maxHp
            mObj.currentHp = monsters[i].currentHp
            mObj.speed = monsters[i].speed
            mObj.freezeCd = monsters[i].freezeCd
            mObj.slowCd = monsters[i].slowCd
            gameProgress['monster'].push(mObj)
        }
    }

    //localStorage.towerDefense = JSON.stringify(gameProgress)
    
    if (Meteor.user() !== null) {
        Meteor.call('saveGame', gameProgress, Meteor.userId());
    };
};

/*#########################################################################

                 Load Game

#########################################################################*/
creation = function(type) {
    switch (type) {
        case 'tower':
            var tTrack = gameProgress['tower']
            if (tTrack!=false) {
                for (var i=0;i<tTrack.length;i++) {
                    var t = tTrack[i]
                    if (t==false) {
                        towers.push(false)
                        continue
                    }
                    var tbg = t.bg
                    var tData = towerData[t.name]
                    hitsT[tbg[0]][tbg[1]][tbg[2]].mouseEnabled = false;
                    var newImage = new createjs.Bitmap(tData["image"][t.level]);
                    var newTower = new createjs.Container();
                    newTower.mouseChildren = false;

                    newTower.bg = t.bg
                    newTower.name = t.name;
                    newTower.num = towers.length;
                    newTower.level = t.level+1;
                    newTower.maxLevel = tData["damage"].length;
                    newTower.range = tData["range"][t.level];
                    newTower.maxCd = tData["cd"][t.level];
                    newTower.cd = 0;
                    newTower.shot = tData["shot"];
                    newTower.w = tData["w"];
                    newTower.h = tData["h"];
                    newTower.speed = tData["speed"]
                    newTower.damage = tData["damage"][t.level];
                    newTower.bonus = 
                    Math.round(attBonus/100*newTower.damage);
                    newTower.effect = tData["effect"];
                    newTower.cost = tData["cost"][t.level+1];
                    newTower.sell = tData["cost"][t.level];
                    newTower.x = t.x;
                    newTower.y = t.y;
                    newTower.coord = [t.x,t.y];
                    newTower.on("click", handleTower); 
                    newTower.splash = tData["splash"][t.level];
                    if (t.name == "iceTower") {
                        newTower.slow = tData["slow"][t.level];
                        newTower.slowDuration = tData["slowDuration"][t.level];
                    }
                    //aoe of tower range
                    newTower.aoe = new createjs.Shape();
                    newTower.aoe.graphics.beginStroke("#ff0").drawCircle(16,16,newTower.range);
                    //newTower.aoe.alpha = .5;
                    newTower.addChild(newImage);
                    towers.push(newTower);
                    stage.addChild(newTower);
                }
            }
            break;
        case 'fountain':
            var hTrack = gameProgress['healer']
            if (hTrack!=false) {
                for (var i=0;i<hTrack.length;i++) {
                    var h = hTrack[i]
                    if (h==false) {
                        towers.push(false)
                        continue
                    }
                    var hbg = h.bg
                    var hData = towerData[h.name]
                    hitsT[hbg[0]][hbg[1]][hbg[2]].mouseEnabled = false;
                    var newImage = new createjs.Bitmap(hData["image"][h.level]);
                    var newTower = new createjs.Container();
                    newTower.mouseChildren = false;
                    newTower.bg = h.bg
                    newTower.name = h.name;
                    newTower.num = healers.length;
                    newTower.level = h.level+1;
                    newTower.maxLevel = hData["damage"].length;
                    newTower.maxCd = hData["cd"][h.level];
                    newTower.cd = 0;
                    newTower.damage = hData["damage"][h.level];
                    newTower.effect = hData["effect"];
                    newTower.cost = hData["cost"][h.level+1];
                    newTower.sell = hData["cost"][h.level];
                    newTower.x = h.x;
                    newTower.y = h.y;
                    newTower.coord = [h.x,h.y];
                    newTower.on("click", handleTower); 
                    newTower.splash = hData["splash"][h.level];

                    newTower.addChild(newImage);
                    healers.push(newTower);
                    stage.addChild(newTower);
                }
            }
            break;
        
        case 'monster':            
            var mTrack = gameProgress['monster']
            if (mTrack!=false) {
                for (var i=0; i<mTrack.length; i++) {
                    var m = mTrack[i]
                    var mData = monsterData[m.name]

                    //hp appear above monster
                    var healthbar = new createjs.Bitmap(healthbarI)
                    healthbar.sourceRect = new createjs.Rectangle(0,0,
                        m.currentHp/m.maxHp*mData["w"],3);
                    healthbar.y = -5
                    var m1 = new createjs.Sprite(mData["image"])
                    //add properties to monster
                    var newMonster = new createjs.Container()
                    newMonster.addChild(healthbar, m1)
                    newMonster.level = m.level
                    newMonster.name = m.name
                    newMonster.pos = m.pos
                    newMonster.w = mData["w"]
                    newMonster.h = mData["h"] 
                    newMonster.x = m.x
                    newMonster.y = m.y
                    newMonster.damage = m.damage 
                    newMonster.originSpeed = mData["speed"]
                    newMonster.speed = m.speed
                    newMonster.currentHp = m.currentHp
                    newMonster.maxHp = m.maxHp
                    newMonster.bounty = m.bounty
                    newMonster.freezeCd = m.freezeCd
                    newMonster.slowCd = m.slowCd
                    newMonster.dead = 0

                    for (var j=0;j<4;j++) {
                        if (newMonster.pos[j]==2) {
                            newMonster.pos[j]=1
                            break
                        }
                    }
                    //add monster to array
                    monsters.push(newMonster)
                    stage.addChild(newMonster)
                }
            }
            break;
    }
}
