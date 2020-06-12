import axios from 'axios';

class MenuService {
	async BuscarCadastros() {
		let response = await axios.get('http://localhost:8080/api/cadastros');
		return response.data ?? [];
	}
}

export default MenuService;
