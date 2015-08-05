/*#########################################################################

                 Power Effects

#########################################################################*/

power = function(type) {
    $('.towerBtn').removeClass('selected');
    stage.removeChild(targetGrid);
    stage.removeChild(hoverT)
    hoverGrid = false
    towerType = false
    towerName = false  
    bombActive = false    
    targetTower = false
    toggleAoe();
    
    if (type=='bomb'){
        $('#bombPower').addClass('selected');
    }
    updatePower(type);

    //if game is paused
    if (createjs.Ticker.getPaused()) {
        var names = ""
        var item = ""

        if (type=="freeze"){
            names = 'Freezer'
            item = "'Undead Bone'"
            if (gameRunning==0){
                $('#freezePower').addClass('selected')
            }
        }
        else if(type=="meteorite"){
            names = 'Meteorite'
            item = "'Ring of Darkness'"
            if (gameRunning==0){
                $('#meteoritePower').addClass('selected')      
            }
        }
        else if(type=="invincibility"){
            names = 'Invincibility'
            item = "'Sand Wall'"
            if (gameRunning==0){                
                $('#invinciblePower').addClass('selected')
            }
        }
        else if(type=="dd"){
            names = 'Double Damage'
            item = "'Dragon's Blood'"
            if (gameRunning==0){                
                $('#ddPower').addClass('selected')
            }
        }


        var named ="<span class='item'>" + names + "</span>"
        var itemd ="<span class='item'>" + item + "</span>"
        //if user is logged in
        if (Meteor.user()!==null){
            if (type=='freeze' && !Meteor.user().ability_freeze ||
                type=='meteorite' && !Meteor.user().ability_meteorite ||
                type=='invincibility' && !Meteor.user().ability_block ||
                type=='dd' && !Meteor.user().ability_doubleDamage){
                error("Please buy the "+ itemd + " to use the "+named+"." )                  
            }
        } else{
            if (type!='bomb'){
                error("Please sign in to use the "+named+".")                
            }        
        }
    }
    else {//game running
        //user logged in
        if (Meteor.user()!==null) {
            //check for type of power
            if (type=="freeze") {
                if (Meteor.user().ability_freeze) {
                    if (powerFreeze==0) {
                        powerFreeze = 800
                        $('#freezePower').addClass('cooldown')
                        for (var i=0;i<monsters.length;i++) {
                            monsters[i].speed=0
                            monsters[i].freezeCd = 120
                        }
                        powerEffect(type)               
                    } else {                
                        error("Freeze on cooldown")
                    }
                } else {
                error("Please buy the <span class='item'>'Undead Bone'</span>" +
                 "to use the <span class='item'>Freezer</span>.")
                }
            } 
            else if (type=="meteorite") {
                if (Meteor.user().ability_meteorite) {
                    if (powerMeteorite==0) {
                        powerEffect(type)
                        $('#meteoritePower').addClass('cooldown')            
                    } else {                
                        error("Meteorite on cooldown!")
                    }
                } else {
                error("Please buy the <span class='item'>'Ring of Darkness'</span>"+
                 "to use the <span class='item'>Meteorite</span>.")
                }

            }
            else if (type=="invincibility"){
                if (Meteor.user().ability_block) {
                    if (castleInvincible.cd==0) {
                        powerEffect(type)
                        $('#invinciblePower').addClass('cooldown')            
                    } else {                
                        error("Invincibility on cooldown!")
                    }
                } else {
                error("Please buy the <span class='item'>'Sand Wall'</span>"+
                 "to use <span class='item'>Invincibility</span>.")
                }
            }
            else if (type=="dd"){
                if (Meteor.user().ability_doubleDamage) {
                    if (powerCD==0) {
                        powerEffect(type)
                        $('#ddPower').addClass('cooldown')            
                    } else {                
                        error("Double Damage on cooldown!")
                    }
                } else {
                error("Please buy the <span class='item'>'Dragon's Blood'</span>"+
                 "to use <span class='item'>Double Damage</span>.")
                }
            }
            else if (type=='bomb'){
                bombActive=true
            }
        } else {
            if (type!='bomb'){
                error("Please sign in first.")                
            }else{
                bombActive=true                
            }
        }
    }
}

//animations
powerEffect = function(type){
    if (type=='freeze'){
        updateIcon(type,'add')    
        animateFreeze()
    }
    else if (type=='meteorite'){
        updateIcon(type,'add')
        if (!muted) {      
            CometSound.play().setVolume(15);
        }
        $("#meteor").animate({marginLeft:"500px",marginTop:"130px"},40000/speed,function(){
            $("#meteor").css({"margin-top":"-250px", "margin-left":"-200px"});
        });  
        $("#impactShadow").animate({marginLeft:"615px", marginTop:"270px",height:"100px",opacity:"0.9"},40000/speed,function(){
            if (!muted) {      
                artillerySound.play().setVolume(10);
            }
            $("#impactShadow").css({"height":"10px","margin-left":"-100px","margin-top":"300px;","opacity":"0.1"});
            $("#playingField").effect("shake",function(){
                if (!muted) {      
                    explosionSound.play().setVolume(10);
                }
                $("#redCircle").show(function(){
                    powerMeteorite = 3600
                    meteoriteOver = 1
                    stage.addChild(redCircle);
                    $("#explosion").animate({height:"300px",marginLeft:"520px",marginTop:"170px",opacity:"0.1"},20000/speed,function(){
                        $("#explosion").css({"height":"0px","margin-left":"670px","margin-top":"320px","opacity":"1.0"});

                    });
                });           
            });              
        });
    }
    else if (type=='invincibility'){
        updateIcon(type,'add');
        $("#angel").show();
        if (!muted) {      
            musicBoxSound.play().setVolume(6);
        }
        $("#angel").animate({"margin-top":"180px"},1000/speed,function(){
            $("#wings").show();
            $("#wings").animate({"width":"400px","margin-left":"240"},20000/speed,function(){
                $("#angel").animate({"margin-top":"-300px"},10000/speed);
                stage.addChild(castleInvincible);
                castleInvincible.cd=2000;
                castleInvincible.active=600;
                $("#wings").animate({"margin-top":"-300px"},10000/speed,function(){
                    $("#wings").css({"width":"0px","margin-left":"440px","margin-top":"130px","display":"none"})
                });
            });
        });
    }
    else if (type=='dd'){
        updateIcon(type,'add')
        if (!muted) {      
            slideInSound.play().setVolume(35).setSpeed(2);
        }
        $("#doubleDamage").show(6000/speed,function(){
            $("#doubleDamage").hide("puff");
            powerDD = 200;
            powerCD = 800;
        });
    }
};

animateFreeze = function(){
    stage.addChild(iceBackground)
    for (var i=0;i<towers.length;i++){
        stage.addChild(towers[i])
    }
    for (var i=0;i<monsters.length;i++){
        stage.addChild(monsters[i])
    }
    for (var i=0;i<shots.length;i++){
        stage.addChild(shots[i])
    }
    for (var i=0;i<healers.length;i++){
        stage.addChild(healers[i])
    }
    stage.addChild(castle)
    stopAnimate(true) 
}

meteoriteScale = function(){
    var kills=[]
    if (redCircle.scaleX<.8){
        redCircle.scaleX += .06
        redCircle.scaleY += .06
        redCircle.x -= (.06*481)/2
        redCircle.y -= (.06*481)/2
    }

    else if (redCircle.scaleX<1.4){
        redCircle.scaleX += .12
        redCircle.scaleY += .12
        redCircle.x -= (.12*481)/2
        redCircle.y -= (.12*481)/2
    }
    else if (redCircle.scaleX<1.9){
        redCircle.scaleX += .18
        redCircle.scaleY += .18
        redCircle.x -= (.18*481)/2
        redCircle.y -= (.18*481)/2
    }  
    else if (redCircle.scaleX<3.5){
        redCircle.scaleX += .3
        redCircle.scaleY += .3
        redCircle.x -= (.3*481)/2
        redCircle.y -= (.3*481)/2
    } else{
        updateIcon('meteorite', 'remove')
        stage.removeChild(redCircle)
        meteoriteOver++
    }

    for (var i=0;i<monsters.length;i++){
        if (monsters[i].y>0 &&
            redCircle.x <= (monsters[i].x+monsters[i].w) &&
            monsters[i].x <= (redCircle.x+redCircle.scaleX*481) &&
            redCircle.y <= (monsters[i].y+monsters[i].h) &&
            monsters[i].y <= (redCircle.y+redCircle.scaleY*481)){

            kills.push(i)
        }
    }
    if (kills){
        kills.sort(function(a,b){return b-a});
        for (var i=0;i<kills.length;i++) {
            isDead(kills[i]);
        }
    } 
}

//powers cooldown
powerCd = function() {
    //cooldown for freeze
    if (powerFreeze>0){
        if (powerFreeze>1) {
            if (powerFreeze>681){
                document.getElementById("freezeCd").innerHTML = 
                "<div style='padding-top: 6px;padding-bottom:6px'>" + 
                Math.round((powerFreeze-680)/2)/10 + "</div>" 
            }
            else if (powerFreeze==681){
                updateIcon('freeze','remove')
                stage.removeChild(iceBackground)            
            }
            powerFreeze--
        } else if (powerFreeze==1) {
            $('#freezePower').removeClass('cooldown')
            powerFreeze--
        }        
    }

    //cooldown for meteorite
    if (powerMeteorite>0){
        if (powerMeteorite>1){
            powerMeteorite--
            if (meteoriteOver==1){
                meteoriteScale()
            }
        } else{
            powerMeteorite--
            meteoriteOver=0
            redCircle.scaleX = .1;
            redCircle.scaleY = .1;
            redCircle.x = 673;
            redCircle.y = 314;
            $('#meteoritePower').removeClass('cooldown') 
        }
    }
    //cooldown for invincible
    if (castleInvincible.cd>0){
        if (castleInvincible.cd>1){
            castleInvincible.cd--
            if (castleInvincible.active>1){
                document.getElementById('invincibleCd').innerHTML = 
                "<div style='padding-top: 6px;padding-bottom:6px'>" + 
                Math.round(castleInvincible.active/2)/10 + "</div>"
                castleInvincible.active--
            }
            else if(castleInvincible.active>0){
                castleInvincible.active--
                castleInvincible.blocks=0
                stage.removeChild(castleInvincible)
                updateIcon('invincibility','remove')
            }
        }else{
            castleInvincible.cd--
            castleInvincible.blocks=5
            $('#invinciblePower').removeClass('cooldown')         
        }        
    }

    //cooldown for dd
    if (powerCD>0){
        if (powerCD>1){
            powerCD--
            if (powerDD>1){
                document.getElementById('ddCd').innerHTML = 
                "<div style='padding-top: 6px;padding-bottom:6px'>" + 
                Math.round(powerDD/2)/10 + "</div>"
                powerDD--
            }
            else if (powerDD>0){
                powerDD--
                updateIcon('dd','remove')

            }
        } else{
            powerCD--
            $('#ddPower').removeClass('cooldown')            
        }
    }
}

updatePower = function(type) {
    var pow = "Power: "
    var effect = "Effect: "
    var cd = "Cooldown: "
    var delay = ""
    var errors = ""

    if (type=="freeze") {
        pow += "Freezing Field" + "<br>"
        effect += "Freeze monster for 6 Sec." + "<br>"
        cd += 40 + " Sec" + "<br>"
    }
    else if (type=="meteorite") {        
        pow += "Meteorite" + "<br>"
        effect += "Destroys all living thing in the world." + "<br>"
        cd += 180 + " Sec" + "<br>"
        delay = "Delays: 2 Sec" + "<br>"
    }
    else if (type=="invincibility"){   
        pow += "Invincibility" + "<br>"
        effect += "No damage to castle for 5 hits for 30 Sec." + "<br>"
        cd += 100 + " Sec" + "<br>"
        delay = "Delays: 1.5 Sec" + "<br>"
    }
    else if (type=="dd"){
        pow += "Double Damage" + "<br>"
        effect += "Monsters get twice the damage from towers for 10 seconds." + "<br>"
        cd += 40 + " Sec" + "<br>"
    }
    else if (type=='bomb'){
        var level = (bomb.level<4)? bomb.level+"-->"+(bomb.level+1):'Max level'
        var upgrade = (bomb.level<4)? 
        "<input type='button' value='Upgrade(g)' id='upgradeBombBtn'>" +
        bomb.upgrade[bomb.level-1]:""
        var dmg = (bomb.level<4)? "Damage: " + bomb.damage[bomb.level-1]+"-->"+
        bomb.damage[bomb.level]: "Damage: "+bomb.damage[bomb.level-1]
        var cost = (bomb.level<4)? "Cost: "+bomb.cost[bomb.level-1]+"-->"+
        bomb.cost[bomb.level]:"Cost: "+bomb.cost[bomb.level-1]
        pow += "Ice Bomb" + "<br>" 
        effect += "Damages and slow monsters" + "<br>"
        cd =""
        delay = "Delay: 1 Sec" + "<br>"+"Level: "+level+"<br>"+
        dmg+"<br>"+cost+"<br>"+upgrade+"<br>"
    }

    //var errorEdit="<span class='errorText'>" + errors + "</span>"

    document.getElementById("infoText").innerHTML = 
    pow + 
    effect + 
    cd +
    delay
    //errorEdit

}

updateIcon = function(type,edit){
    if (type=="freeze"){
        if (edit=="add"){
            document.getElementById("freezeIcon").innerHTML = 
            "<img src='/images/gameImages/freezeIcon.png'><br>"
        }
        else{
            document.getElementById("freezeCd").innerHTML = ""
            document.getElementById("freezeIcon").innerHTML = ""
        }
    }
    else if (type=="meteorite"){
        if (edit=="add"){
            document.getElementById("meteoriteIcon").innerHTML = 
            "<img src='/images/gameImages/meteoriteIcon.png'><br>"
        }
        else{
            document.getElementById("meteoriteIcon").innerHTML = ""
        }
    }
    else if (type=="invincibility"){
        if (edit=="add"){
            document.getElementById("invincibleIcon").innerHTML = 
            "<img src='/images/gameImages/shieldIcon.png'><br>"
            document.getElementById("invincibleBlock").innerHTML = 5
        }
        else{
            document.getElementById("invincibleCd").innerHTML = ""
            document.getElementById("invincibleIcon").innerHTML = ""
            document.getElementById("invincibleBlock").innerHTML = ""
        }
    }
    else if (type=="dd"){
        if (edit=="add"){
            document.getElementById("ddIcon").innerHTML = 
            "<img src='/images/gameImages/ddIcon.png'><br>"
        }
        else{
            document.getElementById("ddCd").innerHTML = ""
            document.getElementById("ddIcon").innerHTML = ""
        }
    }
}
/*#########################################################################

                 Bomb Effects

#########################################################################*/
bombType=false
//grid
bombGrid = function() {
    //hitarea of map
    bombsT=[]
    //left area
    bombsT[0] = []
    bomb0=[1, stage.canvas.height/32-2]

    for (var i=0;i<bomb0[0];i++) {
        bombsT[0][i] = [];
    };

    for (var i=0;i<bomb0[0];i++) {
        for (var j=0;j<bomb0[1];j++) {
            bombsT[0][i][j] = new createjs.Shape();
            bombsT[0][i][j].graphics.beginFill("#f00").drawRect(64+16+32*i,
                16+32*j,32,32);
            bombsT[0][i][j].alpha=0.01;
            bombsT[0][i][j].coord=[32*i,32*j]
            bombsT[0][i][j].pt=[0,i,j];
            bombsT[0][i][j].on("mouseover", buildBomb);
            bombsT[0][i][j].on("mouseout", buildBomb);
            bombsT[0][i][j].on("click", buildBomb); 
            stage.addChild(bombsT[0][i][j]);
        };
    };
    //bottom area
    bombsT[1] = []
    bomb1=[(stage.canvas.width/32)-7,1]

    for (var i=0;i<bomb1[0];i++) {
        bombsT[1][i] = [];
    };

    for (var i=0;i<bomb1[0];i++) {
        for (var j=0;j<bomb1[1];j++) {
            bombsT[1][i][j] = new createjs.Shape();
            bombsT[1][i][j].graphics.beginFill("#f00").drawRect(16+32+64+32*i,
                (stage.canvas.height-32-64+16)+32*j,32,32);
            bombsT[1][i][j].alpha=0.01;
            bombsT[1][i][j].coord=[64+32*i,stage.canvas.height-32];
            bombsT[1][i][j].pt=[1,i,j];
            bombsT[1][i][j].on("mouseover", buildBomb);
            bombsT[1][i][j].on("mouseout", buildBomb);
            bombsT[1][i][j].on("click", buildBomb); 
            stage.addChild(bombsT[1][i][j]);
        };
    };
    //top area
    bombsT[2] = []
    bomb2=[(stage.canvas.width/32)-9,1]

    for (var i=0;i<bomb2[0];i++) {
        bombsT[2][i] = [];
    };

    for (var i=0;i<bomb2[0];i++) {
        for (var j=0;j<bomb2[1];j++) {
            bombsT[2][i][j] = new createjs.Shape();
            bombsT[2][i][j].graphics.beginFill("#f00").drawRect(128+16+64+32*i,
                64+16+32*j,32,32);
            bombsT[2][i][j].alpha=0.01;
            bombsT[2][i][j].coord=[128+32*i,32*j];
            bombsT[2][i][j].pt=[2,i,j];
            bombsT[2][i][j].on("mouseover", buildBomb);
            bombsT[2][i][j].on("mouseout", buildBomb);
            bombsT[2][i][j].on("click", buildBomb); 
            stage.addChild(bombsT[2][i][j]);
        };
    };
    //left inner area
    bombsT[3] = []
    bomb3=[1,7]

    for (var i=0;i<bomb3[0];i++) {
        bombsT[3][i] = [];
    };

    for (var i=0;i<bomb3[0];i++) {
        for (var j=0;j<bomb3[1];j++) {
            bombsT[3][i][j] = new createjs.Shape();
            bombsT[3][i][j].graphics.beginFill("#f00").drawRect(128+16+64+32*i,
                128-16+32*j,32,32);
            bombsT[3][i][j].alpha=0.01;
            bombsT[3][i][j].coord=[128+32*i,64+32*j];
            bombsT[3][i][j].pt=[3,i,j];
            bombsT[3][i][j].on("mouseover", buildBomb);
            bombsT[3][i][j].on("mouseout", buildBomb);
            bombsT[3][i][j].on("click", buildBomb); 
            stage.addChild(bombsT[3][i][j]);
        };
    };       
    //bottom inner area
    bombsT[4] = []
    bomb4=[14,1]

    for (var i=0;i<bomb4[0];i++) {
        bombsT[4][i] = [];
    };

    for (var i=0;i<bomb4[0];i++) {
        for (var j=0;j<bomb4[1];j++) {
            bombsT[4][i][j] = new createjs.Shape();
            bombsT[4][i][j].graphics.beginFill("#f00").drawRect(192+16+32*i,
                stage.canvas.height-160-64+16+32*j,32,32);
            bombsT[4][i][j].alpha=0.01;
            bombsT[4][i][j].coord=[192+32*i,stage.canvas.height-160+32*j];
            bombsT[4][i][j].pt=[4,i,j];
            bombsT[4][i][j].on("mouseover", buildBomb);
            bombsT[4][i][j].on("mouseout", buildBomb);
            bombsT[4][i][j].on("click", buildBomb); 
            stage.addChild(bombsT[4][i][j]);
        };
    };
    //top inner area
    bombsT[5] = []
    bomb5=[9,1]

    for (var i=0;i<bomb5[0];i++) {
        bombsT[5][i] = [];
    };

    for (var i=0;i<bomb5[0];i++) {
        for (var j=0;j<bomb5[1];j++) {
            bombsT[5][i][j] = new createjs.Shape();
            bombsT[5][i][j].graphics.beginFill("#f00").drawRect(256+16+128+32*i,
                128+16+64+32*j,32,32);
            bombsT[5][i][j].alpha=0.01;
            bombsT[5][i][j].coord=[256+32*i,128+32*j];
            bombsT[5][i][j].on("mouseover", buildBomb);
            bombsT[5][i][j].on("mouseout", buildBomb);
            bombsT[5][i][j].on("click", buildBomb); 
            stage.addChild(bombsT[5][i][j]);
        };
    };
    //right inner area
    bombsT[8] = []
    bomb8=[1,4]

    for (var i=0;i<bomb8[0];i++) {
        bombsT[8][i] = [];
    };

    for (var i=0;i<bomb8[0];i++) {
        for (var j=0;j<bomb8[1];j++) {
            bombsT[8][i][j] = new createjs.Shape();
            bombsT[8][i][j].graphics.beginFill("#f00").drawRect(704-64+16+32*i,
                128-16+128+32*j,32,32);
            bombsT[8][i][j].alpha=0.01;
            bombsT[8][i][j].coord=[704+32*i,128+32*j];
            bombsT[8][i][j].on("mouseover", buildBomb);
            bombsT[8][i][j].on("mouseout", buildBomb);
            bombsT[8][i][j].on("click", buildBomb); 
            stage.addChild(bombsT[8][i][j]);
        };
    };
    //right area
    bombsT[9] = []
    bomb9=[1,12]

    for (var i=0;i<bomb9[0];i++) {
        bombsT[9][i] = [];
    };

    for (var i=0;i<bomb9[0];i++) {
        for (var j=0;j<bomb9[1];j++) {
            bombsT[9][i][j] = new createjs.Shape();
            bombsT[9][i][j].graphics.beginFill("#f00").drawRect(832-64+16+32*i,
                128-16+32*j,32,32);
            bombsT[9][i][j].alpha=0.01;
            bombsT[9][i][j].coord=[832+32*i,32*j];
            bombsT[9][i][j].on("mouseover", buildBomb);
            bombsT[9][i][j].on("mouseout", buildBomb);
            bombsT[9][i][j].on("click", buildBomb); 
            stage.addChild(bombsT[9][i][j]);
        };
    };
};

buildBomb = function(event) {
    if (bombActive){
        if (event.type=='mouseover'){
            stage.addChild(bomb)
        }else{stage.removeChild(bomb)}
        if (event.type=='click' && (!createjs.Ticker.getPaused()||true)){
            if (bomb.cost[bomb.level-1]<=cashy){
                cashy-=bomb.cost[bomb.level-1]
                document.getElementById('cash').innerHTML = cashy
                var bombIgnited = new createjs.Sprite(bombI,'explode')
                bombIgnited.level = bomb.level
                bombIgnited.x = bomb.x
                bombIgnited.y = bomb.y
                bombIgnited.cd = 18
                bombIgnited.damage = bomb.damage[bomb.level-1]
                bombIgnited.type = 'bomb'
                bombIgnited.slow = .5
                bombIgnited.slowDuration = 80
                bombIgnited.unUsed = 1

                stage.addChild(bombIgnited)
                bombs.push(bombIgnited)
                bombActive = false
                $('#bombPower').removeClass('selected')

            }else{
                error("Insufficient Cash")
            }
        }
    }
}

upgradeBomb = function(){
    if (bomb.upgrade[bomb.level-1]<=cashy){
        cashy-=bomb.upgrade[bomb.level-1]
        document.getElementById('cash').innerHTML = cashy
        bomb.level+=1
        updatePower('bomb') 
    }else{
        error("Insufficient Cash!")
    }
}

bombCd = function(){
    var done=[]
    for (var i=0;i<bombs.length;i++){
        if (bombs[i].cd>1){
            bombs[i].cd--
            if (bombs[i].type=='explosion'){
                if (bombs[i].cd==12){
                    if (bombs[i].level==1){
                        continue;
                    }
                    else if (bombs[i].level==2){
                        bombs[i].x -= 8
                        bombs[i].y -= 8
                        bombs[i].scaleX = 1.5
                        bombs[i].scaleY = 1.5                       
                    }else{                        
                        bombs[i].x -= 16
                        bombs[i].y -= 16
                        bombs[i].scaleX = 2
                        bombs[i].scaleY = 2 
                    }                
                }
                else if (bombs[i].cd==6){
                    if (bombs[i].level==1){
                        bombs[i].x -= 8
                        bombs[i].y -= 8
                        bombs[i].scaleX = 1.5
                        bombs[i].scaleY = 1.5 
                    }
                    else if (bombs[i].level==2){
                        bombs[i].x -= 8
                        bombs[i].y -= 8
                        bombs[i].scaleX = 2
                        bombs[i].scaleY = 2                       
                    }else{          
                        bombs[i].x -=8
                        bombs[i].y -=8
                        bombs[i].scaleX = 2.5
                        bombs[i].scaleY = 2.5
                    }      
                }
            }
        }
        else if (bombs[i].cd==1){
            stage.removeChild(bombs[i])
            done.push(i)
            bombs[i].cd--
            if (bombs[i].type=='bomb'){
                var explosive = new createjs.Sprite(explosiveI,'explode')
                explosive.cd = 18
                explosive.type ='explosion'
                explosive.level = bombs[i].level
                explosive.x = bombs[i].x
                explosive.y = bombs[i].y
                explosive.damage = bombs[i].damage
                explosive.slow = bombs[i].slow
                explosive.slowDuration = bombs[i].slowDuration
                explosive.unUsed = bombs[i].unUsed

                if (bombs[i].level==1){
                    explosive.w = 32
                }
                else if (bombs[i].level==2){
                    explosive.w = 64
                }
                else{
                    explosive.w = 96
                }
                stage.addChild(explosive)
                bombs.push(explosive)
            }
        }
    }
    if (done.length!=0) {
        done.sort(function(a,b){return b-a});
        for (var i=0;i<done.length;i++) {
            stage.removeChild(bombs[done[i]])
            bombs.splice(done[i],1)
        }        
    }
}

bombHit = function(){
    for (var i=0;i<bombs.length;i++){
        for (var j=0;j<monsters.length;j++){
            if (bombs[i].type=='explosion' &&
                bombs[i].unUsed &&
                bombs[i].x <= (monsters[j].x+monsters[j].w) &&
                monsters[j].x <= (bombs[i].x+bombs[i].w) &&
                bombs[i].y <= (monsters[j].y+monsters[j].h) &&
                monsters[j].y <= (bombs[i].y+bombs[i].w)) {



                if (monsters[j].slowCd<=0 || 
                    (monsters[j].originSpeed*(1-bombs[i].slow))<monsters[j].speed) {
                    if (monsters[j].speed*(1-bombs[i].slow)<=.8) {
                        monsters[j].slowSpeed = .8
                        monster[j].speed = .8
                    } else {
                        monsters[j].slowSpeed *= (1-bombs[i].slow) 
                        monsters[j].speed = monsters[j].slowSpeed
                    }
                } 
                monsters[j].slowCd = bombs[i].slowDuration




                monsters[j].currentHp-=bombs[i].damage
                monsters[j].getChildAt(0).sourceRect = 
                new createjs.Rectangle(0,0,monsters[j]
                    .currentHp/monsters[j].maxHp*monsters[j].w,3);

                if (monsters[j].currentHp<=0){
                    isDead(j)
                }
                bombs[i].unUsed=0
                break;
            }

        }
    }
}



