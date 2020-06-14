import React from 'react';
import './SistemaFacil.css';
import MenuContainer from '../containers/MenuContainer';
import TabelaContainer from '../containers/TabelaContainer';
import buscarCadastros from '../services/MenuService';

class SistemaFacil extends React.Component {
	componentDidMount() {
		buscarCadastros()
			.then(cadastros => {
				this.props.onInit({ cadastros });
			});
	}

	render() {
		return (
			<div className="SistemaFacil">
				<MenuContainer />
				<div className="SistemaFacil-body">
					<TabelaContainer />
				</div>
			</div>
		);
	}
}

export default SistemaFacil
