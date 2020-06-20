export const LISTAR_CADASTROS = 'LISTAR_CADASTROS';
export const SELECIONAR_CADASTRO = 'SELECIONAR_CADASTRO';
export const LISTAR_DADOS = 'LISTAR_DADOS';
export const DADOS_LISTADOS = 'DADOS_LISTADOS';
export const NOVO_CADASTRO = 'NOVO_CADASTRO';
export const CADASTRO_INCLUIDO = 'CADASTRO_INCLUIDO';

export function listarCadastros(cadastros) {
	return { type: LISTAR_CADASTROS, cadastros };
}

export function selecionarCadastro(cadastro) {
	return { type: SELECIONAR_CADASTRO, cadastro };
}

export function listarDados() {
	return { type: LISTAR_DADOS }
}

export function dadosListados(lista) {
	return { type: DADOS_LISTADOS, lista }
}

export function novoCadastro() {
	return { type: NOVO_CADASTRO };
}

export const EstadoGeral = {
	SemCadastros: 'SemCadastros',
	CadastrosListados: 'CadastrosListados',
	CadastroSelecionado: 'CadastroSelecionado',
	ListandoDados: 'ListandoDados',
	DadosListados: 'DadosListados',
	NovoCadastro: 'NovoCadastro',
	CadastroIncluido: 'CadastroIncluido'
};
