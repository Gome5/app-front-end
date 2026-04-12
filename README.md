# Controle de Gastos - Frontend

Aplicação web simples para gerenciamento de receitas e despesas, integrada com uma API backend.

---

## Sobre o projeto

Este projeto é uma interface web que permite ao usuário:

* Adicionar receitas e despesas
* Visualizar todas as movimentações
* Filtrar por tipo (todas, receitas ou despesas)
* Buscar por descrição
* Excluir itens
* Visualizar resumo financeiro (receitas, despesas e saldo)

---

## Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript
* Fetch API (requisições HTTP)

---

## Como executar

### 1. Clonar ou baixar o projeto

```bash
git clone https://github.com/Gome5/app-front-end.git
```

---

### 2. Abrir o projeto

Basta abrir o arquivo:

```
index.html
```

no navegador.

---

## Integração com backend

O frontend consome uma API rodando em:

```
http://localhost:5000
```

### Endpoints utilizados:

#### Receitas

* GET /receita → lista receitas
* POST /receita → adiciona receita
* DELETE /receita?id= → remove receita

#### Despesas

* GET /despesas → lista despesas
* POST /despesa → adiciona despesa
* DELETE /despesa?id= → remove despesa

Certifique-se de que o backend está rodando antes de usar o sistema.

---

## Funcionalidades

### Cadastro

* Adicionar receitas e despesas com:

  * descrição
  * valor
  * data

### Resumo financeiro

* Total de receitas
* Total de despesas
* Saldo (receitas - despesas)

### Filtro por tipo

* Todas
* Apenas receitas
* Apenas despesas

### Busca

* Filtra itens pelo campo descrição em tempo real

### Exclusão

* Remove itens diretamente da lista

---

## Observações importantes

* A API deve estar ativa para o sistema funcionar
* O IP da API está fixo no `scripts.js`
* Caso o backend rode em outro endereço, atualize as URLs no código

---

## Autor

Gabriel Gomes
