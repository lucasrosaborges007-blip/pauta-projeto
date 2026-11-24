# Pauta

Um gerenciador de tarefas simples, feito para a atividade de deploy na Vercel.
Você escreve o que precisa fazer, escolhe a prioridade e o prazo, e acompanha o que ainda está pendente. Tudo fica salvo no próprio navegador, então não precisa de login nem de banco de dados.

## O que ele faz

- Adicionar tarefas com título, prioridade (alta, média ou baixa) e prazo opcional
- Marcar como concluída, editar o título e excluir
- Filtrar por todas, pendentes ou concluídas
- Buscar uma tarefa pelo nome
- Avisar quando uma tarefa passou do prazo
- Apagar de uma vez todas as tarefas concluídas
- Funcionar bem no celular

## Como rodar no seu computador

Você só precisa do Node.js (versão 18 ou mais nova). Não há nada para instalar com `npm install`, porque o projeto não usa bibliotecas externas.

```bash
npm run dev      # abre em http://localhost:3000
npm run build    # gera a pasta dist/ para produção
npm start        # serve a pasta dist/ para conferir o resultado do build
```

## Estrutura

```
src/            código do site (index.html, style.css, app.js, favicon.svg)
scripts/        build.js (gera o dist) e serve.js (servidor local)
vercel.json     diz à Vercel qual comando rodar e qual pasta publicar
.gitignore      impede o envio de node_modules, dist e arquivos .env
RELATORIO.md    o que foi feito em cada etapa da atividade
```

## Antes de publicar: coloque o seu nome

No arquivo `src/index.html`, procure por `Seu Nome` no rodapé e troque pelo seu nome.
Depois do primeiro deploy, essa mesma troca pode ser usada como o teste de atualização automática (etapa 7 da atividade).

## Passo a passo do deploy

1. Rode `npm run build` e confirme que terminou sem erro.
2. Confira que o `.gitignore` existe (já vem pronto neste projeto).
3. Crie um repositório vazio no GitHub e envie o código:

```bash
git init
git add .
git commit -m "Versão inicial para deploy"
git branch -M main
git remote add origin https://github.com/USUARIO/NOME-DO-REPOSITORIO.git
git push -u origin main
```

4. Em vercel.com, entre com **Continue with GitHub**, clique em **Add New... > Project** e importe o repositório.
5. Na tela de configuração, deixe o **Framework Preset** como **Other**. O `vercel.json` já informa o comando de build (`npm run build`) e a pasta de saída (`dist`). Este projeto não usa variáveis de ambiente, então não precisa cadastrar nenhuma.
6. Clique em **Deploy**, acompanhe os logs e abra o link `nome-do-projeto.vercel.app` no computador e no celular.
7. Para testar o CI/CD, altere o rodapé, faça um novo commit e envie:

```bash
git add .
git commit -m "Atualiza rodapé para teste de CI/CD"
git push
```

8. No painel da Vercel, abra a aba **Deployments**. Um novo deploy começa sozinho e, quando terminar, aparece com o status **Ready**. Tire a captura de tela dessa aba para a entrega.

## O que entregar

- Link da aplicação publicada
- Link do repositório no GitHub (com pelo menos dois commits)
- Captura de tela da aba Deployments com o status Ready
