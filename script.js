document.addEventListener('DOMContentLoaded', carregarAgendamentos);

document.getElementById('form-agendamento').addEventListener('submit', function(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const dataVisita = document.getElementById('data-visita').value;
  const endereco = document.getElementById('endereco').value;

  const agendamento = {
    nome,
    email,
    dataVisita,
    endereco
  };

  salvarAgendamento(agendamento);

  document.getElementById('form-agendamento').reset();
});

function carregarAgendamentos() {
  const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
  const tabela = document.getElementById('tabela-agendamentos').getElementsByTagName('tbody')[0];
  tabela.innerHTML = ''; 

  agendamentos.forEach(function(agendamento) {
    const row = tabela.insertRow();
    row.innerHTML = `
      <td>${agendamento.nome}</td>
      <td>${agendamento.email}</td>
      <td>${formatarData(agendamento.dataVisita)}</td>
      <td>${agendamento.endereco}</td>
    `;
  });
}

function salvarAgendamento(agendamento) {
  const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
  agendamentos.push(agendamento);
  localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

  carregarAgendamentos();
}

function formatarData(data) {
  const date = new Date(data);
  const opcoes = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return date.toLocaleDateString('pt-BR', opcoes);
}