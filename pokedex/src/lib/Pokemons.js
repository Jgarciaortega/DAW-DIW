import React from 'react';
import DetallePokemon from './DetallePokemon';
import Pokemon from './Pokemon'


class Pokemons extends React.Component {

    constructor(props) {

        super(props);

    }

    render() {

            return (
                
                <div className="pokemons">
                    {this.props.pokemons.map((element) =>                      
                        <Pokemon name={element.name} sprite={element.sprite} abilities={element.abilities}/>
                    )}
                </div>

            );
        }
    }



export default Pokemons;