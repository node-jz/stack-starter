import { writable, type Writable } from 'svelte/store';

export type CookieStore = {
  jwt: string | undefined;
};
const store: Writable<CookieStore> = writable({
  jwt: undefined,
});

function getJwt() {
  const regex = new RegExp('jwt=([\\w.-]+)', 'ig');
  const match = regex.exec(document.cookie);
  if (match == null || match.length <= 1) {
    return null;
  }
  const jwt = match[1];
  store.update((store) => {
    store.jwt = jwt;
    return store;
  });
  return jwt;
}

function saveJwt(jwt: string, age: number = 60 * 60 * 24 * 90) {
  document.cookie = `jwt=${jwt}; path=/; max-age=${age}`;
  store.update((store) => {
    store.jwt = jwt;
    return store;
  });
  return jwt;
}

async function getUserFromCookie() {
  const jwt = getJwt();
  if (!jwt) {
    return null;
  }
  const host = await fetch(`${import.meta.env.VITE_API_URL}/user/me`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((r) => r.json())
    .catch((e) => {
      console.error(e);
      return null;
    });
  return host;
}

function clearCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}
export default {
  saveJwt: saveJwt,
  getJwt: getJwt,
  clearJwt: () => clearCookie('jwt'),
  getUserFromCookie: getUserFromCookie,
  ...store,
};
