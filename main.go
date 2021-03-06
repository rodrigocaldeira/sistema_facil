package main

import (
	"errors"
	"github.com/rodrigocaldeira/sistema_facil/api"
	"github.com/rodrigocaldeira/sistema_facil/database"
	"github.com/rodrigocaldeira/sistema_facil/estrutura"
	"github.com/rodrigocaldeira/sistema_facil/parser"
	"io/ioutil"
	"log"
	"os"
	"path"
	"strings"
)

func main() {
	cadastros, err := lerCadastros()
	db := iniciarDatabase(cadastros)
	defer db.Fechar()

	if err != nil {
		log.Panic(err)
	}

	api.InitApi(cadastros, db)
}

func iniciarDatabase(cadastros []*estrutura.Cadastro) database.Database {
	db := database.NewTiedotDatabase("./db")
	db.Iniciar()

	for _, cadastro := range cadastros {
		err := db.Configurar(cadastro)

		if err != nil {
			panic(err)
		}
	}

	return db
}

func lerCadastros() ([]*estrutura.Cadastro, error) {
	arquivos, err := ioutil.ReadDir("./cadastros/")

	if err != nil {
		return nil, err
	}

	if len(arquivos) == 0 {
		return nil, errors.New("Não existe nenhum cadastro na pasta cadastros")
	}

	var cadastros []*estrutura.Cadastro

	for _, arquivo := range arquivos {
		nomeDoArquivo := arquivo.Name()
		nomeDoCadastro := strings.TrimSuffix(nomeDoArquivo, path.Ext(nomeDoArquivo))

		conteudoDoArquivo, err := lerArquivo("./cadastros/" + nomeDoArquivo)

		if err != nil {
			return nil, err
		}

		campos, err := parser.LerCampos(conteudoDoArquivo)
		if err != nil {
			return nil, err
		}

		camposNaLista, err := parser.LerLista(conteudoDoArquivo)
		if err != nil {
			return nil, err
		}

		cadastro := estrutura.NewCadastro(nomeDoCadastro, campos)
		cadastro.AtribuirLista(camposNaLista)

		cadastros = append(cadastros, cadastro)
	}

	return cadastros, nil
}

func lerArquivo(caminhoDoArquivo string) (string, error) {
	ponteiroDoArquivo, err := os.Open(caminhoDoArquivo)

	if err != nil {
		return "", err
	}

	defer ponteiroDoArquivo.Close()

	bytesDoArquivo, err := ioutil.ReadAll(ponteiroDoArquivo)

	if err != nil {
		return "", err
	}

	conteudoDoArquivo := string(bytesDoArquivo)

	return conteudoDoArquivo, nil
}
