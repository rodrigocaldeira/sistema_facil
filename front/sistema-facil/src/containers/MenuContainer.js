import { connect } from 'react-redux';
import { listarDados } from '../actions';
import Menu from '../components/Menu';

const mapStateToProps = (state, ownProps) => {
	return {
		...state,
		cadastro: ownProps.cadastro
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onCadastroSelecionado: () => {
			dispatch(listarDados(ownProps.cadastro));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

