export const LISTAR_CADASTROS = 'LISTAR_CADASTROS';
export const SELECIONAR_CADASTRO = 'SELECIONAR_CADASTRO';


export function listarCadastros(cadastros) {
	return { type: LISTAR_CADASTROS, cadastros };
}

export function selecionarCadastro(cadastro) {
	return { type: SELECIONAR_CADASTRO, cadastro };
}
