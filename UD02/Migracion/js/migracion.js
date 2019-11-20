/*

This Script is licensed under GPL v3 or higher

Author: Angel Berlanas Vicente
email : <berlanas_ang@gva.es>

*/

/*

FUNCIONES PERDIDAS
^(;,;)^

*/

function aumentarProgreso(){

    alert("ok");

}


function startMigration() {

    let steps = document.querySelectorAll('[data-step]');

    for (let i = 0; i < steps.length; i++) {
        
       
        
    }

    steps.forEach(step => {

        step.classList.add('estabaEscondido');
        step.addEventListener('transitioned', aumentarProgreso);

    });

}

function init() {
    console.info(" * Init envirnoment ");

    // Set click function on button
    document.querySelector("button").addEventListener("click", startMigration);

    let steps = document.querySelectorAll('[data-step]');

}

// Init the environment when all is ready
window.onload = init;
