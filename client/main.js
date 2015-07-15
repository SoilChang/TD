<<<<<<< HEAD
// loadSound();
=======
loadSound()
>>>>>>> origin/master

// function loadSound() {
//     // Load the sound
//     createjs.Sound.alternateExtensions = ["mp3"];
//     createjs.Sound.on("fileload", handleFileLoad);

<<<<<<< HEAD
//     createjs.Sound.registerSound("/sound/gameBG.ogg",'backgroundSound');
//     createjs.Sound.registerSound("/sound/laugh.ogg",'gameOverSound');
//     createjs.Sound.registerSound("/sound/ice.ogg",'iceSound');
//     createjs.Sound.registerSound("/sound/laser.ogg",'laserSound');
// }


// function handleFileLoad(event) {
//     // Play the loaded sound
//     BGsound = createjs.Sound.play('backgroundSound',{loop:-1});
//     BGsound.volume = .1

// }

// buzz.defaults.autoplay = true;
// buzz.defaults.loop = true;
// var gameBG = new buzz.sound('/sound/gameBG.ogg');

=======
    createjs.Sound.registerSound("/sound/gameBG.ogg",'backgroundSound');
    createjs.Sound.registerSound("/sound/laugh.ogg",'gameOverSound');
    createjs.Sound.registerSound("/sound/ice.ogg",'iceSound');
    createjs.Sound.registerSound("/sound/laser.ogg",'laserSound');
};


function handleFileLoad(event) {
    // Play the loaded sound
    if (event.id=="backgroundSound") {
        BGsound = createjs.Sound.play('backgroundSound',{loop:-1});
        BGsound.volume = .1
    }
}
>>>>>>> origin/master
