import React from 'react';
import { EstadoGeral } from '../actions';
import { listarDados } from '../services/CadastroService'

class Tabela extends React.Component {
	render() {
		if (this.props.estadoGeral === EstadoGeral.ListandoDados) {
			listarDados(this.props.cadastro)
				.then(dados => {
					console.log(dados);
					this.props.onDadosListados({ dados });
				});
		}
		return (
			<h2>{this.props.estadoGeral}</h2>
		)
	}
}

export default Tabela;
