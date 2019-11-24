// This Script is licensed under GPL v3 or higher

// Author: Angel Berlanas Vicente
// email : <berlanas_ang@gva.es>


function sleep(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));
}

async function avanceBarra(step,dataStep) {

    let steps = document.querySelectorAll('[data-step]');
    let cont = 0;
    
    for (let i = 0; i < 101; i++) {
        
        if (i == 10 + cont) {
            
            await sleep(200);
            cont += 10;
        }

        step.setAttribute('value', +i);
    }

    dataStep++;
    //Tras finalizar el incremento de la barra simulamos click para mostrar finalsmg
    if (dataStep < steps.length + 1)   document.querySelector(`[data-step="${dataStep}"]`).click();
   
}

function añadirEstabaEscondido(){

    this.classList.add('estabaEscondido');
}

function transicionar(ev) {

    let dataStep = parseInt(ev.target.dataset.step) + 1;
    let steps = document.querySelectorAll('[data-step]');
    let step = document.querySelector(`[data-step="${dataStep}"]`);

    if (dataStep < steps.length + 1) {

        step.addEventListener('transitionend', transicionar);
        
        /*Los pasos tendran un evento transitioned, excepto el finalmsg, que tendra una simulacion de click cuando
        finalice el paso anterior*/

        if (step.localName == 'steplabel') step.classList.add('estabaEscondido');
        if (step.localName == 'progress') step.classList.add('estabaEscondido'); avanceBarra(step,dataStep);
        if (step.localName == 'finalmsg') step.addEventListener('click', añadirEstabaEscondido);

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
