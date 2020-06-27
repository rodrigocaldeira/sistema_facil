class TelefoneInvalido {
	validar(campo) {
		if (campo.valor) {
			let valor = campo.valor.replace(/\D/g, "");
			if (valor.length !== 10 && valor.length !== 11) {
				return "O campo " + campo.nome + " possui um telefone inválido";
			}

		}
		return "";
	}
}

export default TelefoneInvalido;
