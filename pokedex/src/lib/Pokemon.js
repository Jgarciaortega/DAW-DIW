import React from 'react';

class Pokemon extends React.Component {


    render() {

        return (
            <div key={this.props.name} className="contenedorPokemon" onClick={this.props.detallePokemon}>
                <h3>{this.props.name}</h3>
                <img src={this.props.sprite}></img>
            </div>)
    }

}

export default Pokemon;