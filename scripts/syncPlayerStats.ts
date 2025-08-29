import fetch from 'node-fetch';

const matchId = 1; // teste com uma partida específica
const season = 2023;
const league = 71; // Brasileirão Série A

async function testMatch() {
  const response = await fetch(
    `https://api-football.com/demo/api/v3/fixtures?id=${matchId}&season=${season}&league=${league}`,
    {
      headers: { 'x-apisports-key': process.env.API_KEY || '' },
    }
  );
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

testMatch();
