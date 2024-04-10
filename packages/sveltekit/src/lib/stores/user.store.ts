import type { UserResponse } from '$entities/user.entity';
import userApi from '$lib/utils/api/user.api';
import { writable, type Writable } from 'svelte/store';

export type UserStore = {
  user: UserResponse | undefined;
};

const store: Writable<UserStore> = writable({ user: undefined });

const getUser = async () => {
  store.set({ user: await userApi.getMe() });
};

export default {
  ...store,
  getUser,
};
