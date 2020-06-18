import { connect } from 'react-redux';
import { dadosListados, listarCadastros } from '../actions';
import SistemaFacil from '../components/SistemaFacil';

const mapStateToProps = (state, ownProps) => {
	return {
		...state,
		cadastros: ownProps.cadastros
	};
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return { 
		onInit: (ownProps) => dispatch(listarCadastros(ownProps.cadastros)),
		onDadosListados: (ownProps) => { dispatch(dadosListados(ownProps.lista)) }
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SistemaFacil);
