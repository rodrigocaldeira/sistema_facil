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
