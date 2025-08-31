import { prisma } from '@/app/_lib/prisma';
import { notFound } from 'next/navigation';

interface TeamPageProps {
  params: { id: string };
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { id } = params;

  const team = await prisma.team.findUnique({
    where: { id: Number(id) },
    include: {
      players: true,
    },
  });

  if (!team) {
    return notFound();
  }

  return (
    <div>
      <h1>{team.name}</h1>
      <h2 className="mb-2 text-2xl font-semibold">Jogadores:</h2>
      {team.players.length === 0 ? (
        <p>Nenhum jogador cadastrado.</p>
      ) : (
        <ul className="list-inside list-disc">
          {team.players.map((player) => (
            <li key={player.id}>
              <p className="font-semibold">{player.name}</p>
              <p>Posição: {player.position}</p>
              <p>Nacionalidade: {player.nationality}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
