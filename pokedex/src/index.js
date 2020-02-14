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
            .then(elements => this.setState({ pokemons: elements }));
    }

    buscarPokemon = (nombrePokemon) => {

        let busquedaPokemons = [];

        this.state.pokemons.results.forEach(element => {

            if (element.name.startsWith(nombrePokemon)) {

                busquedaPokemons.push(element);

            }
        });

        busquedaPokemons.forEach(element => {

            fetch(element.url)
                .then(response => response.json())
                .then(element => {

                    let pokemon = {name : null,
                                   sprite : null
                    };

                    if(element.name != null){

                        pokemon = {

                            name :  element.name,
                            sprite : element.sprites.front_default
                            
                        }

                    }


    
               
                   console.log(pokemon);
                })

        })

    }


    render() {

        return (
            <div className="Pokedex">
                {<EntradaTexto onKeyPress={this.buscarPokemon} />}
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Pokedex />,
    document.getElementById('root')
);

