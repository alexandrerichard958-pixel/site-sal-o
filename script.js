
const formulario = document.getElementById("formAgendamento");
const mensagem = document.getElementById("mensagem");

formulario.addEventListener("submit", function(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const data = document.getElementById("data").value;
  const horario = document.getElementById("horario").value;

  if (!nome || !data || !horario) {
    mensagem.textContent = "Preencha todos os campos!";
    return;
  }

  // Impede escolher uma data passada.
  const dataEscolhida = new Date(data + "T00:00:00");
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  if (dataEscolhida < hoje) {
    mensagem.textContent = "Escolha uma data de hoje em diante.";
    return;
  }

  // Formata a data para dia/mês/ano.
  const partesData = data.split("-");
  const dataFormatada =
    partesData[2] + "/" + partesData[1] + "/" + partesData[0];

  // Mensagem que será enviada pelo WhatsApp.
  const texto =
    "Olá! Gostaria de solicitar um agendamento no Nosso Salão.\n\n" +
    "Nome: " + nome + "\n" +
    "Data: " + dataFormatada + "\n" +
    "Horário: " + horario + "\n\n" +
    "Aguardo a confirmação. Obrigado(a)!";

  // Número do WhatsApp do salão: código do Brasil + DDD + número.
  const telefone = "5511988022311";

  const link =
    "https://wa.me/" + telefone +
    "?text=" + encodeURIComponent(texto);

  mensagem.textContent = "Abrindo o WhatsApp para enviar seu pedido...";

  // Abre o WhatsApp na mesma aba para evitar bloqueio do navegador.
  window.location.href = link;
});
