loadSound()

function loadSound() {
    // Load the sound
    createjs.Sound.alternateExtensions = ["mp3"];

    createjs.Sound.registerSound("/sound/laugh.ogg",'gameOverSound');
    createjs.Sound.registerSound("/sound/ice.ogg",'iceSound');
    createjs.Sound.registerSound("/sound/laser.ogg",'laserSound');
    createjs.Sound.registerSound("/sound/gameOver.mp3",'gameOver');

};


if (buzz.isMP3Supported()) {
    buzz.defaults.formats = ['mp3']
}
else {buzz.defaults.formats = ['ogg']}

BGsound = new buzz.sound("/sound/gameBG");

// meteorite sound
explosionSound = new buzz.sound("/sound/explosion");
artillerySound = new buzz.sound("/sound/artillery");
CometSound = new buzz.sound("/sound/Comet");

// invisibility
musicBoxSound = new buzz.sound("/sound/Music_Box");

// double damage
slideInSound = new buzz.sound("/sound/slideIn");

BGsound.play().loop();


