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
    toggleAoe();
    
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
                $("#freezeField").fadeIn(100,function(){
                    $("#freezeField").fadeOut(2900,function(){            
                    });
                });
            }
        }
        else if(type=="meteorite"){
            names = 'Meteorite'
            item = "'Ring of Darkness'"
            if (gameRunning==0){
                $('#meteoritePower').addClass('selected') 
                if (!muted) {      
                    CometSound.play().setVolume(15);
                } 
                $("#meteor").animate({marginLeft:"500px",marginTop:"130px"},2000,function(){
                    $("#meteor").css({"margin-top":"-250px", "margin-left":"-200px"});
                });  
                $("#impactShadow").animate({marginLeft:"615px", marginTop:"270px",height:"100px",opacity:"0.9"},2000,function(){
                    if (!muted) {      
                        artillerySound.play().setVolume(10);
                    } 
                    $("#impactShadow").css({"height":"10px","margin-left":"-100px","margin-top":"300px;","opacity":"0.1"});
                    $("#playingField").effect("shake",function(){
                        if (!muted) {      
                            explosionSound.play().setVolume(10);
                        } 
                        $("#redCircle").show(function(){
                            $("#explosion").animate({height:"300px",marginLeft:"520px",marginTop:"170px",opacity:"0.1"},1000,function(){
                                $("#explosion").css({"height":"0px","margin-left":"670px","margin-top":"320px","opacity":"1.0"});

                            });
                        });           
                    });              
                });               
            }
        }
        else if(type=="invincibility"){
            names = 'Invincibility'
            item = "'Sand Wall'"
            if (gameRunning==0){                
                $('#invinciblePower').addClass('selected')
                $("#angel").show();
                if (!muted) {      
                    musicBoxSound.play().setVolume(6);
                } 
                $("#angel").animate({"margin-top":"180px"},500,function(){
                    $("#wings").show();
                    $("#wings").animate({"width":"400px","margin-left":"240"},1000,function(){
                        $("#angel").animate({"margin-top":"-300px"},500);
                        $("#wings").animate({"margin-top":"-300px"},500,function(){
                            $("#wings").css({"width":"0px","margin-left":"440px","margin-top":"130px","display":"none"})
                        });
                    });
                });
            }
        }
        else if(type=="dd"){
            names = 'Double Damage'
            item = "'Dragon's Blood'"
            if (gameRunning==0){                
                $('#ddPower').addClass('selected')
                if (!muted) {      
                    slideInSound.play().setSpeed(2).setVolume(35);
                } 
                $("#doubleDamage").show(function(){
                    $("#doubleDamage").hide("puff");
                });
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
            error("Please sign in to use the "+named+".")          
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
                        powerEffect(type)
                        //$('#freezePower').removeClass('selected')
                        $('#freezePower').addClass('cooldown')
                        for (var i=0;i<monsters.length;i++) {
                            monsters[i].speed=0
                            monsters[i].freezeCd = 60
                        }
                        stopAnimate(true);                
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
        } else {
            error("Please sign in first.")
        }
    }
}

//animations
powerEffect = function(type){
    if (type=='freeze'){
        updateIcon(type,'add')
        $("#freezeField").fadeIn(100,function(){
            $("#freezeField").fadeOut(2900,function(){
                updateIcon(type,'remove')                
            });
        });
    }
    else if (type=='meteorite'){
        updateIcon(type,'add')
        if (!muted) {      
            CometSound.play().setVolume(15);
        }
        $("#meteor").animate({marginLeft:"500px",marginTop:"130px"},2000,function(){
            $("#meteor").css({"margin-top":"-250px", "margin-left":"-200px"});
        });  
        $("#impactShadow").animate({marginLeft:"615px", marginTop:"270px",height:"100px",opacity:"0.9"},2000,function(){
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
                    $("#explosion").animate({height:"300px",marginLeft:"520px",marginTop:"170px",opacity:"0.1"},1000,function(){
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
        $("#angel").animate({"margin-top":"180px"},500,function(){
            $("#wings").show();
            $("#wings").animate({"width":"400px","margin-left":"240"},1000,function(){
                $("#angel").animate({"margin-top":"-300px"},500);
                stage.addChild(castleInvincible);
                castleInvincible.cd=2000;
                castleInvincible.active=600;
                $("#wings").animate({"margin-top":"-300px"},500,function(){
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
        $("#doubleDamage").show(function(){
            $("#doubleDamage").hide("puff");
            powerDD = 200;
            powerCD = 800;
        });
    }
};

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

meteoritePower = function(){
    if (powerMeteorite>1){
        powerMeteorite--
    } else{
        powerMeteorite--
        meteoriteOver=0
        redCircle.scaleX = .01;
        redCircle.scaleY = .01;
        redCircle.x = 673;
        redCircle.y = 314;
        $('#meteoritePower').removeClass('cooldown') 
    }
}

invinPower = function(){
    if (castleInvincible.cd>1){
        castleInvincible.cd--
        if (castleInvincible.active>1){
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

ddPower = function(){
    if (powerCD>1){
        powerCD--
        if (powerDD>1){
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

updatePower = function(type) {
    var pow = "Power: "
    var effect = "Effect: "
    var cd = "Cooldown: "
    var delay = ""
    var errors = ""

    if (type=="freeze") {
        pow += "Freezer" + "<br>"
        effect += "Freeze monster for 3 Sec." + "<br>"
        cd += 40 + " Sec" + "<br>"
    }
    else if (type=="meteorite") {        
        pow += "Meteorite" + "<br>"
        effect += "Destroys all living thing in the world." + "<br>"
        cd += 180 + " Sec" + "<br>"
        delay = "Delays: 2 Sec"
    }
    else if (type=="invincibility"){   
        pow += "Invincibility" + "<br>"
        effect += "No damage to castle for 5 hits for 30 Sec." + "<br>"
        cd += 100 + " Sec" + "<br>"
        delay += "Delays: 1.5 Sec"
    }
    else if (type=="dd"){
        pow += "Double Damage" + "<br>"
        effect += "Monsters get twice the damage from towers for 10 seconds." + "<br>"
        cd += 40 + " Sec" + "<br>"
    }

    var errorEdit="<span class='errorText'>" + errors + "</span>"

    document.getElementById("infoText").innerHTML = 
    pow + 
    effect + 
    cd +
    delay

}

updateIcon = function(type,edit){
    if (type=="freeze"){
        if (edit=="add"){
            document.getElementById("freezeIcon").innerHTML = 
            "<img src='/images/gameImages/freezeIcon.png'><br>"
        }
        else{
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
        }
        else{
            document.getElementById("invincibleIcon").innerHTML = ""
        }
    }
    else if (type=="dd"){
        if (edit=="add"){
            document.getElementById("ddIcon").innerHTML = 
            "<img src='/images/gameImages/ddIcon.png'><br>"
        }
        else{
            document.getElementById("ddIcon").innerHTML = ""
        }
    }
}

