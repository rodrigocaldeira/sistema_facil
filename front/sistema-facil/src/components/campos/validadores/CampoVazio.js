class CampoVazio {
	validar(campo) {
		if (!campo.opcional) {
			if (
				(typeof campo.valor === 'object' && campo.valor === null) ||
				(typeof campo.valor !== 'object' && campo.valor.trim() === "")
			){
				return "O campo " + campo.nome + " não pode ficar em branco";
			}
		} 

		return "";
	}
}

export default CampoVazio;
