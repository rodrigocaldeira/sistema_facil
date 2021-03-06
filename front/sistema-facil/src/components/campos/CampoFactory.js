import Texto from './Texto';
import Email from './Email';
import Telefone from './Telefone';
import Numero from './Numero';
import NumeroDecimal from './NumeroDecimal';
import Dinheiro from './Dinheiro';
import CPF from './CPF';
import CNPJ from './CNPJ';
import Senha from './Senha';
import Data from './Data';
import DataHora from './DataHora';
import LigaDesliga from './LigaDesliga';
import Lista from './Lista';

const tiposDeCampo = {
	Email: Email,
	Telefone: Telefone,
	Número: Numero,
	Dinheiro: Dinheiro,
	"Número Decimal": NumeroDecimal,
	CPF: CPF,
	CNPJ: CNPJ,
	Senha: Senha,
	Data: Data,
	"Data e Hora": DataHora,
	"Liga/Desliga": LigaDesliga,
	Lista: Lista
}

export default function criarCampo(tipo) {
	if (tipo in tiposDeCampo) {
		return tiposDeCampo[tipo];
	}
	return Texto;
}
