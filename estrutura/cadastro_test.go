package estrutura

import (
	"fmt"
	"testing"
)

func criarCadastro() Cadastro {
	campoNome, _ := NewCampo("Nome", "Texto")
	campoEmail, _ := NewCampo("Email", "Texto")

	var campos []*Campo = []*Campo{campoNome, campoEmail}

	return NewCadastro("Usuário", campos)
}

func TestAtribuirLista(t *testing.T) {
	cadastro := criarCadastro()

	lista := []string{"Nome", "Email"}

	err := cadastro.AtribuirLista(lista)

	if err != nil {
		t.Fatal(err)
	}

	for _, campo := range cadastro.Campos {
		if !campo.TaNaLista {
			t.Fatal(fmt.Sprintf("O campo %s deveria estar na lista, mas não está.", campo.Nome))
		}
	}
}

func TestListaComCampoQueNaoFazParteDoCadastro(t *testing.T) {
	cadastro := criarCadastro()

	lista := []string{"Campo nada a ve, huehue"}

	err := cadastro.AtribuirLista(lista)

	if err == nil {
		t.Error("Deveria ter dado erro pois o campo não está na lista")
	}
}
