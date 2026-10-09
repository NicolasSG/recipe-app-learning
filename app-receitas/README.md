# 🍽️ Receitas do Mundo

Aplicação web para explorar receitas de vários países, buscar por nome, filtrar por categoria e acompanhar o passo a passo marcando os ingredientes. Desenvolvido com React, consumindo a [TheMealDB API](https://www.themealdb.com).

**Demo:** https://nicolassg.github.io/recipe-app-learning/

## Funcionalidades

- **Busca por nome** com validação de mínimo de 3 caracteres (o erro aparece só depois de clicar em Buscar, sem mover o layout).
- **Filtro por categoria**: a página já abre com a categoria Beef carregada.
- **Cards de receita** com elevação no hover (só em dispositivos com mouse) e botão para abrir os detalhes.
- **Modal de receita** com imagem, nome, instruções e botão "Iniciar receita".
- **Lista de ingredientes interativa**: ao iniciar, o painel de ingredientes abre ao lado do modal com transição suave. Os ingredientes marcados e o estado "receita iniciada" ficam salvos no `localStorage`, então a receita reabre do ponto em que foi deixada.
- **Estado de carregamento** com Skeleton do MUI (animação wave).
- **Notificações de erro** com `react-hot-toast`.
- **Layout responsivo**: 4, 3, 2 ou 1 cards por linha conforme a largura da tela; no celular, os ingredientes abrem abaixo do modal.

## Tecnologias

- [React 19](https://react.dev)
- [Vite](https://vite.dev)
- [Material UI](https://mui.com) (`TextField` e `Skeleton`)
- [react-hot-toast](https://react-hot-toast.com)
- CSS puro, com variáveis de cor em `:root`
- Fontes [Fraunces](https://fonts.google.com/specimen/Fraunces) e [Nunito](https://fonts.google.com/specimen/Nunito), via Google Fonts
- [Oxlint](https://oxc.rs) para lint
- Deploy no GitHub Pages com GitHub Actions

## Como rodar localmente

Pré-requisito: [Node.js](https://nodejs.org) 20 ou superior.

```bash
# clonar o repositório
git clone https://github.com/NicolasSG/recipe-app-learning.git
cd recipe-app-learning/app-receitas

# instalar as dependências
npm install

# iniciar o servidor de desenvolvimento
npm run dev
```

## Scripts

| Comando           | Descrição                                   |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Servidor de desenvolvimento com HMR         |
| `npm run build`   | Gera a versão de produção em `dist/`        |
| `npm run preview` | Serve localmente a versão de produção       |
| `npm run lint`    | Roda o Oxlint                               |

## Estrutura

```
app-receitas/
├── index.html
├── vite.config.js
└── src/
    ├── App.jsx              # estado principal, busca e filtros
    ├── App.css              # estilos e variáveis de cor
    ├── index.css            # estilos globais e fontes
    ├── utils.js             # chamadas à TheMealDB API
    ├── context/             # contexto com a lista de categorias
    └── components/
        ├── Card.jsx         # card de receita
        ├── CardModal.jsx    # modal com detalhes e ingredientes
        ├── CardSkeleton.jsx # skeleton de carregamento
        └── Categories.jsx   # botão de categoria
```

## Deploy

O deploy é automático: a cada push na branch `master` que altere `app-receitas/`, o workflow em `.github/workflows/deploy.yml` faz o build e publica no GitHub Pages. O `base` do Vite está configurado como `/recipe-app-learning/` para funcionar nesse endereço.

## Créditos

- Dados e imagens fornecidos pela [TheMealDB](https://www.themealdb.com).
- Desenvolvido por [Nicolas](https://github.com/NicolasSG).
