import { createContext, useEffect, useMemo, useState } from 'react';
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
  const [theme, setTheme] = useState(() => {
    const savedTheme = typeof window !== 'undefined' ? window.localStorage.getItem('tems-theme') : null;

    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    const prefersDark = typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = theme;
    }

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('tems-theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

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
      setTripLocked,
      theme,
      setTheme,
      toggleTheme
    }),
    [groups, expenses, budgets, notifications, history, settlements, tripLocked, theme]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
