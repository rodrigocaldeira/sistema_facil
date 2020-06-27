import Texto from './Texto';
import VMasker from 'vanilla-masker/lib/vanilla-masker';
import TelefoneInvalido from './validadores/TelefoneInvalido';

class Telefone extends Texto {

	constructor(props) {
		super(props);
		this.validadores.push(new TelefoneInvalido());
	}

	componentDidMount() {
		let mask = ['(99) 9999-99999', '(99) 99999-9999'];
		let campo = document.querySelector("#" + this.id());
		campo.addEventListener('input', this.inputHandler.bind(this, mask, 14), false);
	}

	inputHandler(masks, max, event) {
		let campo = event.target;
		let valor = campo.value.replace(/\D/g, '');
		let indiceMask = campo.value.length > max ? 1 : 0;
		VMasker(campo).unMask();
		VMasker(campo).maskPattern(masks[indiceMask]);
		valor = VMasker.toPattern(valor, masks[indiceMask]);
		this.definirValor(valor);
	}
}

export default Telefone
