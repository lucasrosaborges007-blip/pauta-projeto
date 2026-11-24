// Servidor local simples para testar o projeto no navegador.
// Uso: npm run dev  (serve a pasta src)  |  npm start  (serve a pasta dist)
const http = require("http");
const fs = require("fs");
const path = require("path");

const pasta = path.join(__dirname, "..", process.argv[2] || "src");
const porta = process.env.PORT || 3000;

const tipos = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

http
  .createServer((req, res) => {
    const caminhoPedido = req.url.split("?")[0];
    const arquivo = path.join(pasta, caminhoPedido === "/" ? "index.html" : caminhoPedido);

    if (!arquivo.startsWith(pasta)) {
      res.writeHead(403).end("Acesso negado");
      return;
    }

    fs.readFile(arquivo, (erro, conteudo) => {
      if (erro) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Página não encontrada");
        return;
      }
      res.writeHead(200, { "Content-Type": tipos[path.extname(arquivo)] || "application/octet-stream" });
      res.end(conteudo);
    });
  })
  .listen(porta, () => console.log("Rodando em http://localhost:" + porta));
