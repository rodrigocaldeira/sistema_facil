package database

import (
	"errors"
	"fmt"

	"github.com/HouzuoGuo/tiedot/db"
	"github.com/rodrigocaldeira/sistema_facil/estrutura"
)

var caminhoDB string = "./db"
var myDB *db.DB = nil

func IniciarDatabase() error {
	var err error
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

	myDB.ForceUse(cadastro.Nome)

	fmt.Printf("Cadastro %s atualizado\n", cadastro.Nome)

	return nil
}
