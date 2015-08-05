/*#########################################################################

                 Monster Objects

#########################################################################*/
//creates monster data
addMonster = function() {

    var mob = MonsterTower.find({type:"monster"}, {sort:{sequence:1}}).fetch();

    //mario
    monsterData["mario"] ={
        "image":marioI, 
        "w": 21, 
        "h": 40, 
        "speed": mob[0].speed,
        "hp":    mob[0].hp, 
        "bounty":mob[0].bounty, 
        "damage":mob[0].damage
    };

    //warrior
    monsterData["warrior"] ={
        "image":warriorI, 
        "w": 24, 
        "h": 31, 
        "speed": mob[1].hp, 
        "hp":    mob[1].hp, 
        "bounty":mob[1].bounty, 
        "damage":mob[1].damage
    };

    //armored
    monsterData["armored"] ={
        "image":armoredI, 
        "w": 32, 
        "h": 35, 
        "speed": mob[2].speed, 
        "hp":    mob[2].hp, 
        "bounty":mob[2].bounty, 
        "damage":mob[2].damage
    };

    //armored
    monsterData["wizard"] ={
        "image":wizardI, 
        "w": 32, 
        "h": 45, 
        "speed": mob[3].speed, 
        "hp":    mob[3].hp, 
        "bounty":mob[3].bounty, 
        "damage":mob[3].damage
    };
    //boss
    monsterData["boss"] ={
        "image":batmanI, 
        "w": 29, 
        "h": 40, 
        "speed": mob[4].speed, 
        "hp":    mob[4].hp, 
        "bounty":mob[4].bounty, 
        "damage":mob[4].damage
    };
}


//add monster to canvas
cMonster = function(type,amt) {
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
        newMonster.level = wave
        newMonster.name = type
        newMonster.pos = [0,0,1,0] // 0=stop 1=start animate 2=started
        newMonster.w = mtype["w"]
        newMonster.h = mtype["h"] 
        newMonster.x = 96 - newMonster.w/2
        newMonster.y = - newMonster.h - i*newMonster.h*1.5
        newMonster.damage = mtype["damage"]
        newMonster.originSpeed = mtype["speed"]
        newMonster.slowSpeed = mtype["speed"]
        newMonster.speed = (powerFreeze>680)? 0:mtype["speed"]
        newMonster.currentHp = mtype["hp"]
        newMonster.maxHp = mtype["hp"]
        newMonster.bounty = mtype["bounty"]
        newMonster.freezeCd = (powerFreeze>680 && monsters.length!=0)? 
            powerFreeze-680:0
        newMonster.slowCd = 0
        newMonster.dead = 0
        //add monster to array
        monsters.push(newMonster)
        stage.addChild(newMonster)
        if (i==amt-1) {
            lastMon = newMonster
        }
    }
    if (castleInvincible.active>=1){
        stage.addChild(castleInvincible)
    } else {
        stage.addChild(castle)        
    }
    if (powerFreeze>740){
        stopAnimate(true)
    }
}

//check animation direction
cAnimation = function() {
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

                 Tick Events

#########################################################################*/
//remove effects on monster
monsterEffect = function() {
    for (var i=0;i<monsters.length;i++) {
        var mob = monsters[i]

        //control freeze
        if (mob.freezeCd>1) {
            mob.freezeCd--;
        } 
        else if (mob.freezeCd == 1) {  
            mob.speed = mob.slowSpeed
            mob.freezeCd--
            stopAnimate(false);
        }

        //control slow
        if (mob.slowCd>1) {
            mob.slowCd--;
        } 
        else if (mob.slowCd == 1) {
            mob.slowSpeed = mob.originSpeed
            mob.speed = mob.slowSpeed
            mob.slowCd--
        }
    }
}

//monster movement and attack castle
monsterMovement = function() {
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
                if (!(mob.level in dmgCount)){
                    dmgCount.push(mob.level)
                    if (mob.level%7==0){
                        monsterData["wizard"]["damage"]+=1                       
                    }
                    else{
                        monsterData["wizard"]["damage"]+=1 
                        monsterData["mario"]["damage"]+=1
                        monsterData["warrior"]["damage"]+=1
                        monsterData["armored"]["damage"]+=1
                        monsterData["boss"]["damage"]+=1
                    }
                }
                if (castleInvincible.active>=1){
                    if (castleInvincible.blocks>0){
                        castleBlock.cd = 5
                        stage.addChild(castleBlock)
                        castleInvincible.blocks--
                        document.getElementById("invincibleBlock").innerHTML = 
                        castleInvincible.blocks
                        if (castleInvincible.blocks==0){
                            castleInvincible.active=0
                            stage.removeChild(castleInvincible)
                            updateIcon('invincibility','remove')
                        }                                            
                    } else{
                        castleInvincible.active=0
                        stage.removeChild(castleInvincible)
                        updateIcon('invincibility','remove')
                    }
                }
                else if ((mob.damage-armorBonus)<=0){
                    castleBlock.cd = 5
                    stage.addChild(castleBlock)
                } else {
                    if (allyHp>0) {
                        var dmg = allyHp - (mob.damage-armorBonus)
                        if (dmg>=0) {
                            allyHp -= (mob.damage-armorBonus)
                        } else {
                            allyHp = 0
                            health += dmg
                        }
                    } else {
                        health -= (mob.damage-armorBonus)
                    }
                    castleHit.cd = 5
                    stage.addChild(castleHit)
                    document.getElementById("health").innerHTML = 
                    health+'<span id="ally">+'+allyHp+'</span>'
                    castleText.text = (health+allyHp) + "/" + maxHealth
                    castleHp.sourceRect = 
                    new createjs.Rectangle(0,0,health/maxHealth*64,10);

                    //check if game over
                    if (health<=0 && checkGG==0) {
                        checkGG++;
                        isOver();
                    }
                }
                mob.dead++;
                stage.removeChild(mob);
                monsters.splice(i,1);

            }
        }
    }
};

