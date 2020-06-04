package api

import (
	"encoding/json"
	"github.com/rodrigocaldeira/sistema_facil/estrutura"
	"log"
	"net/http"
)

type ApiServer struct {
	Cadastros []*estrutura.Cadastro
}

func (server *ApiServer) GetCadastros(w http.ResponseWriter, _ *http.Request) {
	json.NewEncoder(w).Encode(server.Cadastros)
}

func InitApi(cadastros []*estrutura.Cadastro) {
	server := &ApiServer{Cadastros: cadastros}

	http.HandleFunc("/api/cadastros", server.GetCadastros)

	log.Println("Servidor pronto na porta 8080")

	log.Fatal(http.ListenAndServe(":8080", nil))
}
