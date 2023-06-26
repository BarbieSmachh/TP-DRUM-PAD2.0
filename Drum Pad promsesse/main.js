let currentAudio = null;
function playSound (keycode){
    document.querySelector('audio[data-key="' + keycode + '"]').play();
    document.querySelector('div[data-key="' + keycode + '"]').classList.toggle('playing');
    let audio = document.querySelector('audio[data-key="' + keycode + '"]');
    currentAudio = audio;
} ;

window.addEventListener('keydown', (event) =>{
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      };
    playSound(event.keyCode);
    
});
window.addEventListener('keyup', (event) =>{
    playSound(event.keyCode);
});

