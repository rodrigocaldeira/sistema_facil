package estrutura

type Campo struct {
	Nome      string
	Tipo      string
	TaNaLista bool
}

func NewCampo(nome string, tipo string) *Campo {
	return &Campo{
		Nome:      nome,
		Tipo:      tipo,
		TaNaLista: false,
	}
}
