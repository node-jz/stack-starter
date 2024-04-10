import cookieStore from '$lib/stores/cookie.store';
export type QueryConfig = {
  joins?: string[];
  filters?: string[];
  others?: string[][];
};

export type GetSomeResponse<T> = { count: number; page: number; pageCount: number; total: number; data: T[] };
async function get<T = any>(path: string, useJwt = false, queryConfig: QueryConfig = {}): Promise<T> {
  const queryParams = queryConfig.others ?? [];
  if (queryConfig.joins && queryConfig.joins.length > 0) {
    queryParams.push(...queryConfig.joins.map((relation) => ['join', relation]));
  }
  if (queryConfig.filters && queryConfig.filters.length > 0) {
    queryParams.push(...queryConfig.filters.map((filter) => ['filter', filter]));
  }
  const params: URLSearchParams = new URLSearchParams(queryParams);

  const url = `${import.meta.env['VITE_API_URL']}`;
  const headers: Record<string, string> = {};
  if (useJwt) {
    headers['Authorization'] = `Bearer ${cookieStore.getJwt()}`;
  }
  const response = await fetch(`${url}/${path}${params.size > 0 ? '?' + params.toString() : ''}`, { headers: headers });

  if (!response.ok) {
    if (response.status == 401) {
      window.location.href = '/logout';
      throw new Error(`Unauthorized. Login required.`);
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  }
  return response.json();
}

async function getLimit<T = any>(
  path: string,
  useJwt = false,
  limit = 10,
  offset = 0,
  queryConfig: QueryConfig = {},
): Promise<GetSomeResponse<T>> {
  if (!queryConfig.others) {
    queryConfig.others = [];
  }
  queryConfig.others.push(['limit', limit.toString()], ['offset', offset.toString()]);
  return (await get<T>(path, useJwt, queryConfig)) as GetSomeResponse<T>;
}

async function post<T = any>(path: string, data: any, useJwt = false): Promise<T> {
  const url = `${import.meta.env['VITE_API_URL']}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (useJwt) {
    headers['Authorization'] = `Bearer ${cookieStore.getJwt()}`;
  }

  const response = await fetch(`${url}/${path}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(response.statusText, { cause: response.status });
  }
  return response.json();
}

async function hardDelete<T = any>(path: string, useJwt = false): Promise<boolean> {
  const url = `${import.meta.env['VITE_API_URL']}`;
  const headers: Record<string, string> = {};
  if (useJwt) {
    headers['Authorization'] = `Bearer ${cookieStore.getJwt()}`;
  }

  const response = await fetch(`${url}/${path}`, {
    method: 'DELETE',
    headers: headers,
  });

  if (response.status != 200) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return true;
}

async function patch<T = any>(path: string, data: any, useJwt = false): Promise<T> {
  const url = `${import.meta.env['VITE_API_URL']}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (useJwt) {
    headers['Authorization'] = `Bearer ${cookieStore.getJwt()}`;
  }

  const response = await fetch(`${url}/${path}`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}

// ... other functions ...

export { get, getLimit, post, patch, hardDelete };
