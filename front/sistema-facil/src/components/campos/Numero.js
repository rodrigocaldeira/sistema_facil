import Texto from './Texto';
import VMasker from 'vanilla-masker/lib/vanilla-masker';

class Numero extends Texto {

	componentDidMount() {
		let campo = document.querySelector("#" + this.id());
		campo.addEventListener('input', this.inputHandler.bind(this), false);
	}

	inputHandler(event) {
		let campo = event.target;
		let valor = campo.value.replace(/\D/g, '');
		let mask = {
			precision: 0,
			unit: ''
		};
		this.definirValor(VMasker.toMoney(valor, mask));

	}
}

export default Numero;
