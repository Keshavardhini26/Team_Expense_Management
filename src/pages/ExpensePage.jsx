import { useContext } from 'react';
import ApprovalWidget from '../components/expense/ApprovalWidget';
import ExpenseForm from '../components/expense/ExpenseForm';
import ExpenseList from '../components/expense/ExpenseList';
import { AppContext } from '../context/AppContext';

const ExpensePage = () => {
  const { expenses, setExpenses, tripLocked, addHistoryEvent } = useContext(AppContext);

  const addExpense = (expense) => {
    setExpenses((prev) => [expense, ...prev]);
    addHistoryEvent('Expense Submitted', `${expense.title} submitted for Rs. ${expense.amount}.`);
  };

  const updateStatus = (expenseId, status) => {
    setExpenses((prev) =>
      prev.map((item) => (item.id === expenseId ? { ...item, status } : item))
    );
    addHistoryEvent('Expense Status Updated', `Expense #${expenseId} moved to ${status}.`);
  };

  return (
    <div className="stack-gap-lg">
      <div className="page-header">
        <h1>Expense Workflow</h1>
        <span className="badge">{tripLocked ? 'Trip Locked' : 'Trip Active'}</span>
      </div>
      <div className="grid-two">
        <ExpenseForm onAddExpense={addExpense} disabled={tripLocked} />
        <ApprovalWidget expenses={expenses} onUpdateStatus={updateStatus} />
      </div>
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default ExpensePage;
