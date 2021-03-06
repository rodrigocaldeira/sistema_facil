import { 
	LISTAR_CADASTROS, 
	SELECIONAR_CADASTRO, 
	LISTAR_DADOS, 
	DADOS_LISTADOS, 
	NOVO_CADASTRO,
	CADASTRO_INCLUIDO,
	BUSCANDO_CADASTRO,
	EDITANDO_CADASTRO,
	CADASTRO_EDITADO,
	EXCLUINDO_CADASTRO,
	EstadoGeral	
} from '../actions';

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
				id: undefined,
				dados: undefined,
				estadoGeral: EstadoGeral.DadosListados
			};

		case NOVO_CADASTRO:
			return {
				...state,
				estadoGeral: EstadoGeral.NovoCadastro
			}

		case CADASTRO_INCLUIDO:
			return {
				...state,
				estadoGeral: EstadoGeral.CadastroIncluido
			}

		case BUSCANDO_CADASTRO:
			return {
				...state,
				id: action.id,
				estadoGeral: EstadoGeral.BuscandoCadastro
			}

		case EDITANDO_CADASTRO:
			return {
				...state,
				dados: action.dados,
				estadoGeral: EstadoGeral.EditandoCadastro
			}

		case CADASTRO_EDITADO:
			return {
				...state,
				estadoGeral: EstadoGeral.CadastroEditado
			}

		case EXCLUINDO_CADASTRO:
			return {
				...state,
				id: action.id,
				estadoGeral: EstadoGeral.ExcluindoCadastro
			}

		default:
			return state;
	}
}

export default sistemaFacilApp;
