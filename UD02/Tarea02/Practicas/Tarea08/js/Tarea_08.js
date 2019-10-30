window.addEventListener('keydown', function(evento){

    var key = evento.keyCode;

    recogerPulsacion(key);

}, false);


function playSound(key){

    // let letra = '';
    let audio;

    // if(key == '81')  letra = 'Q';

    // if(key == '87')  letra = 'W';

    // if(key == '69')  letra = 'E';

    // if(key == '82')  letra = 'R';

    audio = document.querySelector(`audio [data-key=${key.keyCode}]`);
    
    audio.play();
}

function recogerPulsacion(key){

    let div = document.getElementById(key);
    div.classList.add("trans");

    playSound(key);
}

