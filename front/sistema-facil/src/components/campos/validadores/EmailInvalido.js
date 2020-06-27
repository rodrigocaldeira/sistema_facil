class EmailInvalido {
	validar(campo) {
		if (campo.valor) {
			const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			if (!regexEmail.test(campo.valor.toLowerCase())) {
				return "O campo " + campo.nome + " possui um e-mail inválido";
			}
		}
		return "";
	}
}

export default EmailInvalido;
