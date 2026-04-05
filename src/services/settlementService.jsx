import api from './api';
import { mockSettlements } from '../utils/constants';

export const settlementService = {
  getSettlements: async () => api.get(mockSettlements),
  markPaid: async (settlementId) => api.patch({ settlementId, status: 'PAID' })
};
