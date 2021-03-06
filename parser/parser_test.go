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

var arquivoComCampoOpcional = `
Campos
	Nome, Texto, Opcional
`

var arquivoComCampoLista = `
Campos
	Campo Lista, Lista, Opções Opção 1; Opção 2 
`

var arquivoComCampoListaMasSemOpcoes = `
Campos
	Campo Lista, Lista
`

var arquivoComCampoListaMasSemAsOpcoesDefinidas = `
Campos
	Campo Lista, Lista, Opções
`

var arquivoComTagDeListaMasSemLista string = `
Lista
`

var arquivoComListaComUmCampo string = `
Lista
	Nome
`

var arquivoComCampoListaDeMultiOpcoes string = ` 
Campos
	Campo Lista, Lista, Opções Opção 1; Opção 2, Multi opções
`

var arquivoComCampoDeOutroCadastro string = `
Campos
	Usuário, Cadastro, Exibir campo "Nome" do "Usuário"
`

var arquivoComCampoDeOutroCadastroComNomesComplexos string = `
Campos
	Usuário, Cadastro, Exibir campo "Nome de Teste" do "Usuário de nome Complexo"
`

var arquivoComCampoDeOutroCadastroSemInformarOCadastro string = `
Campos
	Usuário, Cadastro, Exibir campo "Nome"
`

var arquivoComCampoDeOutroCadastroMalFormatado string = `
Campos
	Usuário, Cadastro
`

func TestArquivoComCampoDeOutroCadastroMalFormatado(t *testing.T) {
	_, err := LerCampos(arquivoComCampoDeOutroCadastroMalFormatado)

	if err == nil {
		t.Fatal("Deveria ter dado erro aqui")
	}

	if err.Error() != "Não foi possível achar a referência para o campo Usuário" {
		t.Fatal(fmt.Sprintf("Deveria ter dado erro referência, mas veio isso: %v", err))
	}
}

func TestArquivoComCampoDeOutroCadastroSemInformarOCadastro(t *testing.T) {
	_, err := LerCampos(arquivoComCampoDeOutroCadastroSemInformarOCadastro)

	if err == nil {
		t.Fatal("Deveria ter dado erro aqui")
	}

	if err.Error() != "Não foi possível achar a referência para o campo Usuário" {
		t.Fatal(fmt.Sprintf("Deveria ter dado erro referência, mas veio isso: %v", err))
	}
}

func TestArquivoComCampoDeOutroCadastroComNomesComplexos(t *testing.T) {
	campos, err := LerCampos(arquivoComCampoDeOutroCadastroComNomesComplexos)

	if err != nil {
		t.Fatal(err)
	}

	campo := campos[0]

	if campo.CadastroReferencia.Nome != "Usuário de nome Complexo" {
		t.Fatal(fmt.Sprintf("O nome da referência está errado. Veio isso: %s", campo.CadastroReferencia.Nome))
	}

	if campo.CadastroReferencia.ExibirCampo != "Nome de Teste" {
		t.Fatal(fmt.Sprintf("O nome do campo está errado. Veio isso: %s", campo.CadastroReferencia.ExibirCampo))
	}
}

func TestArquivoComCampoDeOutroCadastro(t *testing.T) {
	campos, err := LerCampos(arquivoComCampoDeOutroCadastro)

	if err != nil {
		t.Fatal(err)
	}

	campo := campos[0]

	if campo.Tipo != "Cadastro" {
		t.Fatal(fmt.Sprintf("O campo deveria ser do tipo Cadastro, mas veio isso: %s", campo.Tipo))
	}

	if campo.CadastroReferencia == nil {
		t.Fatal("Deveria ter a definição do cadastro de referência")
	}

	if campo.CadastroReferencia.Nome != "Usuário" {
		t.Fatal(fmt.Sprintf("Deveria ter a referência do cadastro Usuário, mas veio isso: %s", campo.CadastroReferencia.Nome))
	}

	if campo.CadastroReferencia.ExibirCampo != "Nome" {
		t.Fatal(fmt.Sprintf("Deveria ter a referência do campo Nome do cadastro Usuário, mas veio isso: %s", campo.CadastroReferencia.ExibirCampo))
	}
}

func TestArquivoComCampoListaDeMultiOpcoes(t *testing.T) {
	campos, err := LerCampos(arquivoComCampoListaDeMultiOpcoes)

	if err != nil {
		t.Fatal(err)
	}

	campo := campos[0]

	if !campo.MultiOpcoes {
		t.Fatal("O campo deveria ser de multi opções")
	}
}

func TestArquivoComCampoLista(t *testing.T) {
	campos, err := LerCampos(arquivoComCampoLista)

	if err != nil {
		t.Fatal(err)
	}

	campo := campos[0]

	if len(campo.Opcoes) != 2 {
		t.Fatal("O campo deveria ter opções!")
	}

	if campo.Opcoes[0] != "Opção 1" && campo.Opcoes[1] != "Opção 2" {
		t.Fatal(fmt.Sprintf("O campo deveria ter opções, mas sei lá o que aconteceu: %v", campo))
	}
}

func TestArquivoComCampoListaMasSemOpcoes(t *testing.T) {
	_, err := LerCampos(arquivoComCampoListaMasSemOpcoes)

	if err == nil {
		t.Fatal("Deveria ter dado erro aqui! Campo lista sem opções!")
	}

	if err.Error() != "O campo Campo Lista deve ter opções" {
		t.Fatal(fmt.Sprintf("Deveria ter dado erro de campo lista sem opções, mas deu outro erro: %s", err))
	}
}

func TestArquivoComCampoListaMasSemAsOpcoesDefinidas(t *testing.T) {
	_, err := LerCampos(arquivoComCampoListaMasSemAsOpcoesDefinidas)

	if err == nil {
		t.Fatal("Deveria ter dado erro aqui! Campo lista sem opções!")
	}

	if err.Error() != "O campo Campo Lista deve ter opções" {
		t.Fatal(fmt.Sprintf("Deveria ter dado erro de campo lista sem opções, mas deu outro erro: %s", err))
	}
}

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

func TestArquivoComCampoOpcional(t *testing.T) {
	campos, err := LerCampos(arquivoComCampoOpcional)

	if err != nil {
		t.Fatal(err)
	}

	if !campos[0].Opcional {
		t.Error("O campo deveria ser opcional")
	}
}
