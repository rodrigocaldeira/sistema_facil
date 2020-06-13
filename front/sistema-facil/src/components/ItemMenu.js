import React from 'react';
import { propCadastro } from '../proptypes';
import PropTypes from 'prop-types';

const ItemMenu = ({ onClick, cadastro }) => (
	<li key={cadastro.Nome}	onClick={onClick}>
		{cadastro.Nome}
	</li>
)

ItemMenu.propTypes = {
	onClick: PropTypes.func.isRequired,
	cadastro: propCadastro
};

export default ItemMenu;
