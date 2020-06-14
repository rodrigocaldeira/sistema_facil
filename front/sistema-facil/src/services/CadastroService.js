import axios from 'axios';

export const listarDados = async (cadastro) => {
	let response = await axios.post('http://localhost:8080/api/listar', { __cadastro: cadastro.Nome } );
	let dados = response.data;
	return dados;
}

