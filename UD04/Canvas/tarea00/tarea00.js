function cargarCanvas(){

    const canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');
    let blancas = false;
    let cont = 0;

    for (let y = 0; y < 800; y+=100) {

        if(cont % 2 == 0) blancas =true;
        else blancas = false;

        for (let x = 0; x < 800; x+=100) {

            if(blancas){

                ctx.fillStyle="black";
                ctx.fillRect(x,y,100,100);
                blancas = false;

            }else{

                ctx.fillStyle="orange";
                ctx.fillRect(x,y,100,100);
                blancas = true;

            }
            
            ctx.stroke;
           
        }

        cont++;
    }

}

window.addEventListener('load', cargarCanvas);