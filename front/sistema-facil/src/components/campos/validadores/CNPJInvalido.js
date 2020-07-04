class CNPJInvalido {
	validar(campo) {
		if (campo.valor) {
			let valor = campo.valor.replace(/\D/g, "");
			if (
				valor.length !== 14 ||
				/^(\d)\1+$/g.test(valor) ||
				!this.validarDigito(valor.substring(0, 12), parseInt(valor[12], 10)) || 
				!this.validarDigito(valor.substring(0, 13), parseInt(valor[13], 10))
			) {
				return "O campo " + campo.nome + " possui um CNPJ inválido";
			}

			return "";

		}
		return "";
	}

	validarDigito(texto, digito) {
		let soma = 0;
		let base = texto.length - 7;
		
		for (var i = 1; i <= texto.length; i++) {
			soma += parseInt(texto[i - 1], 10) * base--;
			if (base < 2) base = 9;
		}

		let resto = (soma * 10) % 11;
		if (resto >= 10) resto = 0;

		return resto === digito;
	}

}

export default CNPJInvalido;
