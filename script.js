// Carregar tarefas salvas
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// Adicionar tarefa
function adicionarTarefa() {

    let nome = document.getElementById("nomeTarefa").value.trim();
    let materia = document.getElementById("materiaTarefa").value.trim();

    if (nome === "" || materia === "") {
        alert("Preencha o nome da tarefa e a matéria!");
        return;
    }

    let tarefa = {
        id: Date.now(),
        nome: nome,
        materia: materia,
        concluida: false
    };

    tarefas.push(tarefa);

    salvarTarefas();

    document.getElementById("nomeTarefa").value = "";
    document.getElementById("materiaTarefa").value = "";

    mostrarTarefas();
}

// Salvar no navegador
function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    atualizarPainel();
}

// Mostrar tarefas
function mostrarTarefas() {

    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(tarefa => {

        let item = document.createElement("div");
        item.className = "tarefa";

        let nome = document.createElement("span");
        nome.textContent = tarefa.nome + " - " + tarefa.materia;

        if (tarefa.concluida) {
            nome.classList.add("concluida");
        }

        let concluir = document.createElement("button");
        concluir.textContent = tarefa.concluida
            ? "Desmarcar"
            : "Concluir";

        concluir.onclick = function() {
            tarefa.concluida = !tarefa.concluida;
            salvarTarefas();
            mostrarTarefas();
        };

        let excluir = document.createElement("button");
        excluir.textContent = "Excluir";

        excluir.onclick = function() {
            tarefas = tarefas.filter(t => t.id !== tarefa.id);
            salvarTarefas();
            mostrarTarefas();
        };

        item.appendChild(nome);
        item.appendChild(concluir);
        item.appendChild(excluir);

        lista.appendChild(item);

    });
}

// Carregar ao abrir o site
mostrarTarefas();


// ==============================
// AGENDA DO CAPIVARA+
// ==============================

// Carregar compromissos salvos
let eventos = JSON.parse(localStorage.getItem("eventos")) || [];

// Salvar compromissos
function salvarAgenda() {
    localStorage.setItem("eventos", JSON.stringify(eventos));
}

// Adicionar compromisso
function adicionarEvento() {

    let nome = document.getElementById("nomeEvento").value.trim();
    let tipo = document.getElementById("tipoEvento").value;
    let data = document.getElementById("dataEvento").value;

    if (nome === "" || data === "") {
        alert("Preencha o nome e a data do compromisso!");
        return;
    }

    let evento = {
        id: Date.now(),
        nome: nome,
        tipo: tipo,
        data: data
    };

    eventos.push(evento);

    salvarAgenda();

    document.getElementById("nomeEvento").value = "";
    document.getElementById("dataEvento").value = "";

    mostrarAgenda();
}

// Mostrar compromissos
function mostrarAgenda() {

    let lista = document.getElementById("listaAgenda");

    lista.innerHTML = "";

    if (eventos.length === 0) {
        lista.textContent = "Nenhum compromisso cadastrado.";
        return;
    }

    // Organizar por data
    let organizados = [...eventos].sort((a, b) =>
        a.data.localeCompare(b.data)
    );

    organizados.forEach(evento => {

        let item = document.createElement("div");
        item.className = "evento";

        let informacoes = document.createElement("div");

        let titulo = document.createElement("strong");
        titulo.textContent = evento.nome;

        let detalhe = document.createElement("p");
        detalhe.textContent =
            evento.tipo + " - " +
            evento.data.split("-").reverse().join("/");

        let excluir = document.createElement("button");
        excluir.textContent = "Excluir";

        excluir.onclick = function() {
            eventos = eventos.filter(e => e.id !== evento.id);
            salvarAgenda();
            mostrarAgenda();
        };

        informacoes.appendChild(titulo);
        informacoes.appendChild(detalhe);

        item.appendChild(informacoes);
        item.appendChild(excluir);

        lista.appendChild(item);

    });
}

// Carregar agenda ao abrir o site
mostrarAgenda();

// ==============================
// ÁREA DE ESTUDOS
// ==============================

// Carregar matérias salvas
let materias = JSON.parse(localStorage.getItem("materias")) || [];

// Salvar matérias
function salvarMaterias() {
    localStorage.setItem("materias", JSON.stringify(materias));
    atualizarPainel();
}

// Adicionar matéria
function adicionarMateria() {

    let nome = document.getElementById("nomeMateria").value.trim();
    let descricao = document.getElementById("descricaoMateria").value.trim();
    let link = document.getElementById("linkMateria").value.trim();

    if (nome === "" || descricao === "") {
        alert("Preencha o nome e a descrição da matéria!");
        return;
    }

    if (link !== "") {
        try {
            let endereco = new URL(link);

            if (endereco.protocol !== "http:" &&
                endereco.protocol !== "https:") {
                alert("Digite um link válido!");
                return;
            }

        } catch {
            alert("Digite um link válido!");
            return;
        }
    }

    let materia = {
        id: Date.now(),
        nome: nome,
        descricao: descricao,
        link: link
    };

    materias.push(materia);

    salvarMaterias();

    document.getElementById("nomeMateria").value = "";
    document.getElementById("descricaoMateria").value = "";
    document.getElementById("linkMateria").value = "";

    mostrarMaterias();
}

// Mostrar matérias
function mostrarMaterias() {

    let lista = document.getElementById("listaMaterias");

    lista.innerHTML = "";

    if (materias.length === 0) {
        lista.textContent = "Nenhuma matéria cadastrada.";
        return;
    }

    materias.forEach(materia => {

        let item = document.createElement("div");
        item.className = "materia";

        let titulo = document.createElement("h3");
        titulo.textContent = materia.nome;

        let descricao = document.createElement("p");
        descricao.textContent = materia.descricao;

        item.appendChild(titulo);
        item.appendChild(descricao);

        if (materia.link) {

            let link = document.createElement("a");
            link.href = materia.link;
            link.textContent = "Abrir material de estudo";
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            item.appendChild(link);
        }

        let excluir = document.createElement("button");
        excluir.textContent = "Excluir";

        excluir.onclick = function() {

            materias = materias.filter(
                m => m.id !== materia.id
            );

            salvarMaterias();
            mostrarMaterias();
        };

        item.appendChild(excluir);

        lista.appendChild(item);

    });
}

// Carregar matérias ao abrir o site
mostrarMaterias();

// ==============================
// PAINEL DE DESEMPENHO
// ==============================

function atualizarPainel() {

    // Quantidade de tarefas
    let total = tarefas.length;

    // Tarefas concluídas
    let concluidas = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    // Tarefas pendentes
    let pendentes = total - concluidas;

    // Quantidade de matérias
    let totalDeMaterias = materias.length;

    // Calcular porcentagem
    let porcentagem = total === 0
        ? 0
        : Math.round((concluidas / total) * 100);

    // Atualizar informações na tela
    document.getElementById("totalTarefas").textContent = total;

    document.getElementById("tarefasConcluidas").textContent = concluidas;

    document.getElementById("tarefasPendentes").textContent = pendentes;

    document.getElementById("totalMaterias").textContent = totalDeMaterias;

    // Atualizar barra de progresso
    document.getElementById("barraProgresso").style.width =
        porcentagem + "%";

    document.getElementById("textoProgresso").textContent =
        porcentagem + "% concluído";
}

// Atualizar painel ao abrir o site
atualizarPainel();
