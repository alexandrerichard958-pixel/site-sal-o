
const WHATSAPP_NUMBER = "5511988022311";

const form = document.getElementById("form-agendamento");
const campoData = document.getElementById("data");
const campoHora = document.getElementById("hora");
const campoServico = document.getElementById("servico");
const campoTelefone = document.getElementById("telefone");
const botaoWhatsApp = document.getElementById("whatsapp-flutuante");

// Impede escolher datas anteriores a hoje.
const agora = new Date();
const hoje = [
  agora.getFullYear(),
  String(agora.getMonth() + 1).padStart(2, "0"),
  String(agora.getDate()).padStart(2, "0")
].join("-");

campoData.min = hoje;

// Monta horários de 30 em 30 minutos.
// Horário de funcionamento configurado: 09h às 20h.
// Aos sábados, até 18h. Domingo fechado.
function atualizarHorarios() {
  const dataSelecionada = campoData.value;

  campoHora.innerHTML = '<option value="">Selecione um horário</option>';

  if (!dataSelecionada) {
    campoHora.innerHTML = '<option value="">Escolha a data primeiro</option>';
    return;
  }

  const dia = new Date(dataSelecionada + "T12:00:00").getDay();

  if (dia === 0) {
    campoHora.innerHTML = '<option value="">Fechado aos domingos</option>';
    return;
  }

  const horaFinal = dia === 6 ? 18 : 20;

  for (let hora = 9; hora < horaFinal; hora++) {
    for (const minuto of [0, 30]) {
      const valor = String(hora).padStart(2, "0") + ":" +
        String(minuto).padStart(2, "0");

      const opcao = document.createElement("option");
      opcao.value = valor;
      opcao.textContent = valor;
      campoHora.appendChild(opcao);
    }
  }
}

campoData.addEventListener("change", atualizarHorarios);

// Permite selecionar um serviço diretamente nos cartões.
document.querySelectorAll(".escolher-servico").forEach((botao) => {
  botao.addEventListener("click", () => {
    campoServico.value = botao.dataset.servico;
    document.getElementById("agendamento").scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Link do botão flutuante do WhatsApp.
botaoWhatsApp.href =
  "https://wa.me/" + WHATSAPP_NUMBER +
  "?text=" + encodeURIComponent("Olá! Gostaria de consultar os horários da Barbearia Rodrigues.");

// Envia o pedido de agendamento para o WhatsApp.
form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const telefone = campoTelefone.value.trim();
  const servico = campoServico.value;
  const data = campoData.value;
  const hora = campoHora.value;

  const telefoneLimpo = telefone.replace(/\D/g, "");

  if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
    alert("Digite um telefone válido com DDD.");
    campoTelefone.focus();
    return;
  }

  if (!nome || !servico || !data || !hora) {
    alert("Preencha todos os campos para continuar.");
    return;
  }

  const dataFormatada = data.split("-").reverse().join("/");

  const mensagem =
    "Olá! Gostaria de solicitar um agendamento na Barbearia Rodrigues.\n\n" +
    "Nome: " + nome + "\n" +
    "Telefone: " + telefone + "\n" +
    "Serviço: " + servico + "\n" +
    "Data desejada: " + dataFormatada + "\n" +
    "Horário desejado: " + hora + "\n\n" +
    "Aguardo a confirmação do horário. Obrigado!";

  const link =
    "https://wa.me/" + WHATSAPP_NUMBER +
    "?text=" + encodeURIComponent(mensagem);

  window.open(link, "_blank", "noopener,noreferrer");
});
