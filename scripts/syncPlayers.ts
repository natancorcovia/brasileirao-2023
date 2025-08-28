import { PrismaClient } from '../src/generated/prisma';
import axios from 'axios';

const prisma = new PrismaClient();

const API_KEY = process.env.API_FOOTBALL_KEY;

async function main() {
  const teams = await prisma.team.findMany();

  for (const team of teams) {
    if (!team.apiId) continue;

    console.log(`➡️ Buscando jogadores do ${team.name}`);

    try {
      const response = await axios.get('https://v3.football.api-sports.io/players', {
        headers: {
          'x-apisports-key': API_KEY!,
        },
        params: {
          team: team.apiId,
          season: 2023,
        },
      });

      const players = response.data.response;

      for (const p of players) {
        await prisma.player.upsert({
          where: { apiId: p.player.id },
          update: {
            name: p.player.name,
            position: p.statistics[0]?.games.position,
            number: p.player.number,
            nationality: p.player.nationality,
            teamId: team.id,
          },
          create: {
            apiId: p.player.id,
            name: p.player.name,
            position: p.statistics[0]?.games.position,
            number: p.player.number,
            nationality: p.player.nationality,
            teamId: team.id,
          },
        });
      }

      console.log(`✅ Jogadores do ${team.name} salvos!`);
    } catch (error) {
      console.error(`❌ Erro ao buscar jogadores do ${team.name}`, error);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
