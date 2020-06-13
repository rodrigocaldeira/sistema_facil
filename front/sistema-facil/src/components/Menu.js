import React from 'react';
import { connect } from 'react-redux';
import ItemCadastro from '../containers/ItemCadastro';
import './Menu.css';
import { propCadastro } from '../proptypes';
import PropTypes from 'prop-types';

const Menu = ({ cadastros }) => (
	<div className="Menu">
		<span className="Menu-logo">Sistema Fácil</span>

		<ul className="Menu-cadastros">
		{cadastros.map(cadastro => <ItemCadastro 
			key={cadastro.Nome} 
			cadastro={cadastro} 
			></ItemCadastro>) }
		</ul>
	</div>
)

Menu.propTypes = {
	cadastros: PropTypes.arrayOf(propCadastro).isRequired
};

export default connect()(Menu);
