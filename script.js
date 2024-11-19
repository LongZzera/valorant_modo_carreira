// Variáveis iniciais do jogador
let popularity = 50;
let skill = 50;
let money = 500;
let stress = 0;
let points = 0;

// Ranking inicial com jogadores
const players = [
  { name: "Lucas Ferreira", points: 150 },
  { name: "Amanda Souza", points: 120 },
  { name: "Carlos Lima", points: 100 },
  { name: "Você", points: 0 },
  { name: "João Silva", points: 80 },
  { name: "Maria Oliveira", points: 70 },
  { name: "Renato Santos", points: 65 },
  { name: "Ana Costa", points: 60 },
  { name: "Paulo Almeida", points: 55 },
  { name: "Beatriz Rocha", points: 50 },
  { name: "Gabriel Mendes", points: 45 },
  { name: "Larissa Ribeiro", points: 40 },
  { name: "Felipe Barbosa", points: 35 },
];

// Atualiza os status
function updateStatus() {
  document.getElementById('popularity').textContent = popularity;
  document.getElementById('skill').textContent = skill;
  document.getElementById('money').textContent = money;
  document.getElementById('stress').textContent = stress;
  document.getElementById('points').textContent = points;
}

// Atualiza a tabela de ranking
function updateRanking() {
  players.find(player => player.name === "Você").points = points;
  players.sort((a, b) => b.points - a.points);

  const rankingTable = document.getElementById('ranking-table');
  rankingTable.innerHTML = "";

  players.forEach((player, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${player.name}</td>
      <td>${player.points}</td>
    `;
    rankingTable.appendChild(row);
  });
}

// Funções das ações
function train() {
  if (money >= 50) {
    skill += Math.floor(Math.random() * 10) + 5;
    stress += 10;
    money -= 50;
    points += Math.floor(skill / 5);
    showFeedback("Você treinou e aumentou sua habilidade!");
  } else {
    showFeedback("Você não tem dinheiro suficiente para treinar.");
  }
  checkStress();
  updateStatus();
  updateRanking();
}

function playMatch() {
  if (stress >= 80) {
    showFeedback("Você está muito estressado para jogar bem. Descanse primeiro!");
    return;
  }

  const matchResult = Math.random() > 0.5 ? "win" : "lose";

  if (matchResult === "win") {
    popularity += Math.floor(Math.random() * 15) + 10;
    money += 200;
    points += Math.floor(skill / 2);
    showFeedback("Você ganhou a partida! Popularidade e pontos aumentaram.");
  } else {
    popularity -= Math.floor(Math.random() * 10) + 5;
    showFeedback("Você perdeu a partida. Tente melhorar suas habilidades.");
  }

  stress += 15;
  checkStress();
  updateStatus();
  updateRanking();
}

function rest() {
  stress -= Math.floor(Math.random() * 20) + 10;
  if (stress < 0) stress = 0;
  showFeedback("Você descansou e se sente mais relaxado.");
  updateStatus();
}

function seekSponsorship() {
  if (popularity > 60) {
    money += Math.floor(Math.random() * 500) + 200;
    showFeedback("Um patrocinador ofereceu dinheiro para você!");
  } else {
    showFeedback("Você ainda não é popular o suficiente para patrocínios.");
  }
  updateStatus();
}

function joinTournament() {
  if (money >= 100) {
    money -= 100;
    const tournamentResult = Math.random() > 0.7 ? "win" : "lose";

    if (tournamentResult === "win") {
      popularity += Math.floor(Math.random() * 30) + 20;
      skill += Math.floor(Math.random() * 10) + 5;
      money += 1000;
      points += 100;
      showFeedback("Você venceu o torneio e ganhou muitos pontos!");
    } else {
      popularity -= Math.floor(Math.random() * 15) + 10;
      showFeedback("Você perdeu o torneio. Treine mais para vencer!");
    }
  } else {
    showFeedback("Você não tem dinheiro suficiente para entrar no torneio.");
  }
  updateStatus();
  updateRanking();
}

function manageSocialMedia() {
  popularity += Math.floor(Math.random() * 10) + 5;
  money -= 20;
  points += Math.floor(popularity / 10);
  showFeedback("Você gerenciou suas redes sociais e ganhou mais seguidores!");
  updateStatus();
  updateRanking();
}

// Verifica estresse
function checkStress() {
  if (stress >= 100) {
    skill -= 10;
    popularity -= 10;
    showFeedback("Você está muito estressado e perdeu desempenho!");
    stress = 80;
  }
}

// Mostra feedback
function showFeedback(message) {
  const feedback = document.getElementById('feedback-text');
  feedback.textContent = message;
  setTimeout(() => {
    feedback.textContent = "";
  }, 3000);
}

// Adiciona eventos aos botões
document.getElementById('train-btn').addEventListener('click', train);
document.getElementById('play-btn').addEventListener('click', playMatch);
document.getElementById('rest-btn').addEventListener('click', rest);
document.getElementById('sponsor-btn').addEventListener('click', seekSponsorship);
document.getElementById('tournament-btn').addEventListener('click', joinTournament);
document.getElementById('social-btn').addEventListener('click', manageSocialMedia);

// Atualiza a pontuação dos outros jogadores
setInterval(() => {
  players.forEach(player => {
    if (player.name !== "Você") {
      const change = Math.floor(Math.random() * 11) - 5;
      player.points = Math.max(0, player.points + change);
    }
  });
  updateRanking();
}, 5000);

// Inicialização
updateStatus();
updateRanking();
