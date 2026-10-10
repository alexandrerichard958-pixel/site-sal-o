
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
    "https://wa.me/" +
    telefone +
    "?text=" +
    encodeURIComponent(mensagem);

  window.open(link, "_blank");
});
