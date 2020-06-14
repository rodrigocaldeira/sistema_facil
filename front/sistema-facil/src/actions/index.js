export const LISTAR_CADASTROS = 'LISTAR_CADASTROS';
export const SELECIONAR_CADASTRO = 'SELECIONAR_CADASTRO';
export const LISTAR_DADOS = 'LISTAR_DADOS';

export function listarCadastros(cadastros) {
	return { type: LISTAR_CADASTROS, cadastros };
}

export function selecionarCadastro(cadastro) {
	return { type: SELECIONAR_CADASTRO, cadastro };
}

export function listarDados(cadastro) {
	return { type: LISTAR_DADOS, cadastro }
}

export const EstadoGeral = {
	SemCadastros: 'SemCadastros',
	CadastrosListados: 'CadastrosListados',
	CadastroSelecionado: 'CadastroSelecionado',
	ListandoDados: 'ListandoDados',
	DadosListados: 'DadosListados'
};
