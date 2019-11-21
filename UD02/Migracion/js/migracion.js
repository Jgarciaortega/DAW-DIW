/*

This Script is licensed under GPL v3 or higher

Author: Angel Berlanas Vicente
email : <berlanas_ang@gva.es>

*/

/*

FUNCIONES PERDIDAS
^(;,;)^

*/


function transicionar(ev) {

    let dataStep = parseInt(ev.target.dataset.step) + 1;
    let steps = document.querySelectorAll('[data-step]');
    let step = document.querySelector(`[data-step="${dataStep}"]`);

    if (dataStep < steps.length+1) {

        step.addEventListener('transitionend', transicionar);
        step.classList.add('estabaEscondido');
      
        // if (step.localName == 'progress') 
        // if (step.localName == 'finalmsg') 

    }
}

function startMigration() {

    document.querySelector(`[data-step="1"]`).addEventListener('transitionend', transicionar);
    document.querySelector(`[data-step="1"]`).classList.add('estabaEscondido');

}

function init() {
    console.info(" * Init envirnoment ");

    // Set click function on button
    document.querySelector("button").addEventListener("click", startMigration);


}

// Init the environment when all is ready
window.onload = init;
