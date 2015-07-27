/*#########################################################################

                 Shot Objects

#########################################################################*/
//create shot animation
cShots = function(tower,monster) {
    if (!muted) {
        if (tower.name=='iceTower') {
            createjs.Sound.play('iceSound');
        }
        else if (tower.name=='lightTower') {        
            createjs.Sound.play('laserSound').volume=.1;
        }    
    }  

    var dx=((monster.x + monster.w/2) - tower.x);
    var dy=((monster.y + monster.h/2) - tower.y);
    var dist=Math.sqrt(Math.pow(Math.abs(dx),2) + Math.pow(Math.abs(dy),2));
    var newShot = new createjs.Sprite(tower.shot,'fire')
    //calculations for travelling
    newShot.x = tower.x + 4
    newShot.y = tower.y
    newShot.d = dist + 10//destination
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
    var tDmg
    if (powerDD>0){
        tDmg = (tower.damage + tower.bonus)*2
    } else{tDmg=tower.damage + tower.bonus}
    newShot.damage = tDmg
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
/*#########################################################################

                 Tick Events

#########################################################################*/

//shots movement
shotsMovement = function() {
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
            shots.splice(shotsRemoved[i],1)
        }
    }
};

shotsHit = function() {
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
shotsSplash = function(shot) {
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
            var tDmg
            if (powerDD>0){
                tDmg = shot.damage*2
            }else{tDmg=shot.damage}
            monsters[i].currentHp -= tDmg;
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

//add effects on monsters
shotsEffect = function(shot,monster) {
    if (shot.name=="iceTower") {
        if (monster.slowCd<=0 || (monster.originSpeed*(1-shot.slow))<monster.speed) {
            if (monster.speed*(1-shot.slow)<=.8) {
                monster.speed = .8
            } else {
                monster.speed *= (1-shot.slow)
            }
        } 
    }
    monster.slowCd = shot.slowDuration
}

