import { prisma } from '@/app/_lib/prisma';
import { notFound } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/_components/ui/table';
import Image from 'next/image';

interface TeamPageProps {
  params: { id: string };
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { id } = params;

  const team = await prisma.team.findUnique({
    where: { id: Number(id) },
    include: { players: true },
  });

  if (!team) return notFound();

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex items-center">
        {team.logo && (
          <Image
            src={team.logo}
            alt={`${team.name} logo`}
            width={60}
            height={60}
            className="mr-4"
          />
        )}
        <h1 className="text-4xl font-bold">{team.name}</h1>
      </div>

      {team.players.length === 0 ? (
        <p className="text-muted-foreground">No players registered in the API.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Nationality</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {team.players.map((player) => (
              <TableRow key={player.id}>
                <TableCell className="font-medium">{player.name}</TableCell>
                <TableCell>{player.position}</TableCell>
                <TableCell>{player.nationality}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
