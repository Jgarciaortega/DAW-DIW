import React from 'react';


export default class EntradaTexto extends React.Component {


        handleKeyPress = (e) => {
            let value = e.target.value;
            this.props.onKeyUp(value);

        }

        render() {

            return (
                <div id="form">
                    <input onKeyUp={this.handleKeyPress} type="text" placeholder="Introduce pokemon..." ></input>
                </div>
            );
        }
    }

    