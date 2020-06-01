package database

import (
	"encoding/json"
	"errors"
	"fmt"
	"os"

	"github.com/HouzuoGuo/tiedot/db"
	"github.com/rodrigocaldeira/sistema_facil/estrutura"
)

var myDB *db.DB = nil

func IniciarDatabase(caminhoDB string) error {
	if caminhoDB == "" {
		caminhoDB = "./db"
	}

	var err error

	if _, err = os.Stat(caminhoDB); os.IsNotExist(err) {
		os.Mkdir(caminhoDB, 0755)
	}

	myDB, err = db.OpenDB(caminhoDB)
	return err
}

func FecharDatabase() error {
	err := myDB.Close()
	return err
}

func ConfigurarCadastro(cadastro *estrutura.Cadastro) error {
	if myDB == nil {
		return errors.New("A base de dados não foi iniciada.")
	}

	if !myDB.ColExists(cadastro.Nome) {
		myDB.Create(cadastro.Nome)
	}

	fmt.Printf("Cadastro %s configurado com sucesso\n", cadastro.Nome)

	return nil
}

func IncluirCadastro(cadastro estrutura.Cadastro, valores map[string]interface{}) (int, error) {
	collection := myDB.Use(cadastro.Nome)

	id, err := collection.Insert(valores)

	if err == nil {
		fmt.Printf("Valores incluídos com sucesso em %s. id: %d\n", cadastro.Nome, id)
	}

	return id, err
}

func AlterarCadastro(cadastro estrutura.Cadastro, id int, valores map[string]interface{}) error {
	collection := myDB.Use(cadastro.Nome)

	err := collection.Update(id, valores)

	if err == nil {
		fmt.Printf("Valores alterados com sucesso em %s\n", cadastro.Nome)
	}

	return err
}

func BuscarCadastro(cadastro estrutura.Cadastro, id int) (map[string]interface{}, error) {
	collection := myDB.Use(cadastro.Nome)

	valores, err := collection.Read(id)

	if err != nil {
		return nil, err
	}

	return valores, nil
}

type Resultado struct {
	Id      int
	Valores map[string]interface{}
}

func ListarCadastros(cadastro estrutura.Cadastro) ([]Resultado, error) {
	collection := myDB.Use(cadastro.Nome)

	var resultados []Resultado

	collection.ForEachDoc(func(id int, docContent []byte) bool {
		var doc map[string]interface{}
		if err := json.Unmarshal(docContent, &doc); err != nil {
			fmt.Printf("Erro ao buscar o cadastro: %v\n", err)
		}

		resultados = append(resultados, Resultado{
			Id:      id,
			Valores: doc,
		})

		return true
	})

	return resultados, nil
}

func DeletarCadastro(cadastro estrutura.Cadastro, id int) error {
	collection := myDB.Use(cadastro.Nome)

	err := collection.Delete(id)

	if err == nil {
		fmt.Printf("Cadastro excluído de %s com sucesso. id: %d\n", cadastro.Nome, id)
	}

	return err
}
