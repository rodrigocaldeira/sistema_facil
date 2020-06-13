import PropTypes from 'prop-types';

export const propCampo = PropTypes.shape({
	Nome: PropTypes.string.isRequired,
	Tipo: PropTypes.string.isRequired,
	TaNaLista: PropTypes.bool.isRequired
}).isRequired;

export const propCadastro = PropTypes.shape({
	Nome: PropTypes.string.isRequired,
	Campos: PropTypes.arrayOf(propCampo).isRequired
}).isRequired;
