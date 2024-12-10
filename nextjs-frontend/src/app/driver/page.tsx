import { MapDriver } from './MapDriver';
import { RouteModel } from '@/utils/models';

export async function getRoutes() {
  const response = await fetch('http://localhost:3000/routes', {
    cache: 'force-cache',
    next: {
      tags: ['routes'],
    },
  });

  return response.json();
}

export default async function DriverPage() {
  const routes = await getRoutes();

  return (
    <div className="flex flex-1 w-full h-screen">
      <div className="w-1/3 p-2 h-full">
        <h4 className="text-3xl text-contrast mb-2">Inicie uma rota</h4>

        <div className="flex flex-col">
          <form className="flex flex-col space-y-4">
            <select className="mb-2 p-2 border rounded bg-default text-contrast">
              {routes.map((route: RouteModel) => (
                <option key={route.id} value={route.id}>
                  {route.name}
                </option>
              ))}
            </select>

            <button
              className="bg-main text-primary p-2 rounded text-xl font-bold hover:bg-main/85 transition-colors duration-200"
              style={{ width: '100%' }}
            >
              Iniciar a viagem
            </button>
          </form>
        </div>
      </div>

      <MapDriver />
    </div>
  );
}
