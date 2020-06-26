import React from 'react';
import './Campo.css';

class Campo extends React.Component {

	constructor(props) {
		super(props);

		this.campo = props.campo;

		this.state = {
			active: this.campo.active || false,
			valor: this.campo.valor || "",
			erro: this.campo.erro || "",
			nome: this.campo.nome || "(Campo)",
			opcional: false
		};

		this.validadores = [];
	}

	mudarValor(event) {
		const valor = event.target.value;
		this.setState({valor, erro: ""});
		this.campo.valor = valor;
	}

	validar() {
		let valido = true;
		
		this.validadores.forEach(validador => {
			let erro = validador.validar(this.campo);

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
