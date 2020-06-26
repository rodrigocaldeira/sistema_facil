import Texto from './Texto';
import Email from './Email';

export default function criarCampo(tipo) {
	switch (tipo) {
		case "Texto":
			return Texto;
		case "Email":
			return Email;
		default:
			return Texto;
	}
}
