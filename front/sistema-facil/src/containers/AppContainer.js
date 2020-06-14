import { connect } from 'react-redux';
import { listarCadastros } from '../actions';
import SistemaFacil from '../components/SistemaFacil';

const mapStateToProps = (state, ownProps) => {
	return {
		...state,
		cadastros: ownProps.cadastros
	};
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return { 
		onInit: (ownProps) => dispatch(listarCadastros(ownProps.cadastros))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SistemaFacil);
