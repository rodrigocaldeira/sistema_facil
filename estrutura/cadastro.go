package estrutura

import (
	"errors"
	"fmt"
	"strings"
)

type Cadastro struct {
	Nome   string
	Campos []*Campo
}

func NewCadastro(nome string, campos []*Campo) Cadastro {
	return Cadastro{
		Nome:   nome,
		Campos: campos,
	}
}

func (c Cadastro) AtribuirLista(lista []string) error {
	for _, campoNaLista := range lista {
		achouOCampo := false
		for _, campo := range c.Campos {
			if campo.Nome == campoNaLista {
				campo.TaNaLista = true
				achouOCampo = true
				break
			}
		}

		if !achouOCampo {
			return errors.New(fmt.Sprintf("O campo %s não faz parte desse cadastro", campoNaLista))
		}
	}
	return nil
}

func (c Cadastro) CamposDaLista() []*Campo {
	var campos []*Campo

	for _, campo := range c.Campos {
		if campo.TaNaLista {
			campos = append(campos, campo)
		}
	}

	return campos
}

func (c Cadastro) ValidarValores(valores map[string]interface{}) error {
	for chave, _ := range valores {
		achouOCampo := false
		for _, campo := range c.Campos {
			if strings.ToLower(campo.Nome) == chave {
				achouOCampo = true
			}
		}

		if !achouOCampo {
			return fmt.Errorf("O campo %s não faz parte deste cadastro", chave)
		}
	}

	return nil
}
