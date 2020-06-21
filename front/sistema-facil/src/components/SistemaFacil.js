import React from 'react';
import './SistemaFacil.css';
import MenuContainer from '../containers/MenuContainer';
import TabelaContainer from '../containers/TabelaContainer';
import buscarCadastros from '../services/MenuService';
import { listarDados, buscarCadastro, excluirCadastro } from '../services/CadastroService';
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
				this.props.onCadastroIncluido();
				break;

			case EstadoGeral.CadastroEditado:
				this.props.onCadastroEditado();
				break;

			case EstadoGeral.BuscandoCadastro:
				buscarCadastro(this.props.cadastro, this.props.id)
					.then(dados => {
						this.props.onDadosBuscados({ dados });	
					});
				break;

			case EstadoGeral.ExcluindoCadastro:
				excluirCadastro(this.props.cadastro, this.props.id)
					.then(() => this.props.onCadastroExcluido());

			default: return;

		}
	}

	getTelaAtual() {
		switch (this.props.estadoGeral) {
			case EstadoGeral.DadosListados:
				return <TabelaContainer />;

			case EstadoGeral.NovoCadastro:
			case EstadoGeral.EditandoCadastro:
				return <FormularioContainer />;

			default:
				return null;
		}
	}
}

export default SistemaFacil
