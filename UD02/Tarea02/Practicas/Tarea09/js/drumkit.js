
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

function removeTransition(e) {

   
    e.target.classList.remove("trans");

}

function recogerClick(e){

    recogerPulsacion(e.toElement.parentNode.id);
}



window.addEventListener('keydown', function (tecla) {

    recogerPulsacion(tecla.keyCode);

},);


window.onload= function(){

    const keys = document.querySelectorAll('.boton');
    keys.forEach(tecla => tecla.addEventListener('transitionend', removeTransition));
    keys.forEach(tecla => tecla.addEventListener('mousedown', recogerClick));
    
}

