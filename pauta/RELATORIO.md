# Relatório do que foi feito

Projeto: **Pauta**, um gerenciador de tarefas criado a partir do enunciado "Atividade de Deploy: Publicação de Aplicação Web na Vercel".

## Escolha do projeto

O enunciado pede uma aplicação web pronta para ser publicada, com build, GitHub e Vercel. Escolhi um gerenciador de tarefas porque é um tipo de projeto que dá para entender rápido, tem funcionalidades visíveis para testar depois do deploy e não exige servidor nem banco de dados.

## Pré-requisitos

| Pré-requisito | Situação |
|---|---|
| Projeto web finalizado e funcionando localmente | O projeto está completo. Rodei o build e conferi a sintaxe do código; falta só abrir no navegador com `npm run dev`. |
| Conta ativa no GitHub | Fica com você. |
| Git instalado e configurado | Fica com você. |

## Etapa 1 e 2: build local e .gitignore

- Criei o `package.json` com o script `build`, que roda `scripts/build.js` e copia os arquivos de `src/` para `dist/`.
- Executei `npm run build` e ele terminou sem erros, gerando `app.js`, `index.html`, `style.css` e `favicon.svg` em `dist/`.
- Não usei bibliotecas externas, então o build não depende de internet nem de `npm install`.
- Criei o `.gitignore` com `node_modules/`, `dist/`, `.env` (e variações) e `.vercel`, que cobre o mínimo pedido no enunciado.

## Etapa 3: envio para o GitHub

Os comandos do enunciado (`git init`, `add`, `commit`, `branch -M main`, `remote add` e `push`) estão no README, prontos para copiar. Eu não executei, porque o repositório precisa ser criado na sua conta.

## Etapa 4: importar na Vercel

Descrevi no README o caminho exato: Continue with GitHub, Add New... > Project, Import.

## Etapa 5: configurações de build e variáveis de ambiente

- Criei o `vercel.json` informando `buildCommand: npm run build` e `outputDirectory: dist`.
- Na tela da Vercel, o Framework Preset deve ficar como **Other**.
- O projeto não usa chaves de API nem banco, então não há variáveis de ambiente para cadastrar. Mesmo assim o `.gitignore` já protege um eventual `.env`.

## Etapa 6: deploy e inspeção dos logs

Está explicado no README. Ao final você terá o link no formato `nome-do-projeto.vercel.app`, que deve ser aberto no computador e no celular. A interface foi feita para telas pequenas, com o formulário e a lista se reorganizando no celular.

## Etapa 7 e 8: teste de atualização automática (CI/CD)

- Deixei no rodapé o texto "Desenvolvido por Seu Nome", justamente para você trocar por seu nome.
- Os comandos do segundo commit estão no README. O deploy automático e a captura da aba Deployments dependem da sua conta na Vercel.

## O que foi construído no aplicativo

- Cadastro de tarefas com título, prioridade e prazo.
- Marcar como concluída, editar e excluir.
- Filtros (todas, pendentes, concluídas) e busca por nome.
- Ordenação automática: pendentes primeiro, depois por prioridade e por prazo.
- Aviso de tarefa atrasada.
- Botão para apagar as concluídas, com confirmação.
- Dados salvos no navegador (localStorage); se o armazenamento estiver bloqueado, o app continua funcionando até a aba ser fechada.
- Os textos digitados são inseridos como texto puro, sem interpretar HTML.
- Foco visível no teclado, rótulos para leitores de tela e movimento reduzido respeitado.

## Entrega: o que ainda falta com você

1. Trocar "Seu Nome" no rodapé.
2. Criar o repositório e fazer o primeiro commit.
3. Importar na Vercel e conferir o deploy.
4. Fazer o segundo commit (teste de CI/CD).
5. Enviar os três itens: link do site, link do repositório e captura da aba Deployments com status Ready.
