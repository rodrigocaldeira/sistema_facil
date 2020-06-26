package estrutura

import (
	"errors"
	"strings"
)

var tiposValidos []string = []string{
	"Texto",
	"Email",
}

type Campo struct {
	Nome      string
	Tipo      string
	TaNaLista bool
	Opcional  bool
}

func NewCampo(nome string, tipo string, opcoes ...string) (*Campo, error) {
	if !tipoDeCampoValido(tipo) {
		return nil, errors.New("Tipo inválido")
	}

	campo := &Campo{
		Nome:      nome,
		Tipo:      tipo,
		TaNaLista: false,
		Opcional:  false,
	}

	verificarCampoOpcional(campo, opcoes)

	return campo, nil
}

func verificarCampoOpcional(campo *Campo, opcoes []string) {
	for _, opcao := range opcoes {
		if strings.TrimSpace(opcao) == "Opcional" {
			campo.Opcional = true
			return
		}
	}
}

func tipoDeCampoValido(tipo string) bool {
	for _, tipoValido := range tiposValidos {
		if tipo == tipoValido {
			return true
		}
	}
	return false
}
