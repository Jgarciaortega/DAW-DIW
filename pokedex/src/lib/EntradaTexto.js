import React from 'react';

class EntradaTexto extends React.Component {

    constructor(props) {
        super(props);
        this.refBuscar = React.createRef();
    }

    handleClick = () => {
        let value = this.refBuscar.current.value;
        this.props.onClick(value);
    }

    render() {
        console.log("Ptata");
        return (
            <div>
            <input ref={this.refBuscar} type="text" ></input>
            <button onClick={this.handleClick} >Buscar</button>
            </div>
        );
    }
}


export default EntradaTexto;