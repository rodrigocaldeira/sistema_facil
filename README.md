# SISTEMA FÁCIL

Criador de CRUD baseado em arquivos TXT.

### Objetivos
- Reimplementar um projeto que iniciei em 2009, feito em PHP
- Criar um único executável capaz de subir tanto o backend como o frontend
- Ter um banco de dados integrado
- Criar todo o processo de CRUD baseado na interpretação de arquivos TXT (sem querer criar uma linguagem de programação pra isso)
- Estudar React

### Executando localmente
Para subir o backend:
```$ go run main.go```

Para subir o frontend:
```$ cd front/sistema-facil && npm start```

### Conceitos
Boa parte dos sistemas têm, em sua essência, processos chamados CRUD (Create, Read, Update, Delete), que são processos básicos para a leitura e escrita de registros em um banco de dados.

Desenvolver esta parte em um sistema toma muito tempo desnecessário, pois é preciso dedicar tempo criando rotinas que não estão diretamente envolvidas com regras de negócio para qual o sistema está sendo desenvolvido.

Com isso, automatizar este processo pode salvar boas horas de desenvolvimento.

Além disso, boa parte das pessoas que precisam de um sistema não precisam de muito mais do que um CRUD. Então ter algo já quase pronto pode ajudar.

Para tanto, ainda é preciso definir quais são os cadastros e campos envolvidos no CRUD. Então, a ideia do Sistema Fácil é oferecer uma maneira fácil e rápida de criar um esqueleto de um sistema capaz de ter todo o CRUD já pronto.

### Criando os cadastros
Uma das pastas dentro do Sistema Fácil é a 'cadastros' que contém todas as definições das entidades dentro do sistema.

O Sistema Fácil lê o conteúdo desta pasta no início de sua execução e, para cada arquivo TXT que encontrar lá dentro, cria no banco de dados interno uma estrutura capaz de receber e consultar as informações.

Este é um exemplo básico da definição de um cadastro:

Arquivo Clientes.txt

```
Campos
	Nome, Texto
	Email, Texto
Lista
	Nome, Email
```

### Estrutura de um cadastro
Um cadastro é divido em seções e detalhes de seções. Cada seção indica uma ação que o Sistema Fácil realizará para cada detalhe subsequente, onde cada detalhe é uma nova linha identada por uma tabulação.

#### Seção "Campos"
Esta seção indica quais são os campos que farão parte do cadastro. Cada nova linha após esta seção indica um campo que fará parte do cadastro, separado da seguinte forma:

```<Tab><Nome do Campo>, <Tipo do Campo>```

onde

`<Tab>` é uma tabulação

`<Nome do Campo>` é o nome do campo

`,` separa o nome do campo do tipo do campo

`<Tipo do Campo>` é o tipo do campo, que pode ser Texto, Número, etc.


Obs.: atualmente o único tipo de campo disponível é 'Texto'.

#### Seção "Lista"
Esta seção indica quais são os campos que aparecerão na tela de listagem de um determinado cadastro. Desta forma, para cadastros com muitos campos é possível informar quais são os campos essenciais para conseguir identificar um registro na tela de listagem. Cada nova linha após esta seção indica quais campos aparecerão na listagem e está separado da seguinte forma:

```<Tab><Nome do Campo>,...<Nome do campo>```

onde

`<Tab>` é uma tabulação

`<Nome do Campo>` é o nome do campo que aparecerá na listagem

`,` separa os campos, criando assim a lista

`...<Nome do campo>` indica que mais campos podem formar a lista

Desta forma, podemos definir o seguinte:

```
Campos
	Nome, Texto
	Email, Texto
	Telefone, Texto
	Endereço, Texto
Lista
	Nome, Email, Telefone
```

isto gerará na tela de listagem uma tabela com este conteúdo:

| Nome | Email | Telefone |
|------|-------|----------|
| Caldeira | rodrigocaldeira@gmail.com | 999999999 |

porém nas telas de inclusão e edição dos registros, todos os campos serão exibidos.

### Todos
- [x] Criação do backend com as operações básicas
- [x] Criação do frontend com as operações básicas
- [ ] Criação dos tipos de campos
  - [x] Texto
  - [x] Email
  - [x] Telefone
  - [x] Número Inteiro
  - [x] Número Decimal (separador de decimal é ponto por enquanto)
  - [ ] ~~Moeda~~ Dinhero
  - [ ] CPF
  - [ ] CNPJ
  - [ ] Checkbox
  - [ ] Lista com única seleção
  - [ ] Lista com múltipla seleção
  - [ ] Lista de outro Cadastro existente
  - [ ] Senha
  - [ ] Data
  - [ ] Data e Hora
- [x] Possibilidade de campos opcionais 
- [x] Modal com confirmação de exclusão de um cadastro (exclusões são, no momento, Hard Delete)
- [x] Toasts com confirmação de ações executadas (inclusão e edição de um cadastro)
- [ ] Regras de workflow
  - [ ] Atualizar um determinado campo do próprio cadastro quando um evento ocorrer
  - [ ] Atualizar um determinado campo de outro cadastro quando um evento ocorrer
  - [ ] Incluir um novo registro em um determinado cadastro quando um evento ocorrer
  - [ ] Deletar um registro de um determinado cadastro quando um evento ocorrer
- [ ] Extração de dados
  - [ ] CSV
  - [ ] JSON
- [ ] Extração de relatórios
- [ ] Possibilitar autenticação
- [ ] Realizar Backup e Restore do banco de dados


#### Componentes usados
- Banco de dados: [Tiedot](https://github.com/HouzuoGuo/tiedot), um banco de dados NoSQL desenvolvido inteiramente em Go
- Frontend: [ReactJS](https://pt-br.reactjs.org/)
