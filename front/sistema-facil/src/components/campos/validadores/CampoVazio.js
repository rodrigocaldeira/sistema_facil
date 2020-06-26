class CampoVazio {
	validar(campo) {
		if (!(campo.opcional || (campo.valor && campo.valor.trim() !== ""))) {
			return "O campo " + campo.nome + " não pode ficar em branco";
		} else return "";
	}
}

export default CampoVazio;
