import Link from 'next/link';
import Header from './_components/Header';
import { Button } from './_components/ui/button';
import { Card } from './_components/ui/card';

type Team = {
  id: number;
  name: string;
  logo: string;
};

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/teams`, {
    cache: 'no-store',
  });
  const teams: Team[] = await res.json();

  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="mb-4 text-xl font-bold">Brazilian Championship</h2>
        <p className="font-medium">
          Follow complete squads and statistics for the 2023 Brazilian Championship Series A.
        </p>
      </div>

      <div className="p-8">
        <h1 className="mb-6 text-2xl font-bold">Serie A Teams</h1>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {teams.map((team) => (
            <Card key={team.id} className="flex flex-col items-center rounded-xl bg-gray-800 p-4">
              {team.logo && <img src={team.logo} alt={team.name} className="mb-2 h-18 w-18" />}
              <Button asChild className="font-semibold" variant="ghost">
                <Link href={`/team/${team.id}`}>{team.name}</Link>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
