package database

import (
	"encoding/json"
	"errors"
	"fmt"
	"os"

	"github.com/HouzuoGuo/tiedot/db"
	"github.com/rodrigocaldeira/sistema_facil/estrutura"
)

type TiedotDatabase struct {
	myDB      *db.DB
	caminhoDB string
}

func NewTiedotDatabase(caminhoDB string) Database {
	return &TiedotDatabase{caminhoDB: caminhoDB}
}

func (d *TiedotDatabase) Iniciar() error {
	if d.caminhoDB == "" {
		d.caminhoDB = "./db"
	}

	var err error

	if _, err = os.Stat(d.caminhoDB); os.IsNotExist(err) {
		os.Mkdir(d.caminhoDB, 0755)
	}

	d.myDB, err = db.OpenDB(d.caminhoDB)

	return err
}

func (d *TiedotDatabase) Fechar() error {
	err := d.myDB.Close()
	return err
}

func (d *TiedotDatabase) Configurar(cadastro *estrutura.Cadastro) error {
	if d.myDB == nil {
		return errors.New("A base de dados não foi iniciada.")
	}

	if !d.myDB.ColExists(cadastro.Nome) {
		d.myDB.Create(cadastro.Nome)
	}

	fmt.Printf("Cadastro %s configurado com sucesso\n", cadastro.Nome)

	return nil
}

func (d *TiedotDatabase) Incluir(cadastro *estrutura.Cadastro, valores map[string]interface{}) (int, error) {
	collection := d.myDB.Use(cadastro.Nome)

	id, err := collection.Insert(valores)

	if err == nil {
		fmt.Printf("Valores incluídos com sucesso em %s. id: %d\n", cadastro.Nome, id)
	}

	return id, err
}

func (d *TiedotDatabase) Alterar(cadastro *estrutura.Cadastro, id int, valores map[string]interface{}) error {
	collection := d.myDB.Use(cadastro.Nome)

	err := collection.Update(id, valores)

	if err == nil {
		fmt.Printf("Valores alterados com sucesso em %s\n", cadastro.Nome)
	}

	return err
}

func (d *TiedotDatabase) Buscar(cadastro *estrutura.Cadastro, id int) (map[string]interface{}, error) {
	collection := d.myDB.Use(cadastro.Nome)

	valores, err := collection.Read(id)

	if err != nil {
		return nil, err
	}

	return valores, nil
}

func (d *TiedotDatabase) Listar(cadastro *estrutura.Cadastro) ([]Resultado, error) {
	collection := d.myDB.Use(cadastro.Nome)

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

func (d *TiedotDatabase) Deletar(cadastro *estrutura.Cadastro, id int) error {
	collection := d.myDB.Use(cadastro.Nome)

	err := collection.Delete(id)

	if err == nil {
		fmt.Printf("Cadastro excluído de %s com sucesso. id: %d\n", cadastro.Nome, id)
	}

	return err
}
