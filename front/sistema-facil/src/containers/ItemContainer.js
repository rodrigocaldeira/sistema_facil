import { connect } from 'react-redux';
import { selecionarCadastro, listarDados } from '../actions';
import ItemMenu from '../components/ItemMenu';

const mapStateToProps = (state, ownProps) => {
	return {
		...state,
		cadastro: ownProps.cadastro
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onClick: () => {
			dispatch(selecionarCadastro(ownProps.cadastro));
			dispatch(listarDados());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemMenu);

