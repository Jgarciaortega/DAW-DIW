import React from 'react';


class BotonBusqueda extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          value: null,
        };
      }

    buscarPokemon = ()=> {

        console.log('buscalo');

    }

    componentDidMount(){
        console.log(" * Buttonsito ");
    }

    render() {
        return (
            <button className="boton" onClick={this.buscarPokemon}> ENVIAR
          {/* TODO */}
            </button>
        );
    }
}

export default BotonBusqueda;
