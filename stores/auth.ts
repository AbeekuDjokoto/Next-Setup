import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

import { LoginCredentials, RegisterCredentials, UserDetails } from '@/types';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface State {
  user: UserDetails | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  redirect: string;
  type: string;
  loginCredentials: LoginCredentials | null;
  registerCredentials: RegisterCredentials | null;
}

type Token = {
  accessToken: string | null;
  refreshToken: string | null;
};

interface Store extends State {
  reset: () => void;
  authenticate: (token: Token) => void;
  // eslint-disable-next-line no-unused-vars
  setRedirect: (redirect: string) => void;
  // eslint-disable-next-line no-unused-vars
  setUser: (user: any) => void;
  getToken: () => State['accessToken'];
  getUserType: () => State['type'];
  setToken: (newToken: string) => void;
  setLoginCredentials: (credentials: LoginCredentials) => void;
  getLoginCredentials: () => State['loginCredentials'];
  setRegisterCredentials: (credentials: RegisterCredentials) => void;
  getRegisterCredentials: () => State['registerCredentials'];
}

const initialState: State = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  redirect: '/',
  type: 'USER',
  loginCredentials: null,
  registerCredentials: null,
};

const authStore: StateCreator<Store> = (set, get) => ({
  ...initialState,
  reset: () => set(initialState),
  authenticate: (token: Token) => {
    set({
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
      isAuthenticated: true,
      type: token.accessToken ? jwtDecode<JwtPayload | any>(token.accessToken)?.type : 'USER',
    });
  },
  setUser: (user) => set({ user }),
  setRedirect: (redirect: string) => set({ redirect }),
  getToken: () => get().accessToken,
  getUserType: () => get().type,
  setToken: (newToken: string) => set({ accessToken: newToken }),
  setLoginCredentials: (loginCredentials) => set({ loginCredentials: loginCredentials }),
  getLoginCredentials: () => get().loginCredentials,
  setRegisterCredentials: (registerCredentials) =>
    set({ registerCredentials: registerCredentials }),
  getRegisterCredentials: () => get().registerCredentials,
});

const useAuthStore = create(persist(authStore, { name: 'ownkey-web-auth-store' }));

export { useAuthStore };
