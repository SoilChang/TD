loadSound();

function loadSound() {
    // Load the sound
    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.on("fileload", handleFileLoad);

    createjs.Sound.registerSound("/sound/gameBG.ogg",'backgroundSound');
    createjs.Sound.registerSound("/sound/laugh.ogg",'gameOverSound');
    createjs.Sound.registerSound("/sound/ice.ogg",'iceSound');
    createjs.Sound.registerSound("/sound/laser.ogg",'laserSound');
}


function handleFileLoad(event) {
    // Play the loaded sound
    BGsound = createjs.Sound.play('backgroundSound',{loop:-1});
    BGsound.volume = .1

}