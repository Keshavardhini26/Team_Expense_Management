import { useContext, useState } from 'react';
import ApprovalWidget from '../components/expense/ApprovalWidget';
import Modal from '../components/common/Modal';
import ExpenseForm from '../components/expense/ExpenseForm';
import ExpenseList from '../components/expense/ExpenseList';
import { AppContext } from '../context/AppContext';

const ExpensePage = () => {
  const { expenses, setExpenses, tripLocked, addHistoryEvent } = useContext(AppContext);
  const [objectionTarget, setObjectionTarget] = useState(null);
  const [objectionReason, setObjectionReason] = useState('');

  const pendingExpenses = expenses.filter((item) => item.status === 'PENDING');
  const approvedExpenses = expenses.filter((item) => item.status === 'APPROVED');
  const objectedExpenses = expenses.filter(
    (item) => item.status === 'OBJECTED' || item.status === 'DISPUTED'
  );

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

  const openObjection = (expense) => {
    setObjectionTarget(expense);
    setObjectionReason(expense.objectionReason || '');
  };

  const closeObjection = () => {
    setObjectionTarget(null);
    setObjectionReason('');
  };

  const submitObjection = (e) => {
    e.preventDefault();

    if (!objectionTarget || !objectionReason.trim()) return;

    const objectionRaisedAt = new Date().toISOString();

    setExpenses((prev) =>
      prev.map((item) =>
        item.id === objectionTarget.id
          ? {
              ...item,
              status: 'OBJECTED',
              objectionReason: objectionReason.trim(),
              objectionRaisedAt
            }
          : item
      )
    );

    addHistoryEvent(
      'Expense Objection Raised',
      `${objectionTarget.title} was objected with reason: ${objectionReason.trim()}`
    );

    closeObjection();
  };

  return (
    <div className="stack-gap-lg">
      <div className="page-header">
        <h1>Expense Workflow</h1>
        <span className="badge">{tripLocked ? 'Trip Locked' : 'Trip Active'}</span>
      </div>
      <div className="grid-two">
        <ExpenseForm onAddExpense={addExpense} disabled={tripLocked} />
        <ApprovalWidget
          expenses={pendingExpenses}
          onUpdateStatus={updateStatus}
          onRaiseObjection={openObjection}
        />
      </div>
      <ExpenseList
        title="Approved Expenses"
        expenses={approvedExpenses}
        emptyMessage="No approved expenses yet."
      />
      <ExpenseList
        title="Objected Expenses"
        expenses={objectedExpenses}
        emptyMessage="No objections raised yet."
      />

      <Modal open={Boolean(objectionTarget)} title="Raise Objection" onClose={closeObjection}>
        <form className="stack-gap" onSubmit={submitObjection}>
          <div className="objected-summary content-card panel-pad">
            <strong>{objectionTarget?.title}</strong>
            <p>{objectionTarget ? `Rs. ${objectionTarget.amount} paid by ${objectionTarget.payer}` : ''}</p>
          </div>
          <label className="stack-gap objection-field">
            <span>Reason for the objection</span>
            <textarea
              className="textarea"
              rows="4"
              placeholder="Explain what is wrong with this expense so the team can review it"
              value={objectionReason}
              onChange={(e) => setObjectionReason(e.target.value)}
              required
            />
          </label>
          <div className="row-gap">
            <button className="btn btn-primary" type="submit">
              Submit Objection
            </button>
            <button className="btn btn-muted" type="button" onClick={closeObjection}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ExpensePage;
