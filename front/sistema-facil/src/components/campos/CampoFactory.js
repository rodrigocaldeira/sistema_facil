import Texto from './Texto';
import Email from './Email';
import Telefone from './Telefone';

const tiposDeCampo = {
	Email: Email,
	Telefone: Telefone
}

export default function criarCampo(tipo) {
	if (tipo in tiposDeCampo) {
		return tiposDeCampo[tipo];
	}
	return Texto;
}
