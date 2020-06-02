package estrutura

import (
	"fmt"
	"testing"
)

func criarCadastro() *Cadastro {
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

func TestRetornandoOsCamposDaLista(t *testing.T) {
	cadastro := criarCadastro()

	lista := []string{"Nome", "Email"}

	cadastro.AtribuirLista(lista)

	camposDaLista := cadastro.CamposDaLista()

	if len(camposDaLista) != len(cadastro.Campos) {
		t.Fatal("A lista deveria estar completa!")
	}
}

func TestRetonandoOCampoNomeComoEstandoNaLista(t *testing.T) {
	cadastro := criarCadastro()

	lista := []string{"Nome"}

	cadastro.AtribuirLista(lista)

	camposDaLista := cadastro.CamposDaLista()

	if len(camposDaLista) != 1 {
		t.Fatal("Deveria ter retornado ao menos um campo!")
	}

	if camposDaLista[0].Nome != "Nome" {
		t.Fatal("Deveria ter retornado o campo Nome como estando na lista!")
	}
}

func TestValidandoValoresDeUmCadastro(t *testing.T) {
	cadastro := criarCadastro()

	valores := map[string]interface{}{
		"nome":  "Rodrigo Caldeira",
		"email": "rodrigocaldeira@gmail.com",
	}

	err := cadastro.ValidarValores(valores)

	if err != nil {
		t.Error(fmt.Sprintf("Deveria ter validado os valores, mas deu erro: %s", err))
	}
}

func TestValidandoComValorInexistenteNoCadastro(t *testing.T) {
	cadastro := criarCadastro()

	valores := map[string]interface{}{
		"campo_inexistente": "qualquer valor",
	}

	err := cadastro.ValidarValores(valores)

	if err == nil {
		t.Error("Deveria ter dado erro pois o campo campo_inexistente não está no cadastro.")
	}
}
