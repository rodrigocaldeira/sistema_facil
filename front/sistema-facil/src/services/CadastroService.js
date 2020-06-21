import axios from 'axios';

export const listarDados = async (cadastro) => {
	let response = await axios.post('http://localhost:8080/api/listar', { __cadastro: cadastro.Nome } );
	let dados = response.data;
	return dados;
}

export const incluirCadastro = async (cadastro, campos) => {
	let valores = {};
	campos.forEach(campo => {
		valores[campo.nome.toLowerCase()] = campo.valor;
	});

	let payload = {
		__cadastro: cadastro.Nome,
		__valores: {
			...valores
		}
	};

	return axios.post('http://localhost:8080/api/incluir', payload);
}

export const buscarCadastro = async (cadastro, id) => {
	let response = await axios.post('http://localhost:8080/api/buscar', {
		__cadastro: cadastro.Nome,
		id
	});
	let dados = response.data;
	return dados;
}

export const editarCadastro = async (cadastro, campos, id) => {
	let valores = {};
	campos.forEach(campo => {
		valores[campo.nome.toLowerCase()] = campo.valor;
	});

	let payload = {
		__cadastro: cadastro.Nome,
		id,
		__valores: {
			...valores
		}
	};

	return axios.post('http://localhost:8080/api/alterar', payload);
}

export const excluirCadastro = async (cadastro, id) => {
	return axios.post('http://localhost:8080/api/deletar', {
		__cadastro: cadastro.Nome,
		id
	});
}
