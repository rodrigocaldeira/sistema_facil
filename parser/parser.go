package parser

import (
	"errors"
	"github.com/rodrigocaldeira/sistema_facil/estrutura"
	"strings"
)

var tiposValidos []string = []string{
	"Texto",
}

func LerCampos(conteudoDoArquivo string) ([]*estrutura.Campo, error) {
	linhas := strings.Split(conteudoDoArquivo, "\n")

	if len(linhas) == 1 {
		return nil, errors.New("O arquivo está vazio")
	}

	achouOsCampos := false

	var campos []*estrutura.Campo

	for _, linha := range linhas {
		if strings.Trim(linha, "\r") == "Campos" {
			achouOsCampos = true
			continue
		}

		if strings.HasPrefix(linha, "\t") {
			if achouOsCampos {
				campo, err := lerCampo(linha)

				if err != nil {
					return nil, err
				}

				campos = append(campos, campo)
			}
		} else {
			if achouOsCampos {
				break
			}
		}
	}

	if !achouOsCampos || len(campos) == 0 {
		return nil, errors.New("O arquivo não tem campos definidos")
	}

	return campos, nil
}

func lerCampo(linha string) (*estrutura.Campo, error) {

	linha = strings.Trim(linha, "\t")

	definicaoDoCampo := strings.Split(linha, ",")

	if len(definicaoDoCampo) != 2 {
		return nil, errors.New("Arquivo com campo mal formatado")
	}

	nome := strings.TrimSpace(definicaoDoCampo[0])
	tipo := strings.TrimSpace(definicaoDoCampo[1])

	if tipo == "" {
		return nil, errors.New("Arquivo com campo mal formatado")
	}

	if !tipoDeCampoValido(tipo) {
		return nil, errors.New("Tipo inválido")
	}

	return &estrutura.Campo{
		Nome: nome,
		Tipo: tipo,
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
