import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//import BotonBusqueda from './lib/BotonBusqueda';
import EntradaTexto from './lib/EntradaTexto.js';


class Pokedex extends React.Component {

    componentDidMount() {

        let url = 'https://pokeapi.co/api/v2/pokedex/1';
        fetch(url)
            .then(response => response.json())
            .then(elements => pokemons = elements);
    }

    buscarPokemon = (nombrePokemon) => {
       
        pokemons.pokemon_entries.forEach(pokemon => {
           if(nombrePokemon == pokemon.pokemon_species.name){

            this.mostrarResultado(pokemon);
           }
        });
        
    }

    mostrarResultado(pokemon){

        console.log(pokemon);
    }

    render() {
        console.log("angel");
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

//Variables globales
let pokemons;