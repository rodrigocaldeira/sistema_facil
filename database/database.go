package database

import (
	"errors"
	"fmt"
	"os"

	"github.com/HouzuoGuo/tiedot/db"
	"github.com/rodrigocaldeira/sistema_facil/estrutura"
)

var caminhoDB string = "./db"
var myDB *db.DB = nil

func IniciarDatabase() error {
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

func AtualizarCadastro(cadastro *estrutura.Cadastro) error {
	if myDB == nil {
		return errors.New("A base de dados não foi iniciada.")
	}

	if !myDB.ColExists(cadastro.Nome) {
		myDB.Create(cadastro.Nome)
	}

	fmt.Printf("Cadastro %s atualizado\n", cadastro.Nome)

	return nil
}
