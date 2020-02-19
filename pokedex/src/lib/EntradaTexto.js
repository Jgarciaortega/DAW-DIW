import React from 'react';
import CircularDeterminate from './CircularDeterminate'

class EntradaTexto extends React.Component {


    handleKeyPress = (e) => {
        let value = e.target.value;
        this.props.onKeyUp(value);

    }

    progress = () => {

        // setTimeout(this.temporizador = () => {
        //     this.setState({ buscando: false })
        // }, 1200);

        return {

            // visibility: this.state.buscando ? 'visible' : 'hidden'
            visibility: 'visible'
        }

    }

    render() {

        return (
            <div id="form">
                <input onKeyUp={this.handleKeyPress} type="text" placeholder="Introduce pokemon..." ></input>
                <div id="circleProgress" style={this.progress()}>
                    {<CircularDeterminate />}
                </div>
            </div>
        );
    }
}

export default EntradaTexto;