import api from './api';
import { mockUser } from '../utils/constants';

export const userService = {
  getProfile: async () => api.get(mockUser)
};
