import axios from 'axios';
import { prisma } from '@/app/_lib/prisma';

const API_KEY = process.env.API_FOOTBALL_KEY;
const LEAGUE_ID = 71;
const SEASON = 2023;

if (!API_KEY) {
  throw new Error('Defina a variável de ambiente API_FOOTBALL_KEY no .env');
}

async function syncTeams() {
  try {
    const response = await axios.get('https://v3.football.api-sports.io/teams', {
      params: { league: LEAGUE_ID, season: SEASON },
      headers: { 'x-apisports-key': API_KEY },
    });

    const teams = response.data.response;

    console.log(`🔹 Total de times recebidos da API: ${teams.length}`);

    for (const t of teams) {
      const teamData = {
        apiId: t.team.id,
        name: t.team.name,
        shortName: t.team.code,
        country: t.team.country,
        logo: t.team.logo,
      };

      if (!teamData.apiId) {
        console.warn(`❌ Pulando time sem apiId: ${t.team.name}`);
        continue;
      }

      console.log('🔹 Inserindo/atualizando:', teamData);

      await prisma.team.upsert({
        where: { apiId: teamData.apiId },
        create: teamData,
        update: teamData,
      });

      console.log(`✅ ${teamData.name} sincronizado`);
    }

    console.log('🎉 Todos os times sincronizados com sucesso!');
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('❌ Erro na API:', error.response?.data || error.message);
    } else if (error instanceof Error) {
      console.error('❌ Erro:', error.message);
    } else {
      console.error('❌ Erro desconhecido', error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

syncTeams();
