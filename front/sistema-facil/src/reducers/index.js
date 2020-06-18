import { LISTAR_CADASTROS, SELECIONAR_CADASTRO, LISTAR_DADOS, DADOS_LISTADOS, EstadoGeral } from '../actions';

const initialState = {
	cadastros: [],
	cadastro: {},
	estadoGeral: EstadoGeral.SemCadastros	
};

function sistemaFacilApp(state, action) {
	if (typeof state === 'undefined') {
		return initialState;
	}

	switch (action.type) {
		case LISTAR_CADASTROS:
			return {
				...state,
				cadastros: action.cadastros,
				estadoGeral: EstadoGeral.CadastrosListados
			};

		case SELECIONAR_CADASTRO:
			return {
				...state,
				cadastro: action.cadastro,
				estadoGeral: EstadoGeral.CadastroSelecionado
			};

		case LISTAR_DADOS:
			return {
				...state,
				estadoGeral: EstadoGeral.ListandoDados
			};

		case DADOS_LISTADOS:
			return {
				...state,
				lista: action.lista ?? [],
				estadoGeral: EstadoGeral.DadosListados
			};

		default:
			return state;
	}
}

export default sistemaFacilApp;
