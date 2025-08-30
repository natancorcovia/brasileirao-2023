import Header from './_components/Header';

type Team = {
  id: number;
  name: string;
  shortName?: string;
  country?: string;
  logo?: string;
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
        <h2 className="mb-4 text-xl font-bold">Estatísticas Campeonato Brasileiro</h2>
        <p className="font-medium">
          Acompanhe elencos completos e estatísticas da Série A do Campeonato Brasileiro de 2023.
        </p>
      </div>

      <div className="p-8">
        <h1 className="mb-6 text-2xl font-bold">Times da Série A</h1>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {teams.map((team) => (
            <div key={team.id} className="flex flex-col items-center rounded-xl p-4">
              {team.logo && <img src={team.logo} alt={team.name} className="mb-2 h-16 w-16" />}
              <span className="font-semibold">{team.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
