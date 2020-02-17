import React from 'react';


class DetallePokemon extends React.Component {

    constructor(props){

        super(props);
        this.state = null;

    }

mostrarDetalles(){
    
    return this.props.abilities;
   

}

    render(){
        
        return (
              <div className="detallesPokemons">
                  <h1>Hola2</h1>
              </div>

        );
    }

}

export default DetallePokemon;