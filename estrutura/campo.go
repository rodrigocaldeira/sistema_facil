package estrutura

import (
	"errors"
)

var tiposValidos []string = []string{
	"Texto",
}

type Campo struct {
	Nome      string
	Tipo      string
	TaNaLista bool
}

func NewCampo(nome string, tipo string) (*Campo, error) {
	if !tipoDeCampoValido(tipo) {
		return nil, errors.New("Tipo inválido")
	}

	return &Campo{
		Nome:      nome,
		Tipo:      tipo,
		TaNaLista: false,
	}, nil
}

func tipoDeCampoValido(tipo string) bool {
	for _, tipoValido := range tiposValidos {
		if tipo == tipoValido {
			return true
		}
	}
	return false
}
