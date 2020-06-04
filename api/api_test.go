package api

import (
	"encoding/json"
	"fmt"
	"github.com/rodrigocaldeira/sistema_facil/estrutura"
	"net/http"
	"net/http/httptest"
	"testing"
)

func criarCadastros() []*estrutura.Cadastro {
	var cadastros []*estrutura.Cadastro

	campoNome, _ := estrutura.NewCampo("Nome", "Texto")

	var campos []*estrutura.Campo = []*estrutura.Campo{campoNome}

	cadastros = append(cadastros, estrutura.NewCadastro("Usuário", campos))

	return cadastros
}

func TestGetCadastros(t *testing.T) {
	server := &ApiServer{Cadastros: criarCadastros()}
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
