class CPFInvalido {
	validar(campo) {
		if (campo.valor) {
			let valor = campo.valor.replace(/\D/g, "");
			if (valor.length !== 11) {
				return "O campo " + campo.nome + " possui um CPF inválido";
			}

			if (this.tudoIgual(valor)) {
				return "O campo " + campo.nome + " possui um CPF inválido";
			}

			let soma = 0;

			for (var i = 1; i <= 9; i++) {
				soma += parseInt(valor[i - 1], 10) * (11 - i);
			}

			let resto = (soma * 10) % 11;
			if (resto >= 10) resto = 0;
			
			if (resto !== parseInt(valor[9], 10)) return "O campo " + campo.nome + " possui um CPF inválido";

			soma = 0;

			for (var i = 1; i <= 10; i++) {
				soma += parseInt(valor[i - 1], 10) * (12 - i);
			}

			resto = (soma * 10) % 11;
			if (resto >= 10) resto = 0;

			if (resto !== parseInt(valor[10], 10)) return "O campo " + campo.nome + " possui um CPF inválido";

			return "";

		}
		return "";
	}

	tudoIgual(valor) {
		for (var i = 0; i < valor.length - 1; i++) {
			if (valor[i] !== valor[i + 1]) return false;
		}
		return true;
	}
}

export default CPFInvalido;
