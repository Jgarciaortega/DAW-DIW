import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import EntradaTexto from './lib/EntradaTexto.js';
import Pokemons from './lib/Pokemons.js';


class Pokedex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            busqueda : null,
            pokemons : 'algo'
        };
       
    }

    componentDidMount() {

        let url = 'https://pokeapi.co/api/v2/pokemon?limit=1000';
        fetch(url)
            .then(response => response.json())
            .then(elements => this.setState({ busqueda: elements }));
    }

    buscarPokemon = (nombrePokemon) => {

        //lista las opciones tecleadas en el input
        let busquedaPokemons = [];
        //muestra objetos pokemon los cuales contienen la info a mostrar por interfaz
        let listaPokemons = [];

        this.state.busqueda.results.forEach(element => {

            if (element.name.startsWith(nombrePokemon)) {

                busquedaPokemons.push(element);

            }
        });

        busquedaPokemons.forEach(element => {

            fetch(element.url)
                .then(response => response.json())
                .then(element => {

                    let pokemon;
                    

                    if(element.sprites.front_default != null && element.name != null){

                        pokemon = {

                            name :  element.name,
                            sprite : element.sprites.front_default,
                            url : element.species.url
                            
                        }

                        listaPokemons.push(pokemon);
                        this.setState({pokemons : listaPokemons});
        
                    }   

                 })
                
                 

        })
    }



    render() {

        return (
            <div className="Pokedex">
                {<EntradaTexto onKeyUp={this.buscarPokemon} />}
                {<Pokemons pokemons={this.state.busqueda} />}
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Pokedex />,
    document.getElementById('root')
);

