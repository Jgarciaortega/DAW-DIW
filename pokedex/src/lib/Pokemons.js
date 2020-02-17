import React from 'react';
import Loading from './Loading';
import DetallePokemon from './DetallePokemon';


class Pokemons extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            detalle: false
        };

    }

    detallePokemon = (e) => {

      

    }

    render() {

        if (this.state.detalle) {
           
            return <DetallePokemon />

        } else {
            return (

                <div className="pokemons">
                    {this.props.pokemons.map((element) =>
                        <div key={element.name} className="contenedorPokemon" onClick={this.detallePokemon}>
                            <h3 dataset={element.url}>{element.name}</h3>
                            <img src={element.sprite} dataset={element.url}></img>
                        </div>
                    )}
                </div>

            );
        }
    }

}

export default Pokemons;