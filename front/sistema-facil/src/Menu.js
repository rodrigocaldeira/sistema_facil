import React from 'react';
import './Menu.css';

class Menu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			cadastros: []
		};
	}

	montarMenu() {
		let menu = [];
		this.state.cadastros.map((cadastro) => {
			menu.push(<li key={cadastro.Nome}>{cadastro.Nome}</li>);
		});
		return menu;
	}
	
	componentDidMount() {
		fetch('http://localhost:8080/api/cadastros', {method: 'GET'})
			.then(response => response.json())
			.then(cadastros => this.setState({ cadastros: cadastros }));
	}

	render() {
		return(
			<div className="Menu">
				<span className="Menu-logo">Sistema Fácil</span>

				<ul className="Menu-cadastros">
					{this.montarMenu()}
				</ul>
			</div>
		);
	}
}

export default Menu;
