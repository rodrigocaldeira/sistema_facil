package parser

import (
	"fmt"
	"testing"
)

var arquivoValido string = `
Campos
	Nome, Texto
	Email, Texto
`

var arquivoVazio string = ``

var arquivoSemCampos string = `
Um arquivo sem campos...
`

var arquivoComTagDeCamposMasSemCampos string = `
Campos
`

var arquivoComCampoSemTipo string = `
Campos
	Nome
`

var arquivoComCampoSemTipoMasComAVirgula string = `
Campos
	Nome, 
`

var arquivoComCampoComTipoInvalido string = `
Campos
	Nome, Tipo que não existe...
`

var arquivoComLista string = `
Lista
	Nome, Email
`

var arquivoComTagDeListaMasSemLista string = `
Lista
`

var arquivoComListaComUmCampo string = `
Lista
	Nome
`

func TestLerLista(t *testing.T) {
	lista, err := LerLista(arquivoComLista)

	if err != nil {
		t.Fatal(err)
	}

	for _, campo := range lista {
		if campo != "Nome" && campo != "Email" {
			t.Fatal(fmt.Sprintf("Campo na lista inválido! Achei esse aqui: %s", campo))
		}
	}
}

func TestArquivoComTagDeListaMasSemLista(t *testing.T) {
	_, err := LerLista(arquivoComTagDeListaMasSemLista)

	if err == nil {
		t.Fatal("Deveria ter dado erro de arquivo sem lista definida")
	}

	if err.Error() != "Arquivo sem lista definida" {
		t.Error(fmt.Sprintf("Deveria ter identificado que a lista não está definida, mas deu outro erro: %s", err))
	}
}

func TestArquivoComListaComUmCampo(t *testing.T) {
	_, err := LerLista(arquivoComListaComUmCampo)

	if err != nil {
		t.Fatal(err)
	}
}

func TestLerCampos(t *testing.T) {
	_, err := LerCampos(arquivoValido)

	if err != nil {
		t.Fatal(err)
	}
}

func TestArquivoVazio(t *testing.T) {
	_, err := LerCampos(arquivoVazio)

	if err == nil {
		t.Fatal("Deveria ter dado erro com arquivo vazio...")
	}

	if err.Error() != "O arquivo está vazio" {
		t.Error(fmt.Sprintf("Deveria ter identificado que o arquivo está vazio, mas deu outro erro: %s", err))
	}
}

func TestArquivoSemCampos(t *testing.T) {
	_, err := LerCampos(arquivoSemCampos)

	if err == nil {
		t.Fatal("Deveria ter dado erro com arquivo sem campos...")
	}

	if err.Error() != "O arquivo não tem campos definidos" {
		t.Error(fmt.Sprintf("Deveria ter identificado que arquivo não tem campos, mas deu outro erro: %s", err))
	}
}

func TestArquivoComTagDeCamposMasSemCampos(t *testing.T) {
	_, err := LerCampos(arquivoComTagDeCamposMasSemCampos)

	if err == nil {
		t.Fatal("Deveria ter dado erro de arquivo com tag de campos mas sem campos...")
	}

	if err.Error() != "O arquivo não tem campos definidos" {
		t.Error(fmt.Sprintf("Deveria ter identificado que arquivo não tempo campos, mas deu outro erro: %s", err))
	}
}

func TestArquivoComCampoSemTipoMasComVirgula(t *testing.T) {
	_, err := LerCampos(arquivoComCampoSemTipo)

	if err == nil {
		t.Fatal("Deveria ter dado erro de arquivo com campo mal formatado")
	}

	if err.Error() != "Arquivo com campo mal formatado" {
		t.Error(fmt.Sprintf("Deveria ter dado erro de campo mal formatado, mas deu outro erro: %s", err))
	}
}

func TestArquivoComCampoSemTipo(t *testing.T) {
	_, err := LerCampos(arquivoComCampoSemTipoMasComAVirgula)

	if err == nil {
		t.Fatal("Deveria ter dado erro de arquivo com campo mal formatado")
	}

	if err.Error() != "Arquivo com campo mal formatado" {
		t.Error(fmt.Sprintf("Deveria ter dado erro de campo mal formatado, mas deu outro erro: %s", err))
	}
}

func TestArquivoComCampoComTipoInvalido(t *testing.T) {
	_, err := LerCampos(arquivoComCampoComTipoInvalido)

	if err == nil {
		t.Fatal("Deveria ter dado erro de arquivo com campo com tipo inválido")
	}

	if err.Error() != "Tipo inválido" {
		t.Error(fmt.Sprintf("Deveria ter dado erro de campo com tipo inválido, mas deu outro erro: %s", err))
	}
}
