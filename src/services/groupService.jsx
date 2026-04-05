import api from './api';
import { mockGroups } from '../utils/constants';

export const groupService = {
  getGroups: async () => api.get(mockGroups),
  createGroup: async (group) => api.post(group)
};
