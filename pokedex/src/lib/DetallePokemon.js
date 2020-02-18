import React from 'react';


export default class DetallePokemon extends React.Component {

    constructor(props) {

        super(props);
        this.state = {

            nameAbilitie1: null,
            nameAbilitie2: null,
            nameAbilitie3: null,
            abilitie1: null,
            abilitie2: null,
            abilitie3: null

        }

    }

    async descargarDatos() {

        for (let i = 0; i < this.props.detallesPokemon.abilities.length; i++) {

            let url = this.props.detallesPokemon.abilities[i].url;

            const promesa = await fetch(url);
            const datos = await promesa.json();

            switch (i) {

                case (0): this.setState({ nameAbilitie1: datos.name, abilitie1: datos.effect_entries[0].effect }); break;
                case (1): this.setState({ nameAbilitie2: datos.name, abilitie2: datos.effect_entries[0].effect }); break;
                case (2): this.setState({ nameAbilitie3: datos.name, abilitie3: datos.effect_entries[0].effect }); break;

            }


        }

    }

    async componentDidMount() {

        await this.descargarDatos();

    }

    crearCabecera = () => {

        return (
            <div id="cabeceraDetalle">
                <h3>{this.props.detallesPokemon.name}</h3>
                <img src={this.props.detallesPokemon.sprite} />
            </div>
        )

    }

    crearContenido = () => {
        return (
            <div id="contenidoDetalle">
                <h4>{this.state.nameAbilitie1}</h4>
                <p>{this.state.abilitie1}</p>
                <h4>{this.state.nameAbilitie2}</h4>
                <p>{this.state.abilitie2}</p>
                <h4>{this.state.nameAbilitie3}</h4>
                <p>{this.state.abilitie3}</p>
            </div>)
    }

    // https://material-ui.com/es/components/progress/

    render() {

        return (
            <div className="detallePokemon">
                {this.crearCabecera()}
                {this.crearContenido()}
            </div>

        );
    }

}
