(function () {
  "use strict";

  var CHAVE = "pauta:tarefas";
  var tarefas = carregar();
  var filtroAtual = "todas";
  var termoBusca = "";
  var editandoId = null;

  var form = document.getElementById("form-tarefa");
  var campoTitulo = document.getElementById("titulo");
  var campoPrioridade = document.getElementById("prioridade");
  var campoPrazo = document.getElementById("prazo");
  var lista = document.getElementById("lista");
  var vazio = document.getElementById("vazio");
  var resumo = document.getElementById("resumo");
  var busca = document.getElementById("busca");
  var botoesFiltro = document.querySelectorAll(".filtro");
  var botaoLimpar = document.getElementById("limpar");

  var ROTULO_PRIORIDADE = { alta: "Prioridade alta", media: "Prioridade média", baixa: "Prioridade baixa" };
  var ORDEM_PRIORIDADE = { alta: 0, media: 1, baixa: 2 };

  function carregar() {
    try {
      var salvo = JSON.parse(localStorage.getItem(CHAVE));
      return Array.isArray(salvo) ? salvo : [];
    } catch (e) {
      return [];
    }
  }

  function salvar() {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(tarefas));
    } catch (e) {
      /* sem armazenamento disponível: a lista funciona só até fechar a aba */
    }
  }

  function hojeISO() {
    var d = new Date();
    var mes = String(d.getMonth() + 1).padStart(2, "0");
    var dia = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + mes + "-" + dia;
  }

  function formatarData(iso) {
    var partes = iso.split("-");
    return partes[2] + "/" + partes[1] + "/" + partes[0];
  }

  function novoId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  function visiveis() {
    var termo = termoBusca.trim().toLowerCase();
    return tarefas
      .filter(function (t) {
        if (filtroAtual === "pendentes" && t.feita) return false;
        if (filtroAtual === "concluidas" && !t.feita) return false;
        return !termo || t.titulo.toLowerCase().indexOf(termo) !== -1;
      })
      .sort(function (a, b) {
        if (a.feita !== b.feita) return a.feita ? 1 : -1;
        if (a.prioridade !== b.prioridade) return ORDEM_PRIORIDADE[a.prioridade] - ORDEM_PRIORIDADE[b.prioridade];
        if (a.prazo && b.prazo) return a.prazo < b.prazo ? -1 : 1;
        if (a.prazo) return -1;
        if (b.prazo) return 1;
        return 0;
      });
  }

  function criarElemento(tag, classe, texto) {
    var el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto !== undefined) el.textContent = texto;
    return el;
  }

  function criarTarefa(t) {
    var li = criarElemento("li", "tarefa" + (t.feita ? " feita" : ""));
    li.dataset.prioridade = t.prioridade;
    li.dataset.id = t.id;

    var marcar = document.createElement("input");
    marcar.type = "checkbox";
    marcar.checked = t.feita;
    marcar.setAttribute("aria-label", "Marcar \"" + t.titulo + "\" como concluída");
    marcar.addEventListener("change", function () {
      t.feita = marcar.checked;
      salvar();
      desenhar();
    });

    var corpo = criarElemento("div", "corpo");
    if (editandoId === t.id) {
      var entrada = criarElemento("input", "editar-titulo");
      entrada.type = "text";
      entrada.maxLength = 120;
      entrada.value = t.titulo;
      entrada.setAttribute("aria-label", "Editar título da tarefa");
      entrada.addEventListener("keydown", function (e) {
        if (e.key === "Enter") confirmarEdicao(t, entrada.value);
        if (e.key === "Escape") { editandoId = null; desenhar(); }
      });
      corpo.appendChild(entrada);
      setTimeout(function () { entrada.focus(); entrada.select(); }, 0);
    } else {
      corpo.appendChild(criarElemento("p", "titulo", t.titulo));
    }

    var detalhes = criarElemento("p", "detalhes", ROTULO_PRIORIDADE[t.prioridade]);
    if (t.prazo) {
      var atrasada = !t.feita && t.prazo < hojeISO();
      detalhes.appendChild(document.createTextNode(" · Prazo: " + formatarData(t.prazo)));
      if (atrasada) detalhes.appendChild(criarElemento("span", "atrasada", " (atrasada)"));
    }
    corpo.appendChild(detalhes);

    var acoes = criarElemento("div", "acoes");
    var editar = criarElemento("button", "acao", editandoId === t.id ? "Salvar" : "Editar");
    editar.type = "button";
    editar.addEventListener("click", function () {
      if (editandoId === t.id) {
        var campo = li.querySelector(".editar-titulo");
        confirmarEdicao(t, campo ? campo.value : t.titulo);
      } else {
        editandoId = t.id;
        desenhar();
      }
    });
    var excluir = criarElemento("button", "acao excluir", "Excluir");
    excluir.type = "button";
    excluir.addEventListener("click", function () {
      tarefas = tarefas.filter(function (x) { return x.id !== t.id; });
      salvar();
      desenhar();
    });
    acoes.appendChild(editar);
    acoes.appendChild(excluir);

    li.appendChild(marcar);
    li.appendChild(corpo);
    li.appendChild(acoes);
    return li;
  }

  function confirmarEdicao(t, novoTitulo) {
    var limpo = novoTitulo.trim();
    if (limpo) t.titulo = limpo;
    editandoId = null;
    salvar();
    desenhar();
  }

  function textoVazio() {
    if (tarefas.length === 0) return "Nenhuma tarefa por aqui ainda. Escreva a primeira no campo acima.";
    if (termoBusca.trim()) return "Nenhuma tarefa encontrada para essa busca.";
    if (filtroAtual === "pendentes") return "Você não tem tarefas pendentes.";
    if (filtroAtual === "concluidas") return "Nenhuma tarefa concluída ainda.";
    return "";
  }

  function desenhar() {
    var itens = visiveis();
    lista.textContent = "";
    itens.forEach(function (t) { lista.appendChild(criarTarefa(t)); });

    vazio.hidden = itens.length > 0;
    vazio.textContent = itens.length > 0 ? "" : textoVazio();

    var pendentes = tarefas.filter(function (t) { return !t.feita; }).length;
    var feitas = tarefas.length - pendentes;
    if (tarefas.length === 0) {
      resumo.textContent = "Sua lista está vazia.";
    } else {
      resumo.textContent =
        pendentes + (pendentes === 1 ? " pendente" : " pendentes") +
        " e " + feitas + (feitas === 1 ? " concluída" : " concluídas") + ".";
    }

    botaoLimpar.hidden = feitas === 0;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var titulo = campoTitulo.value.trim();
    if (!titulo) {
      campoTitulo.focus();
      return;
    }
    tarefas.push({
      id: novoId(),
      titulo: titulo,
      prioridade: campoPrioridade.value,
      prazo: campoPrazo.value,
      feita: false
    });
    salvar();
    form.reset();
    campoPrioridade.value = "media";
    campoTitulo.focus();
    desenhar();
  });

  botoesFiltro.forEach(function (botao) {
    botao.addEventListener("click", function () {
      filtroAtual = botao.dataset.filtro;
      botoesFiltro.forEach(function (b) { b.classList.toggle("ativo", b === botao); });
      desenhar();
    });
  });

  busca.addEventListener("input", function () {
    termoBusca = busca.value;
    desenhar();
  });

  botaoLimpar.addEventListener("click", function () {
    var feitas = tarefas.filter(function (t) { return t.feita; }).length;
    if (!feitas) return;
    if (confirm("Apagar " + feitas + (feitas === 1 ? " tarefa concluída?" : " tarefas concluídas?"))) {
      tarefas = tarefas.filter(function (t) { return !t.feita; });
      salvar();
      desenhar();
    }
  });

  desenhar();
})();
