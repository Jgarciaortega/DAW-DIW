/*

This Script is licensed under GPL v3 or higher

Author: Angel Berlanas Vicente
email : <berlanas_ang@gva.es>

*/

/*

FUNCIONES PERDIDAS
^(;,;)^

*/

function startMigration() {

    let steps = document.querySelectorAll('[data-step]');

    steps.forEach(step => {

        step.classList.add('estabaEscondido');

    });

}

function init() {
    console.info(" * Init envirnoment ");

    // Set click function on button
    document.querySelector("button").addEventListener("click", startMigration);

    let steps = document.querySelectorAll('[data-step]');

    //Ocultamos todos los pasos en el init
    steps.forEach(step => {

        step.classList.add('escondido');

    });
}

// Init the environment when all is ready
window.onload = init;
