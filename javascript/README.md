# 🍽️ App de Receitas

Você vai construir um app de receitas consumindo a **TheMealDB**, uma API pública e gratuita.

O HTML e o CSS já estão prontos — a parte visual está resolvida. **Seu trabalho é toda a lógica em JavaScript:** cada requisito abaixo corresponde a uma parte do código que você vai escrever.

---

## 📋 Requisitos

---

### Requisito 1 — Captura de elementos do DOM

**Como** desenvolvedora,  
**quero** capturar os elementos necessários do HTML,  
**para** poder manipulá-los ao longo da aplicação.

**Critérios de aceite:**

- [ ] Todos os elementos que serão lidos ou modificados pelo JavaScript devem ser capturados via `document.querySelector` ou `document.getElementById` e armazenados em variáveis
- [ ] As variáveis de elementos do DOM devem estar agrupadas no topo do arquivo, antes de qualquer função

---

### Requisito 2 — Integração com a API

**Como** desenvolvedora,  
**quero** configurar e implementar as funções que se comunicam com a TheMealDB,  
**para** ter uma camada isolada de acesso a dados que o restante da aplicação possa usar.

**Base URL:**
```
https://www.themealdb.com/api/json/v1/1
```

**Critérios de aceite:**

- [ ] Deve existir uma função `fetchRecipesByName(name)` que busca receitas pelo nome usando o endpoint `GET /search.php?s={name}` e retorna a lista de receitas
- [ ] Deve existir uma função `fetchCategories()` que busca todas as categorias disponíveis usando o endpoint `GET /categories.php` e retorna a lista de categorias
- [ ] Deve existir uma função `fetchRecipesByCategory(category)` que busca receitas de uma categoria específica usando o endpoint `GET /filter.php?c={category}` e retorna a lista de receitas
- [ ] Todas as funções devem usar `async/await`
- [ ] Todas as funções devem tratar erros com `try/catch`

> 💡 Teste cada endpoint direto no navegador antes de escrever código. Exemplo: `https://www.themealdb.com/api/json/v1/1/search.php?s=pasta`

---

### Requisito 3 — Controle de estados da interface

**Como** usuária do app,  
**quero** receber um feedback visual enquanto os dados carregam ou quando algo dá errado,  
**para** entender o que está acontecendo na tela.

**Critérios de aceite:**

- [ ] Enquanto uma requisição estiver em andamento, o indicador de carregamento deve estar visível
- [ ] Quando a requisição terminar, o indicador de carregamento deve desaparecer
- [ ] Se a requisição falhar, uma mensagem de erro deve aparecer na tela
- [ ] Se a busca não retornar nenhum resultado, uma mensagem informando isso deve aparecer

> 💡 Os elementos de loading, erro e resultado vazio já existem no HTML. Você só precisa controlar quando cada um aparece e desaparece — as classes CSS já estão prontas.

---

### Requisito 4 — Renderização dos cards de receita

**Como** usuária do app,  
**quero** ver as receitas exibidas como cards na tela,  
**para** visualizar os resultados de uma busca ou filtro.

**Critérios de aceite:**

- [ ] Deve existir uma função `renderRecipes(meals)` que recebe uma lista de receitas e exibe um card para cada uma na área `#recipes-grid`
- [ ] Cada card deve exibir a foto e o nome da receita
- [ ] Antes de renderizar novos resultados, os cards anteriores devem ser removidos da tela
- [ ] A estrutura HTML de cada card deve seguir as classes definidas no `styles.css`

---

### Requisito 5 — Renderização dos botões de categoria

**Como** usuária do app,  
**quero** ver botões com as categorias disponíveis,  
**para** poder filtrar as receitas por tipo.

**Critérios de aceite:**

- [ ] Deve existir uma função `renderCategories(categories)` que recebe a lista de categorias e cria um botão para cada uma na área `#categories`
- [ ] Os botões devem ser gerados dinamicamente a partir dos dados da API — não escritos no HTML
- [ ] Cada botão deve ter a classe `category-btn`

---

### Requisito 6 — Busca por nome

**Como** usuária do app,  
**quero** digitar o nome de uma receita e pressionar Enter ou clicar em "Buscar",  
**para** ver na tela apenas as receitas que correspondem ao que eu pesquisei.

**Critérios de aceite:**

- [ ] A busca deve ser disparada tanto ao clicar no botão quanto ao pressionar Enter no campo de texto
- [ ] Se o campo estiver vazio, a busca não deve ser disparada
- [ ] Os estados de carregamento, erro e resultado vazio devem ser gerenciados corretamente durante o fluxo

---

### Requisito 7 — Filtro por categoria

**Como** usuária do app,  
**quero** clicar em um botão de categoria,  
**para** ver na tela apenas receitas daquela categoria.

**Critérios de aceite:**

- [ ] Ao clicar em uma categoria, os cards exibidos devem ser substituídos pelas receitas dessa categoria
- [ ] O botão da categoria selecionada deve receber a classe `category-btn--active`
- [ ] Quando uma nova categoria for selecionada, a classe `category-btn--active` deve ser removida do botão anterior

---

## 🚫 Não altere

- `index.html`
- `styles.css`

Todo o trabalho vai estar em `scripts.js`.
