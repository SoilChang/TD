loadSound()

function loadSound() {
    // Load the sound
    createjs.Sound.alternateExtensions = ["mp3"];

    createjs.Sound.registerSound("/sound/laugh.ogg",'gameOverSound');
    createjs.Sound.registerSound("/sound/ice.ogg",'iceSound');
    createjs.Sound.registerSound("/sound/laser.ogg",'laserSound');
};


if (!buzz.isOGGSupported()) {
    buzz.defaults.formats = ['mp3']
}
else {buzz.defaults.formats = ['ogg']}

BGsound = new buzz.sound("/sound/gameBG");
// clickOn = new buzz.sound("/sound/humm.mp3");


BGsound.play().loop().setVolume(20)
