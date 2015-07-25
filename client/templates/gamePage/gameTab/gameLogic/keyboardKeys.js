//controls keyboard actions
keydown = function(event) {
    if (onGame){
        keys[event.keyCode] = true;        
    }
}


keyboards = function() {
    if (keys[27]) {//esc
        delete keys[27]
        document.getElementById("infoText").innerHTML=""
        $('.towerBtn').removeClass('selected');
        stage.removeChild(targetGrid);
        stage.removeChild(hoverT)
        hoverGrid = false
        towerType = false
        towerName = false      
        toggleAoe();
    }
    else if (keys[82]){//r
        delete keys[82]
        power('bomb')        
    }
    else if (keys[70]){//f
        delete keys[70]
        power('dd')
    }
    else if (keys[87]){//w
        delete keys[87]
        buyTower('lightTower')
    }
    else if (keys[81]){//q
        delete keys[81]
        buyTower('iceTower');
    }
    else if (keys[65]){//a
        delete keys[65]
        power('freeze')
    }
    else if (keys[83]){//s
        delete keys[83]
        power('meteorite');
    }
    else if (keys[68]){//d
        delete keys[68]
        power('invincibility')
    }
    else if (keys[69]){//e
        delete keys[69]
        if (Meteor.user()!==null) {
            if (!Meteor.user().ability_regen) {            
                $(this).removeClass('selected');
            }
        }
        buyTower('fountain')
    }
    else if (keys[49]) {//1
        delete keys[49]
        $('.ff').removeClass('selected');  
        $('#ff1').addClass('selected');  
        ff(0)
    }
    else if (keys[50]) {//2
        delete keys[50]
        $('.ff').removeClass('selected');  
        $('#ff2').addClass('selected');   
        ff(1)
    }
    else if (keys[51]) {//3
        delete keys[51]
        $('.ff').removeClass('selected');  
        $('#ff4').addClass('selected');   
        ff(2)
    }
    else if (keys[52]) {//4
        delete keys[52]
        $('.ff').removeClass('selected');  
        $('#ff8').addClass('selected');   
        ff(3)
    }
    else if (keys[192]) {//`
        delete keys[192]
        if (checkGG==0) {
            togglePause();
        } else {
            clearStage();
            setNewGame();
            newGame();
            $('.towerBtn').removeClass('selected');  
        }
    }
    else if (keys[77]) {//m
        delete keys[77]
        
        $('#c-game-left_hand_menu').animate({left:'180', height:'540'},1000);
        $('#btmMenu').animate({top:'480'},1000);
        clearStage();
        clearIcon();
        menu();
        document.getElementById("infoText").innerHTML = ""
        $('.towerBtn').removeClass('selected');  
        $('.powerBtn').removeClass('selected');  
        $('.ff').removeClass('selected');  
    }
    else if (keys[78]) {//n
        delete keys[78]
        toggleSound();
    }
}