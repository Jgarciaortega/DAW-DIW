import React from 'react';


class DetallePokemon extends React.Component {

    constructor(props){

        super(props);
        this.state = null;

    }

mostrarDetalles(){

    console.log(this.props.detalles);

}

    render(){
        
        return (
              <div className="detallesPokemons">
              {this.props.detalles.map((element) =>
                        <div key={element.name} className="detallePokemon">
                            <h3>{element.abilities.name1}</h3>
                            <h3>{element.abilities.name2}</h3>
                            <h3>{element.abilities.name3}</h3>
                        </div>
                    )}
              </div>

        );
    }

}

export default DetallePokemon;