import React from 'react';
import './SistemaFacil.css';
import MenuContainer from '../containers/MenuContainer';
import TabelaContainer from '../containers/TabelaContainer';
import buscarCadastros from '../services/MenuService';
import { listarDados } from '../services/CadastroService';
import { EstadoGeral } from '../actions';

class SistemaFacil extends React.Component {
	componentDidMount() {
		buscarCadastros()
			.then(cadastros => {
				this.props.onInit({ cadastros });
			});
	}

	render() {
		let tabelaContainer;
		if (this.props.estadoGeral === EstadoGeral.ListandoDados) {
			listarDados(this.props.cadastro)
				.then(lista => {
					this.props.onDadosListados({ lista });
				});
		} else if (this.props.estadoGeral === EstadoGeral.DadosListados) {
			tabelaContainer = <TabelaContainer />;
		} else {
			tabelaContainer = null;
		}


		return (
			<div className="SistemaFacil">
				<MenuContainer />
				<div className="SistemaFacil-body">
				{tabelaContainer}
				</div>
			</div>
		);
	}
}

export default SistemaFacil
