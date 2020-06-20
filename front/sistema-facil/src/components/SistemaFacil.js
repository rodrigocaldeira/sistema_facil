import React from 'react';
import './SistemaFacil.css';
import MenuContainer from '../containers/MenuContainer';
import TabelaContainer from '../containers/TabelaContainer';
import buscarCadastros from '../services/MenuService';
import { listarDados } from '../services/CadastroService';
import { EstadoGeral } from '../actions';
import FormularioContainer from '../containers/FormularioContainer';

class SistemaFacil extends React.Component {
	componentDidMount() {
		buscarCadastros()
			.then(cadastros => {
				this.props.onInit({ cadastros });
			});
	}

	render() {
		this.eventHandler();
		let telaAtual = this.getTelaAtual();
		return (
			<div className="SistemaFacil">
				<MenuContainer />
				<div className="SistemaFacil-body">
					{telaAtual}
				</div>
			</div>
		);
	}

	eventHandler() {
		switch (this.props.estadoGeral) {
			case EstadoGeral.ListandoDados:
				listarDados(this.props.cadastro)
					.then(lista => {
						this.props.onDadosListados({ lista });
					});
				break;
			
			case EstadoGeral.CadastroIncluido:
				console.log('CADASTRO INCLUIDO');
				this.props.onCadastroIncluido();
				break;

			default: return;

		}
	}

	getTelaAtual() {
		switch (this.props.estadoGeral) {
			case EstadoGeral.DadosListados:
				return <TabelaContainer />;

			case EstadoGeral.NovoCadastro:
				return <FormularioContainer />;

			default:
				return null;
		}
	}
}

export default SistemaFacil
