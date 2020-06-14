import React from 'react';
import './SistemaFacil.css';
import MenuContainer from '../containers/MenuContainer';
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
					<h1>{this.props.cadastro.Nome}</h1>
				</div>
			</div>
		);
	}
}

export default SistemaFacil
