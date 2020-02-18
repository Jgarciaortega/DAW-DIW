import React from 'react';


export default class DetallePokemon extends React.Component {

    constructor(props) {

        super(props);
        this.state = {

          

        }

    }

    componentDidMount() {

       console.log(this.props.detallesPokemon);

       this.props.detallesPokemon.abilities.forEach(element => {
           
            fetch(element.url)
            .then(res => res.json())
            .then(datos => console.log(datos));
           

       });
       

        // urls.forEach(url => {

        //     fetch(url)
        //         .then(res => res.json())
        //         .then(datos => {

        //             this.setState({ names: datos.name, effects: datos.effect_entries[0] })              
        //         })

        // })

    }



    crearHabilidades = () => {

        console.log(this.state.names);
        return '<p>'+this.state.names +'</p>'

    }

    render() {

        return (
            <div className="detallePokemon">
                {/* {console.log(this.props.detallesPokemon)} */}
                <div id="cabeceraDetalle">
                    {/* {this.crearDiv()} */}
                    <img src={this.props.detallesPokemon.sprite}></img>
                    <h3>{this.props.detallesPokemon.name}</h3>
                    <h3>HABILIDADES</h3>
                    {/* {this.crearHabilidades()} */}
                </div>
            </div>

        );
    }

}
