package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"github.com/rodrigocaldeira/sistema_facil/estrutura"
)

func main() {
	files, err := ioutil.ReadDir("./cadastros/")

	if err != nil {
		log.Panic(err)
	}

	for _, file := range files {
		fmt.Println(file.Name())
	}

	campo := estrutura.Campo{Nome: "Teste", Tipo: "Texto"}

	fmt.Printf("%v\n", campo)
}
