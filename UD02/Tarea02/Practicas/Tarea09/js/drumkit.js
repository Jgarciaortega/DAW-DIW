
function playSound(tecla) {

    const audio = document.querySelector(`audio[data-key="${tecla}"]`);

    if (!audio) return;

    audio.currentTime = 0;

    audio.play();
}

function recogerPulsacion(key) {

    let div = document.getElementById(key);
    div.classList.add("trans");

    playSound(key);
}

function removeTransition(id) {

    document.getElementById(id).classList.remove("trans");
    

}

function recogerClick(id){

    recogerPulsacion(id);
    
}



window.addEventListener('keydown', function (tecla) {

    recogerPulsacion(tecla.keyCode);

},);


window.onload= function(){

    const keys = document.querySelectorAll('.boton');
    keys.forEach(tecla => {
        tecla.addEventListener('mousedown', function() {
            recogerClick(tecla.getAttribute('id'));
        });
        tecla.addEventListener('transitionend', function () {
            removeTransition(tecla.getAttribute('id'))
        });
    });
       
    
}

