window.addEventListener('keydown', function(evento){

    var key = evento.keyCode;

    recogerPulsacion(key);

}, false);


function playSound(evento){

    // let letra = '';
    let audio;
   
    // if(key == '81')  letra = 'Q';

    // if(key == '87')  letra = 'W';

    // if(key == '69')  letra = 'E';

    // if(key == '82')  letra = 'R';
    
    console.log(evento)
    console.log( document.querySelector(`audio [data-key="${evento}"]`));
    //audio = document.querySelector(`audio [data-key="${evento}"]`);
    //console.log(audio);
  //  audio.play();
}

function recogerPulsacion(key){

    let div = document.getElementById(key);
    div.classList.add("trans");

    playSound(key);
}

