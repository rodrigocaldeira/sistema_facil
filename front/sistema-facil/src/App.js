import React from 'react';
import './App.css';
import Menu from './Menu';
import axios from 'axios';

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

		return (
			<div className="App">
				<Menu cadastros={this.state.cadastros}>
				</Menu>
				<div className="App-body">
					<input type="text" />
				</div>
			</div>
		);
	}
}

export default App;
