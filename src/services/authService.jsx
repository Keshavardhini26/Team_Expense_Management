import api from './api';

const TOKEN_KEY = 'tems_auth_token';

const authService = {
  login: async (email, password) => {
    const fakeToken = btoa(`${email}:${password}`);
    localStorage.setItem(TOKEN_KEY, fakeToken);
    return api.post({ token: fakeToken });
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return api.post({ ok: true });
  },
  getToken: () => localStorage.getItem(TOKEN_KEY),
  isAuthenticated: () => Boolean(localStorage.getItem(TOKEN_KEY))
};

export default authService;
