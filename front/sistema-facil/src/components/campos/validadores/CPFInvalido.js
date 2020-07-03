class CPFInvalido {
	validar(campo) {
		if (campo.valor) {
			let valor = campo.valor.replace(/\D/g, "");
			if (
				valor.length !== 11 ||
				/^(\d)\1+$/g.test(valor) ||
				!this.validarDigito(valor.substring(0, 9), parseInt(valor[9], 10)) || 
				!this.validarDigito(valor.substring(0, 10), parseInt(valor[10], 10))
			) {
				return "O campo " + campo.nome + " possui um CPF inválido";
			}

			return "";

		}
		return "";
	}

	validarDigito(texto, digito) {
		let soma = 0;
		let base = texto.length + 2;
		
		for (var i = 1; i <= texto.length; i++) {
			soma += parseInt(texto[i - 1], 10) * (base - i);
		}

		let resto = (soma * 10) % 11;
		if (resto >= 10) resto = 0;

		return resto === digito;
	}

}

export default CPFInvalido;
