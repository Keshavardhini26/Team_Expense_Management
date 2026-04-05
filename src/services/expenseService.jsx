import api from './api';
import { mockExpenses } from '../utils/constants';

export const expenseService = {
  getExpenses: async () => api.get(mockExpenses),
  addExpense: async (expense) => api.post(expense),
  updateStatus: async ({ expenseId, status }) => api.patch({ expenseId, status })
};
