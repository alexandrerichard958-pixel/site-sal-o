
const formulario = document.getElementById("formAgendamento");
const mensagem = document.getElementById("mensagem");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const data = document.getElementById("data").value;
    const horario = document.getElementById("horario").value;

    if (nome === "" || data === "" || horario === "") {
        mensagem.textContent = "Preencha todos os campos!";
        return;
    }

    const dataEscolhida = new Date(data + "T00:00:00");
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (dataEscolhida < hoje) {
        mensagem.textContent = "Escolha uma data de hoje em diante.";
        return;
    }

    mensagem.innerHTML = "";

    const titulo = document.createElement("strong");
    titulo.textContent = "Agendamento solicitado com sucesso!";

    const detalheNome = document.createElement("p");
    detalheNome.textContent = "Nome: " + nome;

    const detalheData = document.createElement("p");
    detalheData.textContent = "Data: " + data.split("-").reverse().join("/");

    const detalheHorario = document.createElement("p");
    detalheHorario.textContent = "Horário: " + horario;

    mensagem.append(
        titulo,
        detalheNome,
        detalheData,
        detalheHorario
    );

    formulario.reset();
});

const formulario = document.getElementById("formAgendamento");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const data = document.getElementById("data").value;
  const horario = document.getElementById("horario").value;

  if (!nome || !data || !horario) {
    alert("Preencha todos os campos!");
    return;
  }

  const dataFormatada = data.split("-").reverse().join("/");

  const mensagem =
    "Olá! Gostaria de fazer um agendamento no salão.\n\n" +
    "Nome: " + nome + "\n" +
    "Data: " + dataFormatada + "\n" +
    "Horário: " + horario + "\n\n" +
    "Aguardo a confirmação!";

  const telefone = "5511988022311";
  const link =
    "https://wa.me/" + telefone +
    "?text=" + encodeURIComponent(mensagem);

  window.open(link, "_blank");
});
