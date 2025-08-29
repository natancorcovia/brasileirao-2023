import Header from './_components/Header';

export default function Home() {
  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="mb-4 text-xl font-bold">Estatísticas Brasileirão Série A</h2>
        <p className="font-medium">
          Acompanhe elencos completos e estatísticas da Série A do Campeonato Brasileiro de 2023.
        </p>
      </div>
    </div>
  );
}
