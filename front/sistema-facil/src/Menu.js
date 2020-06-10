import React from 'react';
import './Menu.css';

class Menu extends React.Component {
	render() {
		return(
			<div className="Menu">
				<span className="Menu-logo">Sistema Fácil</span>

				<ul className="Menu-cadastros">
					{this.props.cadastros.map(cadastro => <ItemMenu key={cadastro.Nome} cadastro={cadastro}></ItemMenu>) }
				</ul>
			</div>
		);
	}
}

class ItemMenu extends React.Component {
	render = () => <li key={this.props.cadastro.Nome}>{this.props.cadastro.Nome}</li>
}
export default Menu;
