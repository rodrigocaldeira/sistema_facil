package database

import (
	"fmt"
	"github.com/rodrigocaldeira/sistema_facil/estrutura"
	"io/ioutil"
	"testing"
)

func criarCadastro() *estrutura.Cadastro {
	campoNome, _ := estrutura.NewCampo("Nome", "Texto")
	campoEmail, _ := estrutura.NewCampo("Email", "Texto")

	var campos []*estrutura.Campo = []*estrutura.Campo{campoNome, campoEmail}

	return estrutura.NewCadastro("Usuário", campos)
}

var testDB Database

func criarDatabase() {
	caminhoDB, _ := ioutil.TempDir("", "teste_db_sistema_facil")
	testDB = NewTiedotDatabase(caminhoDB)
	testDB.Iniciar()
}

func setup() *estrutura.Cadastro {
	criarDatabase()
	cadastro := criarCadastro()
	testDB.Configurar(cadastro)
	return cadastro
}

func TestIncluirCadastro(t *testing.T) {
	cadastro := setup()
	defer testDB.Fechar()

	valores := map[string]interface{}{
		"nome":  "Rodrigo Caldeira",
		"email": "rodrigocaldeira@gmail.com",
	}

	id, err := testDB.Incluir(cadastro, valores)

	if err != nil {
		t.Error(fmt.Sprintf("Deveria ter incluído o cadastro, mas deu erro: %s", err))
	}

	if id == 0 {
		t.Error("Esperava um id válido!")
	}
}

func TestAtualizarCadastro(t *testing.T) {
	cadastro := setup()
	defer testDB.Fechar()

	valores := map[string]interface{}{
		"nome":  "Rodrigo Caldeira",
		"email": "rodrigocaldeira@gmail.com",
	}

	id, _ := testDB.Incluir(cadastro, valores)

	valores["nome"] = "Rodrigo Caldeira de Paula Lima"

	err := testDB.Alterar(cadastro, id, valores)

	if err != nil {
		t.Error(fmt.Sprintf("Deveria ter atualizado o cadastro, mas deu erro: %s", err))
	}
}

func TestBuscarUmCadastro(t *testing.T) {
	cadastro := setup()
	defer testDB.Fechar()

	valores := map[string]interface{}{
		"nome":  "Rodrigo Caldeira",
		"email": "rodrigocaldeira@gmail.com",
	}

	id, _ := testDB.Incluir(cadastro, valores)

	valoresSalvos, err := testDB.Buscar(cadastro, id)

	if err != nil {
		t.Error(fmt.Sprintf("Deveria ter retornado os valores do cadastro, mas deu erro: %s", err))
	}

	if valoresSalvos["nome"] != valores["nome"] && valoresSalvos["email"] != valores["email"] {
		t.Error(fmt.Sprintf("Sei lá o que veio: %v", valoresSalvos))
	}
}

func TestListarCadastros(t *testing.T) {
	cadastro := setup()
	defer testDB.Fechar()

	valores := map[string]interface{}{
		"nome":  "Rodrigo Caldeira",
		"email": "rodrigocaldeira@gmail.com",
	}

	testDB.Incluir(cadastro, valores)

	valores["nome"] = "José da Silva"
	valores["email"] = "jose@gmail.com"

	testDB.Incluir(cadastro, valores)

	resultados, err := testDB.Listar(cadastro)

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
	defer testDB.Fechar()

	valores := map[string]interface{}{
		"nome":  "Rodrigo Caldeira",
		"email": "rodrigocaldeira@gmail.com",
	}

	id, _ := testDB.Incluir(cadastro, valores)

	err := testDB.Deletar(cadastro, id)

	if err != nil {
		t.Error(fmt.Sprintf("Deveria ter excluído o cadastro, mas deu erro: %s", err))
	}
}
