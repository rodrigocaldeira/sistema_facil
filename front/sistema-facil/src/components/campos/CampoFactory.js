import Texto from './Texto';
import Email from './Email';
import Telefone from './Telefone';
import Numero from './Numero';
import NumeroDecimal from './NumeroDecimal';
import Dinheiro from './Dinheiro';
import CPF from './CPF';

const tiposDeCampo = {
	Email: Email,
	Telefone: Telefone,
	Número: Numero,
	Dinheiro: Dinheiro,
	"Número Decimal": NumeroDecimal,
	CPF: CPF
}

export default function criarCampo(tipo) {
	if (tipo in tiposDeCampo) {
		return tiposDeCampo[tipo];
	}
	return Texto;
}
