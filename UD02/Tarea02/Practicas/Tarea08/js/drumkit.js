
function playSound(tecla) {

    const audio = document.querySelector(`audio[data-key="${tecla}"]`);

    if (!audio) return;

    audio.currentTime = 0;

    audio.play();
}

function recogerPulsacion(key) {

    let div = document.getElementById(key);
    div.classList.add("trans");

    //div.addEventListener('transitionend', removeTransition);

    playSound(key);
}

function removeTransition(e) {

    console.log("hola");
    e.target.classList.remove("trans");

}

window.addEventListener('keydown', function (evento) {

    let key = evento.keyCode;

    recogerPulsacion(key);

}, false);

window.onload= function(){
    const keys = document.querySelectorAll('.boton');
    console.log(keys);
    keys.forEach(tecla => tecla.addEventListener('transitionend', removeTransition));
}
