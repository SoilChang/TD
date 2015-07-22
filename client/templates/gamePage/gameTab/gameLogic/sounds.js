/*#########################################################################

                 Sound Logic

#########################################################################*/
muted = 0

toggleSound = function() {
    muted = (muted)? 0:1
    document.getElementById('soundBtn').src = (muted)?
    "/images/gameImages/nosound.png":"/images/gameImages/sound.png"
}
