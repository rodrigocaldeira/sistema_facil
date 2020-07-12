import React from 'react';
import './Campo.css';

class Campo extends React.Component {

	constructor(props) {
		super(props);
		
		this.state = {
			active: false,
			erro: "",
			valor: this.props.campo.valor ?? "",
			nome: this.props.campo.nome,
			tipo: this.props.campo.tipo,
			opcional: this.props.campo.opcional,
			opcoes: this.props.campo.opcoes
		};
		
		this.validadores = [];
	}

	id = () => "__id__" + this.state.nome.toLowerCase().replace(/ +/g, "_");

	definirValor(valor) {
		this.setState({ valor, erro: "" });
		this.props.campo.valor = valor;
	}


	validar() {
		let valido = true;
		
		this.validadores.forEach(validador => {
			let erro = validador.validar(this.state);

			if (erro !== "") {
				this.setState({ erro, active: true });
				valido = false;
				return;
			}
		});

		return valido;
	}
	
}

export default Campo;
