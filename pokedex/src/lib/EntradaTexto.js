import React from 'react';

class EntradaTexto extends React.Component {

    constructor(props) {
        super(props);
        this.refBuscar = React.createRef();
    }

    handleKeyPress = (e) =>{
        let value = this.refBuscar.current.value;
        if(value != ''){
            this.props.onKeyPress(value);
        }
    }

    render() {
    
        return (
            <div id="form">
            <input onKeyPress={this.handleKeyPress} ref={this.refBuscar} type="text" placeholder="introduce pokemon..." ></input>
            </div>
        );
    }
}

export default EntradaTexto;