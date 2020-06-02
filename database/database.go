package database

import (
	"github.com/rodrigocaldeira/sistema_facil/estrutura"
)

type Database interface {
	Iniciar() error
	Fechar() error
	Configurar(cadastro *estrutura.Cadastro) error
	Incluir(cadastro *estrutura.Cadastro, valores map[string]interface{}) (int, error)
	Alterar(cadastro *estrutura.Cadastro, id int, valores map[string]interface{}) error
	Buscar(cadastro *estrutura.Cadastro, id int) (map[string]interface{}, error)
	Listar(cadastro *estrutura.Cadastro) ([]Resultado, error)
	Deletar(cadastro *estrutura.Cadastro, id int) error
}

type Resultado struct {
	Id      int
	Valores map[string]interface{}
}
