import { connect } from 'react-redux';
import { dadosListados } from '../actions';
import Tabela from '../components/Tabela';

const mapStateToProps = (state, ownProps) => {
	return {
		...state,
		lista: ownProps.lista
	};
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onDadosListados: (ownProps) => { dispatch(dadosListados(ownProps.lista)) }
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabela);
