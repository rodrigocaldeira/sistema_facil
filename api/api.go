package api

import (
	"encoding/json"
	"github.com/rodrigocaldeira/sistema_facil/database"
	"github.com/rodrigocaldeira/sistema_facil/estrutura"
	"log"
	"net/http"
	"strconv"
)

type ApiServer struct {
	Cadastros []*estrutura.Cadastro
	Database  database.Database
}

func (server *ApiServer) GetCadastros(w http.ResponseWriter, _ *http.Request) {
	json.NewEncoder(w).Encode(server.Cadastros)
}

func (server *ApiServer) Incluir(w http.ResponseWriter, r *http.Request) {
	var request map[string]interface{}
	var valores map[string]interface{}

	var cadastro *estrutura.Cadastro
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		log.Println(err)
		http.Error(w, "Erro ao Incluir", http.StatusBadRequest)
		return
	}

	valores = request["__valores"].(map[string]interface{})
	log.Printf("%+v", valores)

	for _, c := range server.Cadastros {
		if c.Nome == request["__cadastro"] {
			cadastro = c
			break
		}
	}

	id, err := server.Database.Incluir(cadastro, valores)

	if err != nil {
		log.Println(err)
		http.Error(w, "Erro ao Incluir", http.StatusBadRequest)
		return
	}

	w.Write([]byte(strconv.Itoa(id)))
}

func InitApi(cadastros []*estrutura.Cadastro, db database.Database) {
	server := &ApiServer{Cadastros: cadastros, Database: db}

	http.HandleFunc("/api/cadastros", server.GetCadastros)

	log.Println("Servidor pronto na porta 8080")

	log.Fatal(http.ListenAndServe(":8080", nil))
}
