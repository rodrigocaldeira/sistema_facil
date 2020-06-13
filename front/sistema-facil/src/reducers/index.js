import { LISTAR_CADASTROS, SELECIONAR_CADASTRO } from '../actions';

const initialState = {
	cadastros: [],
	cadastro: {}
};

function sistemaFacilApp(state, action) {
	if (typeof state === 'undefined') {
		return initialState;
	}

	switch (action.type) {
		case SELECIONAR_CADASTRO:
			return {
				...state,
				cadastro: action.cadastro
			};

		case LISTAR_CADASTROS:
			return {
				...state,
				cadastros: action.cadastros
			};

		default:
			return state;
	}
}

export default sistemaFacilApp;
