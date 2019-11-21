/*

This Script is licensed under GPL v3 or higher

Author: Angel Berlanas Vicente
email : <berlanas_ang@gva.es>

*/

/*

FUNCIONES PERDIDAS
^(;,;)^

*/

function transicionar(dataStep) {

    dataStep++;
    let step = document.querySelector(`[data-step="${dataStep}"]`);
 
     if (dataStep < 19) {   

         step.addEventListener('transitionend', transicionar(dataStep));
         step.classList.add('estabaEscondido');
        //  if(step.localName == 'steplabel')  step.classList.add('estabaEscondido');
          if(step.localName == 'progress')   step.classList.add('barra');
          if(step.localName == 'finalmsg')    console.log(step.localName);
     
     }
}

function startMigration() {

    transicionar(0);

}

function init() {
    console.info(" * Init envirnoment ");

    // Set click function on button
    document.querySelector("button").addEventListener("click", startMigration);


}

// Init the environment when all is ready
window.onload = init;
