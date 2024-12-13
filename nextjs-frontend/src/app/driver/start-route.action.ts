'use server';

export type StartRouteActionResponse = {
  error?: string;
  success?: boolean;
};

export async function startRouteAction(
  state: StartRouteActionResponse | null,
  formData: FormData
): Promise<StartRouteActionResponse> {
  const { route_id } = Object.fromEntries(formData);

  if (!route_id) {
    return { error: 'Route ID is required' };
  }

  const response = await fetch(
    `${process.env.NEST_API_URL}/routes/${route_id}/start`,
    {
      method: 'POST',
    }
  );

  if (!response.ok) {
    console.error(await response.text());
    return { error: 'Failed to start route' };
  }

  return { success: true };
}