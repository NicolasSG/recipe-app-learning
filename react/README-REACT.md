# 🍽️ App de Receitas — React + Vite + MUI

## Visão Geral

Você vai construir um aplicativo de receitas que consome a [TheMealDB](https://www.themealdb.com), uma API pública e gratuita.  
O app permitirá pesquisar receitas por nome, filtrar por categorias, visualizar detalhes e — se quiser — marcar favoritos.

**Tecnologias:**
- React com Vite
- Material-UI (MUI) — opcional, mas recomendado para agilizar o visual
- TheMealDB API

**Objetivos pedagógicos:**
- Componentização e reuso
- Gerenciamento de estado e efeitos colaterais
- Consumo de APIs com `fetch`/`async/await`
- Organização de código em camadas (páginas, componentes, utilitários)
- Estilização com biblioteca de componentes
- Navegação (rotas ou condicionais) para detalhes

---

## 🚀 Setup do Projeto

### 1. Criar o projeto com Vite

```bash
npm create vite@latest app-receitas -- --template react
cd app-receitas
npm install
```

### 2. Instalar Material-UI (opcional)

```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @fontsource/roboto @mui/icons-material
```

### 3. Estrutura de pastas (sugestão)

```
src/
├── components/    # Componentes reutilizáveis
├── pages/         # Páginas (Home, Detalhes)
├── utils/         # Funções auxiliares (api.js)
├── App.jsx
└── main.jsx
```

---

## 📋 Requisitos

Os requisitos descrevem **o que** o sistema deve fazer, não **como**.  
Use sua criatividade para decidir a implementação, componentes, estados e estrutura.

---

### Requisito 1 — Estrutura da página principal

**Contexto:** A página inicial é o ponto de partida. Ela deve conter os elementos essenciais para o usuário interagir.

**O que deve ser feito:**

- A página deve exibir:
  - Um cabeçalho com o nome do app (e, futuramente, um link para favoritos)
  - Uma área para busca por nome (campo de texto + botão)
  - Uma área para os botões de categorias (gerados dinamicamente)
  - Uma grade para exibir os cards de receitas
- Organize os elementos de forma responsiva (pensando em desktop e mobile).

**Critérios de aceite:**
- A página carrega e mostra a estrutura básica (mesmo que vazia).
- Os elementos estão dispostos de forma clara e acessível.

---

### Requisito 2 — Funções de comunicação com a API

**Contexto:** O app precisa buscar dados da TheMealDB. Isole essas funções em um arquivo utilitário (ex: `utils/api.js`) para reutilização.

**Endpoints necessários:**

- Buscar receitas por nome: `GET /search.php?s={nome}`
- Buscar todas as categorias: `GET /categories.php`
- Buscar receitas por categoria: `GET /filter.php?c={categoria}`
- Buscar detalhes de uma receita por ID: `GET /lookup.php?i={idReceita}`

**O que deve ser feito:**

- Criar funções assíncronas (com `async/await`) para cada endpoint.
- Cada função deve retornar os dados obtidos ou lançar um erro em caso de falha.
- Tratar erros com `try/catch` (você decide se dentro de cada função ou em um bloco centralizado).

**Critérios de aceite:**
- As funções podem ser testadas independentemente (por exemplo, no console ou com Thunder Client/Insomnia).
- Ao passar parâmetros válidos, retornam os dados esperados.

> 🔍 Explore os endpoints com o Thunder Client (extensão VS Code) ou Insomnia para entender a estrutura da resposta antes de codificar.

---

### Requisito 3 — Exibição dos cards de receita

**Contexto:** As receitas devem ser apresentadas visualmente como cards, contendo imagem e nome.

**O que deve ser feito:**

- Criar um componente que represente um card de receita.
- Esse componente deve receber as informações necessárias (nome, imagem, id) via `props`.
- Na página principal, renderizar uma grade com um card para cada receita da lista.
- A grade deve ser atualizada sempre que a lista de receitas mudar.

**Critérios de aceite:**
- Cada card exibe a foto e o nome da receita.
- Os cards são organizados em uma grade responsiva.
- É possível identificar visualmente que cada card representa uma receita (pode conter um botão ou área clicável para detalhes, que será implementado depois).

> Neste ponto, você pode usar dados fixos (mock) para testar o layout, ou já carregar as receitas de uma busca inicial (ex: "pasta") — você decide.

---

### Requisito 4 — Busca por nome

**Contexto:** O usuário pode digitar o nome de uma receita e pesquisar.

**O que deve ser feito:**

- Um campo de texto e um botão de busca.
- A busca deve ser disparada ao clicar no botão **ou** ao pressionar `Enter`.
- Se o campo estiver vazio, a busca não deve ser disparada (veja requisito de validação).
- Ao buscar:
  - As receitas exibidas são substituídas pelo resultado da pesquisa.
  - Se houver uma categoria selecionada, ela deve ser desmarcada (a busca por nome é independente).
- Trate os casos de sucesso, erro e lista vazia (feedback ao usuário).

**Critérios de aceite:**
- A busca funciona tanto pelo botão quanto pelo Enter.
- Buscas vazias são ignoradas.
- O resultado substitui qualquer filtro anterior.

---

### Requisito 5 — Filtro por categorias

**Contexto:** O usuário pode clicar em uma categoria para ver apenas receitas daquela categoria.

**O que deve ser feito:**

- A partir da lista de categorias (obtida da API), gerar botões dinamicamente.
- Cada botão deve exibir o nome da categoria.
- Ao clicar em um botão:
  - As receitas exibidas são substituídas pelas da categoria selecionada.
  - O botão clicado deve ficar visualmente destacado (por exemplo, cor diferente, sublinhado, ou usando `variant` do MUI) para indicar que está ativo.
  - Quando outra categoria for selecionada, o destaque é removido da anterior.
- Se houver uma busca por nome ativa, ela deve ser limpa ao selecionar uma categoria.

**Critérios de aceite:**
- Os botões são gerados a partir dos dados da API.
- Apenas o botão da categoria ativa está destacado.
- Ao clicar, as receitas são filtradas corretamente.

---

### Requisito 6 — Validação de entrada

**Contexto:** Para evitar chamadas desnecessárias à API, o campo de busca deve validar a entrada do usuário.

**O que deve ser feito:**

- Impedir que a busca seja disparada se o campo estiver vazio ou contiver apenas espaços.
- Opcionalmente, defina um comprimento mínimo (ex: 2 caracteres) para iniciar a busca.
- Dê feedback visual (ex: borda vermelha, mensagem) quando a entrada for inválida.

**Critérios de aceite:**
- A busca não é disparada com entrada inválida.
- O usuário entende por que a busca não foi realizada.

---

### Requisito 7 — Tratamento de erros e feedback

**Contexto:** A aplicação deve lidar graciosamente com situações inesperadas (falhas de rede, API indisponível, dados mal formatados).

**O que deve ser feito:**

- Capturar erros em todas as requisições à API.
- Exibir uma mensagem de erro amigável para o usuário (ex: "Não foi possível carregar as receitas. Tente novamente.").
- Diferenciar, se possível, entre "nenhum resultado encontrado" e "erro de conexão".
- A mensagem de erro deve desaparecer quando uma nova requisição bem-sucedida for feita.
- Durante o carregamento, você pode (opcionalmente) mostrar um indicador de progresso (spinner).

**Critérios de aceite:**
- Em caso de erro, o usuário vê uma mensagem clara.
- A aplicação não quebra (não fica em estado inconsistente).
- O usuário pode tentar novamente (por exemplo, refazendo a busca).

---

### Requisito 8 — Detalhes da receita

**Contexto:** O usuário deve poder ver informações detalhadas de uma receita (ingredientes, instruções) ao clicar em um card.

**O que deve ser feito:**

- Cada card deve ter um botão ou área clicável que leve para uma página/modal de detalhes.
- Ao acessar os detalhes, faça uma requisição à API usando o endpoint `lookup.php?i={id}`.
- Exiba:
  - Nome
  - Imagem
  - Categoria (se disponível)
  - Lista de ingredientes com medidas
  - Instruções de preparo
  - Vídeo (opcional, se existir)
- Implemente os detalhes como:
  - Uma nova rota (React Router)
  - Um modal sobreposto
  - Um componente condicional que troca a visibilidade

**Critérios de aceite:**
- Ao clicar em um card, o usuário vê as informações completas.
- É possível voltar à lista principal sem perder o estado (categoria ou busca ativa).

---

### Requisito 9 (Opcional) — Favoritar receitas

**Contexto:** O usuário pode marcar receitas como favoritas e visualizá-las em uma lista separada.

**O que deve ser feito:**

- Adicionar um botão (ex: ícone de coração) em cada card e na página de detalhes para favoritar/desfavoritar.
- Armazenar os favoritos localmente (ex: `localStorage` para persistência).
- Criar uma rota ou seção no cabeçalho que exiba apenas as receitas favoritadas.
- O estado de favorito deve ser sincronizado entre a lista e os detalhes.

**Critérios de aceite:**
- O usuário pode favoritar e desfavoritar receitas.
- Os favoritos persistem após recarregar a página.
- A lista de favoritos mostra apenas as receitas marcadas.

---

## 🧪 Dicas para o desenvolvimento

- **Teste os endpoints manualmente** com Thunder Client, Insomnia ou no navegador para conhecer a estrutura dos dados.
- **Desenvolva em pequenos ciclos**: implemente um requisito, teste no navegador, depois avance.
- **Use o React DevTools** para inspecionar estado e props — isso ajuda a entender o fluxo de dados.
- **Pense na estrutura de dados**: conforme você implementa, vai perceber a necessidade de guardar receitas, categorias, controle de loading, erro, categoria ativa, termo de busca, etc. Crie os estados conforme a necessidade surgir.
- **Aproveite a documentação do MUI** se optar por usá-lo — ela tem exemplos claros e acessíveis.
- **Mantenha os componentes pequenos** e com uma única responsabilidade.
- **Trate erros de forma consistente** — crie um mecanismo centralizado se preferir, ou trate caso a caso.

---

## 📚 Referências

- [TheMealDB API Documentation](https://www.themealdb.com/documentation)
- [Material-UI React Components](https://mui.com/material-ui/)
- [React Hooks – useState, useEffect](https://react.dev/reference/react)
- [React Router (para navegação)](https://reactrouter.com/) (opcional)

---

Bom trabalho! Construa com autonomia, usando os requisitos como guia, não como receita. Divirta-se! 🚀