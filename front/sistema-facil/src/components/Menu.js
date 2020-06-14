import React from 'react';
import ItemContainer from '../containers/ItemContainer';
import './Menu.css';
import { propCadastro } from '../proptypes';
import PropTypes from 'prop-types';

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

Menu.propTypes = {
	cadastros: PropTypes.arrayOf(propCadastro).isRequired
};

export default Menu;
