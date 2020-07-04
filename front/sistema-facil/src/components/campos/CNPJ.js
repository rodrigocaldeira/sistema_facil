import Texto from './Texto';
import VMasker from 'vanilla-masker/lib/vanilla-masker';
import CNPJInvalido from './validadores/CNPJInvalido';

class CPF extends Texto {

	constructor(props) {
		super(props);
		this.validadores.push(new CNPJInvalido());
	}

	componentDidMount() {
		let mask = '99.999.999/9999-99';
		let campo = document.querySelector("#" + this.id());
		campo.addEventListener('input', this.inputHandler.bind(this, mask), false);
	}

	inputHandler(mask, event) {
		let campo = event.target;
		let valor = campo.value.replace(/\D/g, '');
		VMasker(campo).unMask();
		VMasker(campo).maskPattern(mask);
		valor = VMasker.toPattern(valor, mask);
		this.definirValor(valor);
	}
}

export default CPF;
