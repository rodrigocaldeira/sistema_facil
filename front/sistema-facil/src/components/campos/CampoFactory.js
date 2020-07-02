import Texto from './Texto';
import Email from './Email';
import Telefone from './Telefone';
import Numero from './Numero';
import Dinheiro from './Dinheiro';

const tiposDeCampo = {
	Email: Email,
	Telefone: Telefone,
	Número: Numero,
	Dinheiro: Dinheiro
}

export default function criarCampo(tipo) {
	if (tipo in tiposDeCampo) {
		return tiposDeCampo[tipo];
	}
	return Texto;
}
