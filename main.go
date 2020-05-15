package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"github.com/rodrigocaldeira/sistema_facil/estrutura"
	"github.com/rodrigocaldeira/sistema_facil/parser"
	"errors"
	"path"
	"strings"
	"os"
)

func main() {
	cadastros, err := lerCadastros()

	if err != nil {
		log.Panic(err)	
	}

	for _, cadastro := range cadastros {
		fmt.Printf("%v", cadastro)	
	}
}

func lerCadastros() ([]estrutura.Cadastro, error) {
	arquivos, err := ioutil.ReadDir("./cadastros/")

	if err != nil {
		return nil, err
	}

	if len(arquivos) == 0 {
		return nil, errors.New("Não existe nenhum cadastro na pasta cadastros")
	}

	var cadastros []estrutura.Cadastro

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

		cadastro := estrutura.Cadastro{
			Nome: nomeDoCadastro,
			Campos: campos,
		}

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
