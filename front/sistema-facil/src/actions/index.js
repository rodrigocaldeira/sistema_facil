export const LISTAR_CADASTROS = 'LISTAR_CADASTROS';
export const SELECIONAR_CADASTRO = 'SELECIONAR_CADASTRO';
export const LISTAR_DADOS = 'LISTAR_DADOS';
export const DADOS_LISTADOS = 'DADOS_LISTADOS';
export const NOVO_CADASTRO = 'NOVO_CADASTRO';
export const CADASTRO_INCLUIDO = 'CADASTRO_INCLUIDO';
export const BUSCANDO_CADASTRO = 'BUSCANDO_CADASTRO';
export const EDITANDO_CADASTRO = 'EDITANDO_CADASTRO';
export const CADASTRO_EDITADO = 'CADASTRO_EDITADO';
export const EXCLUINDO_CADASTRO = 'EXCLUINDO_CADASTRO';

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

export function editandoCadastro(dados) {
	return { type: EDITANDO_CADASTRO, dados };
}

export const EstadoGeral = {
	SemCadastros: 'SemCadastros',
	CadastrosListados: 'CadastrosListados',
	CadastroSelecionado: 'CadastroSelecionado',
	ListandoDados: 'ListandoDados',
	DadosListados: 'DadosListados',
	NovoCadastro: 'NovoCadastro',
	CadastroIncluido: 'CadastroIncluido',
	BuscandoCadastro: 'BuscandoCadastro',
	EditandoCadastro: 'EditandoCadastro',
	CadastroEditado: 'CadastroEditado',
	CadastroExcluido: 'CadastroExcluido'
};
