import axios from 'axios';

const buscarCadastros = async () => {
	let response = await axios.get('http://localhost:8080/api/cadastros');
	let cadastros = response.data;
	return cadastros;
}

export default buscarCadastros;
