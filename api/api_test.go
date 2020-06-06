package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/rodrigocaldeira/sistema_facil/database"
	"github.com/rodrigocaldeira/sistema_facil/estrutura"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"strconv"
	"testing"
)

func criarCadastros() []*estrutura.Cadastro {
	var cadastros []*estrutura.Cadastro

	campoNome, _ := estrutura.NewCampo("Nome", "Texto")

	var campos []*estrutura.Campo = []*estrutura.Campo{campoNome}

	cadastros = append(cadastros, estrutura.NewCadastro("Usuário", campos))

	return cadastros
}

var testDB database.Database

func criarDatabase() {
	caminhoDB, _ := ioutil.TempDir("", "teste_api_sistema_facil")
	testDB = database.NewTiedotDatabase(caminhoDB)
	testDB.Iniciar()
}

func criarServer() *ApiServer {
	criarDatabase()
	cadastros := criarCadastros()
	testDB.Configurar(cadastros[0])
	server := &ApiServer{Cadastros: cadastros, Database: testDB}
	return server
}

func TestGetCadastros(t *testing.T) {
	server := criarServer()
	defer testDB.Fechar()

	var cadastros []*estrutura.Cadastro

	ts := httptest.NewServer(http.HandlerFunc(server.GetCadastros))

	defer ts.Close()

	res, err := http.Get(ts.URL)
	if err != nil {
		t.Fatal(err)
	}

	defer res.Body.Close()

	err = json.NewDecoder(res.Body).Decode(&cadastros)
	if err != nil {
		t.Fatal(err)
	}

	if cadastros[0].Nome != "Usuário" {
		t.Error(fmt.Sprintf("Deveria ter retornado o nome do cadastro como Usuário, mas veio isso: %s", cadastros[0].Nome))
	}

	campoNome := cadastros[0].Campos[0]

	if campoNome.Nome != "Nome" && campoNome.Tipo != "Texto" {
		t.Error(fmt.Sprintf("Algo muito errado deu no campo do cadastro. Recebi isso: %v", campoNome))
	}
}

func TestIncluirCadastro(t *testing.T) {
	server := criarServer()
	defer testDB.Fechar()

	cadastro := criarCadastros()[0]

	request, _ := json.Marshal(
		map[string]interface{}{
			"__cadastro": "Usuário",
			"__valores": map[string]interface{}{
				"nome":  "Rodrigo Caldeira",
				"email": "rodrigocaldeira@gmail.com",
			},
		},
	)

	ts := httptest.NewServer(http.HandlerFunc(server.Incluir))
	defer ts.Close()

	res, err := http.Post(ts.URL, "application/json", bytes.NewBuffer(request))

	if err != nil {
		t.Error(err)
	}

	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)

	if err != nil {
		t.Error(err)
	}

	id, err := strconv.Atoi(string(body))

	if err != nil {
		t.Error(err)
	}

	usuario, err := testDB.Buscar(cadastro, id)

	if err != nil {
		t.Error(err)
	}

	if usuario["nome"] != "Rodrigo Caldeira" && usuario["email"] != "rodrigocaldeira@gmail.com" {
		t.Error(fmt.Sprintf("Deu um erro na inclusão do usuário, e salvou isso: %v", usuario))
	}
}
