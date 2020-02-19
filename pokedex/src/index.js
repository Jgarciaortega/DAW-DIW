import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import EntradaTexto from './lib/EntradaTexto.js';
import Pokemons from './lib/Pokemons.js';
import Header from './lib/Header'
import logo from './assets/img/logo.png'



class Pokedex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            busqueda: null,
            pokemons: [],
            buscando: false,
            mensajeError: false

        };

    }

    loadState() {

        return{

            visibility : this.state.buscando ? 'visible' : 'hidden'
        }
       
    }

    mensajeError(){

        return{

            visibility : this.state.mensajeError ? 'visible' : 'hidden'
        }
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

        this.setState({ buscando: true })
       
        this.state.busqueda.results.forEach(element => {

            if (element.name.startsWith(nombrePokemon)) {
               
                busquedaPokemons.push(element);

            } else {

                listaPokemons = [];
                this.setState({ pokemons: listaPokemons});
                
            }
        });

        if(busquedaPokemons.length == 0) this.setState({mensajeError : true})
        else  this.setState({mensajeError : false})

        busquedaPokemons.forEach(element => {
           
            fetch(element.url)
                .then(response => response.json())
                .then(element => {
                    let pokemon;
                
                    if (element.sprites.front_default != null && element.name != null && element.abilities.length === 3) {

                        pokemon = {

                            name: element.name,
                            sprite: element.sprites.front_default,
                            url: element.species.url,
                            abilities: [
                            {
                                name:element.abilities[0].ability.name,
                                url:element.abilities[0].ability.url
                            },

                            {
                                name:element.abilities[1].ability.name,
                                url:element.abilities[1].ability.url
                            },

                            {
                                name:element.abilities[2].ability.name,
                                url:element.abilities[2].ability.url
                            }

                            ]
                        }

                        listaPokemons.push(pokemon);
                        this.setState({ pokemons: listaPokemons });
                       
                    }

                    if (nombrePokemon === '') {

                        listaPokemons = [];
                        this.setState({ pokemons: listaPokemons });
                        this.setState({ buscando: false })
                    }

                  setTimeout(this.temporizador = () =>{
                    this.setState({ buscando: false })
                  },1200);

                })
        })
        
    }
  
    render() {

        return (
            <div className="Pokedex">
                {<Header url={logo}/>}
                {<EntradaTexto onKeyUp={this.buscarPokemon} />}
                <p  style={this.mensajeError()} id="mensajeError">Pokemon no localizado. Has de buscarlo introduciendo su nombre exacto</p>
                {<Pokemons pokemons={this.state.pokemons} />}
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Pokedex />,
    document.getElementById('root')
);

