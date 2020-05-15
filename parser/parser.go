package parser

import(
	"github.com/rodrigocaldeira/sistema_facil/estrutura"
	"strings"
)

func LerCampos(conteudoDoArquivo string) ([]*estrutura.Campo, error) {
	
	linhas := strings.Split(conteudoDoArquivo, "\n")

	achouOsCampos := false

	var campos []*estrutura.Campo

	for _, linha := range linhas {
		if strings.Trim(linha, "\r") == "Campos" {
			achouOsCampos = true
			continue
		}

		if strings.HasPrefix(linha, "\t") {
			if achouOsCampos {
				campos = append(campos, lerCampo(linha))
			}
		} else {
			if achouOsCampos {
				break;
			}
		}
	}

	return campos, nil
}

func lerCampo(linha string) *estrutura.Campo {

	linha = strings.Trim(linha, "\t")

	definicaoDoCampo := strings.Split(linha, ",")

	return &estrutura.Campo{
		Nome: definicaoDoCampo[0],
		Tipo: definicaoDoCampo[1],
	}
	
}

