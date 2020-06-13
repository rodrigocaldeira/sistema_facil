import React from 'react';
import  { ReactReduxContext } from 'react-redux';
import './SistemaFacil.css';
import Menu from './Menu';
import buscarCadastros from '../services/MenuService';

class SistemaFacil extends React.Component {
	static contextType = ReactReduxContext;

	constructor(props) {
		super(props);

		this.state = {
			cadastros: [],
			cadastro: {}
		};
		console.log(this.contextType)	
		const store = this.props.store;

		store.subscribe(() => {
			this.setState({ 
				cadastros: store.getState().cadastros,
				cadastro: store.getState().cadastro
			});
		});
	}


	componentDidMount() {
		buscarCadastros()
			.then(cadastros => {
				this.props.onInit(cadastros);
			});
	}

	render() {
		return (
			<div className="SistemaFacil">
				<Menu cadastros={this.state.cadastros}>
				</Menu>
				<div className="SistemaFacil-body">
					<h1>{this.state.cadastro.Nome}</h1>
				</div>
			</div>
		);
	}
}

export default SistemaFacil
