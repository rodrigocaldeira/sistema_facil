package api

import (
	"encoding/json"
	"github.com/rodrigocaldeira/sistema_facil/estrutura"
	"log"
	"net/http"
)

func InitApi(cadastros []*estrutura.Cadastro) {
	apiCadastros := func(w http.ResponseWriter, _ *http.Request) {
		json.NewEncoder(w).Encode(cadastros)
	}

	http.HandleFunc("/api/cadastros", apiCadastros)

	log.Println("Servidor pronto na porta 8080")

	log.Fatal(http.ListenAndServe(":8080", nil))
}
