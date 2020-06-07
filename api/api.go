package api

import (
	"encoding/json"
	"fmt"
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

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		log.Println(err)
		http.Error(w, "Erro ao Incluir", http.StatusBadRequest)
		return
	}

	cadastro := server.buscarCadastro(request["__cadastro"].(string))
	if cadastro == nil {
		http.Error(w, "Cadastro desconhecido", http.StatusNotFound)
		return
	}
	valores = request["__valores"].(map[string]interface{})
	log.Printf("%+v", valores)

	id, err := server.Database.Incluir(cadastro, valores)

	if err != nil {
		log.Println(err)
		http.Error(w, "Erro ao Incluir", http.StatusBadRequest)
		return
	}

	w.Write([]byte(strconv.Itoa(id)))
}

func (server *ApiServer) Alterar(w http.ResponseWriter, r *http.Request) {
	var request map[string]interface{}

	err := json.NewDecoder(r.Body).Decode(&request)

	if err != nil {
		log.Println(err)
		http.Error(w, "Erro ao Alterar", http.StatusBadRequest)
		return
	}

	log.Printf("%v", request)

	cadastro := server.buscarCadastro(request["__cadastro"].(string))
	if cadastro == nil {
		http.Error(w, "Cadastro desconhecido", http.StatusNotFound)
		return
	}
	id, err := strconv.Atoi(request["id"].(string))
	valores := request["__valores"].(map[string]interface{})

	err = server.Database.Alterar(cadastro, id, valores)

	if err != nil {
		log.Println(err)
		http.Error(w, "Erro ao alterar", http.StatusBadRequest)
		return
	}
}

func (server *ApiServer) Buscar(w http.ResponseWriter, r *http.Request) {
	var request map[string]interface{}

	err := json.NewDecoder(r.Body).Decode(&request)

	if err != nil {
		log.Println(err)
		http.Error(w, "Erro ao Buscar", http.StatusBadRequest)
		return
	}

	log.Printf("%v", request)

	cadastro := server.buscarCadastro(request["__cadastro"].(string))
	if cadastro == nil {
		http.Error(w, "Cadastro desconhecido", http.StatusNotFound)
		return
	}
	id, err := strconv.Atoi(request["id"].(string))

	if err != nil {
		log.Println(err)
		http.Error(w, "Erro ao Buscar", http.StatusBadRequest)
		return
	}

	valores, err := server.Database.Buscar(cadastro, id)

	if err != nil {
		log.Println(err)
		if err.Error() == fmt.Sprintf("Document `%d` does not exist", id) {
			http.Error(w, "Registro não encontrado", http.StatusNotFound)
		} else {
			http.Error(w, "Erro ao Buscar", http.StatusBadRequest)
		}
		return
	}

	json.NewEncoder(w).Encode(valores)
}

func (server *ApiServer) Deletar(w http.ResponseWriter, r *http.Request) {
	var request map[string]interface{}

	err := json.NewDecoder(r.Body).Decode(&request)

	if err != nil {
		log.Println(err)
		http.Error(w, "Erro ao Deletar", http.StatusBadRequest)
		return
	}

	log.Printf("%v", request)

	cadastro := server.buscarCadastro(request["__cadastro"].(string))
	if cadastro == nil {
		http.Error(w, "Cadastro desconhecido", http.StatusNotFound)
		return
	}
	id, err := strconv.Atoi(request["id"].(string))

	if err != nil {
		log.Println(err)
		http.Error(w, "Erro ao Deletar", http.StatusBadRequest)
		return
	}

	err = server.Database.Deletar(cadastro, id)

	if err != nil {
		log.Println(err)
		http.Error(w, "Erro ao Deletar", http.StatusBadRequest)
		return
	}
}

func (server *ApiServer) Listar(w http.ResponseWriter, r *http.Request) {
	var request map[string]interface{}

	err := json.NewDecoder(r.Body).Decode(&request)

	if err != nil {
		log.Println(err)
		http.Error(w, "Erro ao listar", http.StatusBadRequest)
		return
	}

	log.Printf("%v", request)

	cadastro := server.buscarCadastro(request["__cadastro"].(string))
	if cadastro == nil {
		http.Error(w, "Cadastro desconhecido", http.StatusNotFound)
		return
	}

	resultados, err := server.Database.Listar(cadastro)

	if err != nil {
		log.Println(err)
		http.Error(w, "Erro ao listar", http.StatusBadRequest)
		return
	}

	var response []map[string]interface{}

	for _, resultado := range resultados {
		registro := make(map[string]interface{})
		registro["id"] = strconv.Itoa(resultado.Id)

		for k, v := range resultado.Valores {
			registro[k] = v
		}

		response = append(response, registro)
	}

	json.NewEncoder(w).Encode(response)
}

func (server *ApiServer) buscarCadastro(nome string) *estrutura.Cadastro {
	for _, cadastro := range server.Cadastros {
		if cadastro.Nome == nome {
			return cadastro
		}
	}
	return nil
}

func InitApi(cadastros []*estrutura.Cadastro, db database.Database) {
	server := &ApiServer{Cadastros: cadastros, Database: db}

	http.HandleFunc("/api/cadastros", server.GetCadastros)
	http.HandleFunc("/api/buscar", server.Buscar)
	http.HandleFunc("/api/incluir", server.Incluir)
	http.HandleFunc("/api/alterar", server.Alterar)
	http.HandleFunc("/api/listar", server.Listar)
	http.HandleFunc("/api/deletar", server.Deletar)

	fs := http.FileServer(http.Dir("front"))

	http.Handle("/", http.StripPrefix("/", fs))

	log.Println("Servidor pronto na porta 8080")

	log.Fatal(http.ListenAndServe(":8080", nil))
}
