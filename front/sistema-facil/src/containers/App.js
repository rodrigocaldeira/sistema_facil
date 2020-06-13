import { connect } from 'react-redux';
import { listarCadastros } from '../actions';
import SistemaFacil from '../components/SistemaFacil';

const mapStateToProps = (state, ownProps) => {
	return {
		...state,
		cadastros: ownProps.cadastros
	};
}

const mapDispatchToProps = (dispatch, cadastros) => {
	return { 
		onInit: (cadastros) => dispatch(listarCadastros(cadastros))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SistemaFacil);
