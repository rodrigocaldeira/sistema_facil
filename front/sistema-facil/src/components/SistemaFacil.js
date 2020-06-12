import React from 'react';
import './SistemaFacil.css';
import Menu from './Menu';
import Campo from './Campo';

class SistemaFacil extends React.Component {
	constructor(props) {
		super(props);
		
		this.menuService = props.menuService;

		this.state = {
			cadastros: []
		}
	}

	cadastroSelecionado(cadastro) {
		console.log(cadastro);
	}

	componentDidMount() {
		this.menuService
			.BuscarCadastros()
			.then(cadastros => this.setState({ cadastros: cadastros }));
	}


	render() {
		const campoNome = {
			nome: "Nome"
		};

		const campoEmail = {
			nome: "Email"
		}

		const campoTelefone = {
			nome: "Telefone"
		};

		return (
			<div className="App">
				<Menu cadastros={this.state.cadastros} onCadastroSelecionado={this.cadastroSelecionado}>
				</Menu>
				<div className="App-body">
					<Campo campo={campoNome} />
					<Campo campo={campoEmail} />
					<Campo campo={campoTelefone} />
				</div>
			</div>
		);
	}
}

export default SistemaFacil;
