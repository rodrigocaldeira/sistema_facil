import React from 'react';
import './Menu.css';
import PropTypes from 'prop-types';

const Menu = ({ cadastros, onCadastroSelecionado }) => (
	<div className="Menu">
		<span className="Menu-logo">Sistema Fácil</span>

		<ul className="Menu-cadastros">
		{cadastros.map(cadastro => <ItemMenu 
			key={cadastro.Nome} 
			cadastro={cadastro} 
			onClick={() => onCadastroSelecionado(cadastro)}></ItemMenu>) }
		</ul>
	</div>
)

const ItemMenu = ({ onClick, cadastro }) => (
	<li key={cadastro.Nome}	onClick={() => onClick()}>
		{cadastro.Nome}
	</li>
)

const propCampo = PropTypes.shape({
	Nome: PropTypes.string.isRequired,
	Tipo: PropTypes.string.isRequired,
	TaNaLista: PropTypes.bool.isRequired
}).isRequired;

const propCadastro = PropTypes.shape({
	Nome: PropTypes.string.isRequired,
	Campos: PropTypes.arrayOf(propCampo).isRequired
}).isRequired;

ItemMenu.propTypes = {
	onClick: PropTypes.func.isRequired,
	cadastro: propCadastro
};

export default Menu;
