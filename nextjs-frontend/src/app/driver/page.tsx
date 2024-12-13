import { MapDriver } from './MapDriver';
import { RouteModel } from '@/utils/models';
import { StartRouteForm } from './StartRouteForm';

export async function getRoutes() {
  const response = await fetch(`${process.env.NEST_API_URL}/routes`, {
    cache: 'force-cache',
    next: {
      tags: ['routes'],
    },
  });

  return response.json();
}

export async function getRoute(route_id: string): Promise<RouteModel> {
  const response = await fetch(
    `${process.env.NEST_API_URL}/routes/${route_id}`,
    {
      cache: 'force-cache',
      next: {
        tags: [`routes-${route_id}`, 'routes'],
      },
    }
  );
  return response.json();
}

export default async function DriverPage() {
  const routes = await getRoutes();

  return (
    <div className="flex flex-1 w-full h-screen">
      <div className="w-1/3 p-2 h-full">
        <h4 className="text-3xl text-contrast mb-2">Inicie uma rota</h4>

        <div className="flex flex-col">
          <StartRouteForm>
            <select
              id="route_id"
              name="route_id"
              className="mb-2 p-2 border rounded bg-default text-contrast"
            >
              <option key="0" value="">
                Selecione uma rota
              </option>

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
          </StartRouteForm>
        </div>
      </div>

      <MapDriver routeIdElementId={'route_id'} />
    </div>
  );
}
