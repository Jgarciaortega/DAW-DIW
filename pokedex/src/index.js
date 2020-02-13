import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//import BotonBusqueda from './lib/BotonBusqueda';
import EntradaTexto from './lib/EntradaTexto.js';


class Pokedex extends React.Component {

    constructor(props) {
        super(props);
        this.state = null;
      }
    
    componentDidMount() {

        let url = 'https://pokeapi.co/api/v2/pokemon?limit=1000';
        fetch(url)
            .then(response => response.json())
            .then(elements => this.setState({pokemons : elements}));
    }

    buscarPokemon = (nombrePokemon) => {
       
      this.state.pokemons.results.forEach(element => {
          
        console.log(element);
      });

    }


    render() {
       
        return (
            <div className="Pokedex">
                <EntradaTexto onClick={this.buscarPokemon} />
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Pokedex />,
    document.getElementById('root')
);

