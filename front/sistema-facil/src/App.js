import React from 'react';
import './App.css';
import Menu from './Menu';
import axios from 'axios';
import Campo from './Campo';

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			cadastros: []
		}
	}

	componentDidMount() {
		axios.get('http://localhost:8080/api/cadastros')
			.then(res => this.setState({ cadastros: res.data }));
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
				<Menu cadastros={this.state.cadastros}>
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

export default App;
