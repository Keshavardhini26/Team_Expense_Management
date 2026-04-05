import { createContext, useMemo, useState } from 'react';
import {
  mockBudgets,
  mockExpenses,
  mockGroups,
  mockHistory,
  mockNotifications,
  mockSettlements
} from '../utils/constants';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [groups, setGroups] = useState(mockGroups);
  const [expenses, setExpenses] = useState(mockExpenses);
  const [budgets, setBudgets] = useState(mockBudgets);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [history, setHistory] = useState(mockHistory);
  const [settlements, setSettlements] = useState(mockSettlements);
  const [tripLocked, setTripLocked] = useState(false);

  const addHistoryEvent = (event, details, actor = 'You') => {
    setHistory((prev) => [
      {
        id: Date.now(),
        event,
        actor,
        details,
        time: new Date().toISOString()
      },
      ...prev
    ]);
  };

  const value = useMemo(
    () => ({
      groups,
      setGroups,
      expenses,
      setExpenses,
      budgets,
      setBudgets,
      notifications,
      setNotifications,
      history,
      addHistoryEvent,
      settlements,
      setSettlements,
      tripLocked,
      setTripLocked
    }),
    [groups, expenses, budgets, notifications, history, settlements, tripLocked]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
