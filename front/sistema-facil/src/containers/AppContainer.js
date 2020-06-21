import { connect } from 'react-redux';
import { listarDados, dadosListados, listarCadastros, editandoCadastro } from '../actions';
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
		onDadosListados: (ownProps) => { dispatch(dadosListados(ownProps.lista)) },
		onCadastroIncluido: (ownProps) => { dispatch(listarDados()) },
		onDadosBuscados: (ownProps) => { dispatch(editandoCadastro(ownProps.dados)) },
		onCadastroEditado: (ownProps) => { dispatch(listarDados()) },
		onCadastroExcluido: (ownProps) => { dispatch(listarDados()) }
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SistemaFacil);
