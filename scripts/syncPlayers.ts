import { PrismaClient } from '../src/generated/prisma';
import axios from 'axios';

const prisma = new PrismaClient();
const API_KEY = process.env.API_FOOTBALL_KEY;

async function fetchPlayersByTeam(teamId: number, apiId: number) {
  // Pegar todos os apiIds já salvos desse time
  const existingPlayers = await prisma.player.findMany({
    where: { teamId },
    select: { apiId: true },
  });
  const existingApiIds = new Set(existingPlayers.map((p) => p.apiId));

  let page = 1;
  let totalPages = 1;

  do {
    try {
      const response = await axios.get('https://v3.football.api-sports.io/players', {
        headers: { 'x-apisports-key': API_KEY! },
        params: { team: apiId, season: 2023, page },
      });

      const players = response.data.response;
      totalPages = response.data.paging?.total ?? 1;

      for (const p of players) {
        if (existingApiIds.has(p.player.id)) continue; // já existe, pula

        // Filtra a estatística correta para este time
        const stats = p.statistics.find((s: any) => s.team.id === apiId);
        if (!stats) continue; // jogador não pertence a este time nesta temporada

        await prisma.player.create({
          data: {
            apiId: p.player.id,
            name: p.player.name,
            position: stats.games.position ?? null,
            number: p.player.number ?? null,
            nationality: p.player.nationality ?? null,
            teamId,
          },
        });
      }

      console.log(`✅ Time ${teamId}: página ${page}/${totalPages} concluída`);
      page++;
    } catch (err) {
      console.error(`❌ Erro ao buscar página ${page} do time ${teamId}:`, err);
      await new Promise((res) => setTimeout(res, 2000)); // espera antes de tentar de novo
    }
  } while (page <= totalPages);
}

async function main() {
  const teams = await prisma.team.findMany();

  for (const team of teams) {
    if (!team.apiId) continue;

    console.log(`➡️ Iniciando download de jogadores do ${team.name}`);
    await fetchPlayersByTeam(team.id, team.apiId);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
