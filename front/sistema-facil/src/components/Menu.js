import React from 'react';
import ItemContainer from '../containers/ItemContainer';
import './Menu.css';

const Menu = ({ cadastros }) => (
	<div className="Menu">
		<span className="Menu-logo">Sistema Fácil</span>

		<ul className="Menu-cadastros">
		{cadastros.map(cadastro => <ItemContainer 
			key={cadastro.Nome} 
			cadastro={cadastro}
			></ItemContainer>) }
		</ul>
	</div>
)

export default Menu;
