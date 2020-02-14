import React from 'react';

class EntradaTexto extends React.Component {

    constructor(props) {
        super(props);
        
    }

    handleKeyPress = (e) => {
        let value = e.target.value;
        this.props.onKeyUp(value);

    }

    render() {

        return (
            <div id="form">
                <input onKeyUp={this.handleKeyPress}  type="text" placeholder="Introduce pokemon..." ></input>
            </div>
        );
    }
}

export default EntradaTexto;