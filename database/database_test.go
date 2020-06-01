package database

import (
	"fmt"
	"github.com/rodrigocaldeira/sistema_facil/estrutura"
	"io/ioutil"
	"testing"
)

func criarCadastro() estrutura.Cadastro {
	campoNome, _ := estrutura.NewCampo("Nome", "Texto")
	campoEmail, _ := estrutura.NewCampo("Email", "Texto")

	var campos []*estrutura.Campo = []*estrutura.Campo{campoNome, campoEmail}

	return estrutura.NewCadastro("Usuário", campos)
}

func iniciarBaseDeTeste() {
	caminhoDB, _ := ioutil.TempDir("", "teste_db_sistema_facil")
	IniciarDatabase(caminhoDB)
}

func setup() estrutura.Cadastro {
	iniciarBaseDeTeste()
	cadastro := criarCadastro()
	ConfigurarCadastro(&cadastro)
	return cadastro
}

func TestIncluirCadastro(t *testing.T) {
	cadastro := setup()
	defer FecharDatabase()

	valores := map[string]interface{}{
		"nome":  "Rodrigo Caldeira",
		"email": "rodrigocaldeira@gmail.com",
	}

	id, err := IncluirCadastro(cadastro, valores)

	if err != nil {
		t.Error(fmt.Sprintf("Deveria ter incluído o cadastro, mas deu erro: %s", err))
	}

	if id == 0 {
		t.Error("Esperava um id válido!")
	}
}

func TestAtualizarCadastro(t *testing.T) {
	cadastro := setup()
	defer FecharDatabase()

	valores := map[string]interface{}{
		"nome":  "Rodrigo Caldeira",
		"email": "rodrigocaldeira@gmail.com",
	}

	id, _ := IncluirCadastro(cadastro, valores)

	valores["nome"] = "Rodrigo Caldeira de Paula Lima"

	err := AlterarCadastro(cadastro, id, valores)

	if err != nil {
		t.Error(fmt.Sprintf("Deveria ter atualizado o cadastro, mas deu erro: %s", err))
	}
}

func TestBuscarUmCadastro(t *testing.T) {
	cadastro := setup()
	defer FecharDatabase()

	valores := map[string]interface{}{
		"nome":  "Rodrigo Caldeira",
		"email": "rodrigocaldeira@gmail.com",
	}

	id, _ := IncluirCadastro(cadastro, valores)

	valoresSalvos, err := BuscarCadastro(cadastro, id)

	if err != nil {
		t.Error(fmt.Sprintf("Deveria ter retornado os valores do cadastro, mas deu erro: %s", err))
	}

	if valoresSalvos["nome"] != valores["nome"] && valoresSalvos["email"] != valores["email"] {
		t.Error(fmt.Sprintf("Sei lá o que veio: %v", valoresSalvos))
	}
}

func TestListarCadastros(t *testing.T) {
	cadastro := setup()
	defer FecharDatabase()

	valores := map[string]interface{}{
		"nome":  "Rodrigo Caldeira",
		"email": "rodrigocaldeira@gmail.com",
	}

	IncluirCadastro(cadastro, valores)

	valores["nome"] = "José da Silva"
	valores["email"] = "jose@gmail.com"

	IncluirCadastro(cadastro, valores)

	resultados, err := ListarCadastros(cadastro)

	if err != nil {
		t.Error(fmt.Sprintf("Deveria ter listado os cadastros, mas deu erro: %s", err))
	}

	if resultados == nil {
		t.Error("Por algum motivo, não retornou nada...")
	}

	fmt.Printf("%v\n", resultados)
}

func TestDeletarCadastro(t *testing.T) {
	cadastro := setup()
	defer FecharDatabase()

	valores := map[string]interface{}{
		"nome":  "Rodrigo Caldeira",
		"email": "rodrigocaldeira@gmail.com",
	}

	id, _ := IncluirCadastro(cadastro, valores)

	err := DeletarCadastro(cadastro, id)

	if err != nil {
		t.Error(fmt.Sprintf("Deveria ter excluído o cadastro, mas deu erro: %s", err))
	}
}
