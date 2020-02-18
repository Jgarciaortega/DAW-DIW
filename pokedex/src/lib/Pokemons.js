import React from 'react';
import DetallePokemon from './DetallePokemon';
import Pokemon from './Pokemon'

class Pokemons extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            mostrarDetalle: false

        }

    }

    detallePokemon = (pokemon) => {

        this.setState({ mostrarDetalle: true, pokemonDetalle: pokemon })

    }

    render() {

        if (this.state.mostrarDetalle) {

            return (
                <div className="contenedorDetalle">
                <DetallePokemon detallesPokemon={this.state.pokemonDetalle} />
                </div>
            );
        } else {

            return (

                <div className="pokemons">
                    {this.props.pokemons.map((element) =>
                        <Pokemon key={element.name} name={element.name} sprite={element.sprite}
                            abilities={element.abilities} onClick={this.detallePokemon} />
                    )}
                </div>

            );
        }
    }
}



export default Pokemons;