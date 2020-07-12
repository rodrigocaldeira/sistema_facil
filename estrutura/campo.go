package estrutura

import (
	"errors"
	"fmt"
	"strings"
)

var tiposValidos []string = []string{
	"Texto",
	"Email",
	"Telefone",
	"Número",
	"Número Decimal",
	"Dinheiro",
	"CPF",
	"CNPJ",
	"Senha",
	"Data",
	"Data e Hora",
	"Liga/Desliga",
	"Lista",
}

type Campo struct {
	Nome      string
	Tipo      string
	TaNaLista bool
	Opcional  bool
	Opcoes    []string
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
		Opcoes:    make([]string, 0),
	}

	verificarCampoOpcional(campo, opcoes)
	err := verificarCampoLista(campo, opcoes)

	if err != nil {
		return nil, err
	}

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

func verificarCampoLista(campo *Campo, opcoes []string) error {
	if campo.Tipo == "Lista" {
		for _, opcao := range opcoes {
			if strings.HasPrefix(strings.TrimSpace(opcao), "Opções") {
				lista := opcao
				lista = strings.TrimSpace(lista)
				if lista == "" {
					break
				}

				lista = lista[len("Opções"):]
				lista = strings.TrimSpace(lista)

				opcoesDaLista := strings.Split(lista, ";")
				for _, opcaoDaLista := range opcoesDaLista {
					opcaoDaLista = strings.TrimSpace(opcaoDaLista)
					if opcaoDaLista != "" {
						campo.Opcoes = append(campo.Opcoes, opcaoDaLista)
					}
				}

				break
			}
		}

		if len(campo.Opcoes) == 0 {
			return fmt.Errorf("O campo %s deve ter opções", campo.Nome)
		}
	}

	return nil
}

func tipoDeCampoValido(tipo string) bool {
	for _, tipoValido := range tiposValidos {
		if tipo == tipoValido {
			return true
		}
	}
	return false
}
