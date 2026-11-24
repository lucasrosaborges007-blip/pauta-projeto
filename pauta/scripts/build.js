// Gera a pasta dist/ com os arquivos prontos para publicação.
// Não depende de nenhum pacote externo.
const fs = require("fs");
const path = require("path");

const origem = path.join(__dirname, "..", "src");
const destino = path.join(__dirname, "..", "dist");

if (!fs.existsSync(path.join(origem, "index.html"))) {
  console.error("Erro: src/index.html não foi encontrado.");
  process.exit(1);
}

fs.rmSync(destino, { recursive: true, force: true });
fs.cpSync(origem, destino, { recursive: true });

const arquivos = fs.readdirSync(destino);
console.log("Build concluído. Arquivos em dist/: " + arquivos.join(", "));
