import { PrismaClient } from '../src/generated/prisma';
import axios from 'axios';

const prisma = new PrismaClient();
const API_KEY = process.env.API_FOOTBALL_KEY;

async function main() {
  const response = await axios.get('https://v3.football.api-sports.io/fixtures', {
    headers: {
      'x-apisports-key': API_KEY!,
    },
    params: {
      league: 71,
      season: 2023,
    },
  });

  const fixtures = response.data.response;

  for (const f of fixtures) {
    // Buscar os times no banco pelo apiId
    const homeTeam = await prisma.team.findFirst({ where: { apiId: f.teams.home.id } });
    const awayTeam = await prisma.team.findFirst({ where: { apiId: f.teams.away.id } });

    if (!homeTeam || !awayTeam) continue;

    await prisma.match.upsert({
      where: { apiId: f.fixture.id },
      update: {
        date: new Date(f.fixture.date),
        homeScore: f.goals.home,
        awayScore: f.goals.away,
        homeTeamId: homeTeam.id,
        awayTeamId: awayTeam.id,
      },
      create: {
        apiId: f.fixture.id,
        date: new Date(f.fixture.date),
        homeScore: f.goals.home,
        awayScore: f.goals.away,
        homeTeamId: homeTeam.id,
        awayTeamId: awayTeam.id,
      },
    });

    console.log(`✅ Partida ${homeTeam.name} x ${awayTeam.name} salva!`);
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
