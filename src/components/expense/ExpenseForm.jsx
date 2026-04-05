import { useState } from 'react';
import { BUDGET_CATEGORIES } from '../../utils/constants';

const ExpenseForm = ({ onAddExpense, disabled }) => {
  const [form, setForm] = useState({
    title: '',
    amount: '',
    payer: '',
    category: BUDGET_CATEGORIES[0],
    groupId: 1
  });

  const onChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.amount || !form.payer) return;

    onAddExpense({
      ...form,
      id: Date.now(),
      amount: Number(form.amount),
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      objectionWindowHours: 24
    });

    setForm((prev) => ({ ...prev, title: '', amount: '', payer: '' }));
  };

  return (
    <form className="content-card panel-pad stack-gap" onSubmit={onSubmit}>
      <h3>Add Expense</h3>
      <input
        className="input"
        placeholder="Expense title"
        value={form.title}
        disabled={disabled}
        onChange={(e) => onChange('title', e.target.value)}
      />
      <input
        className="input"
        placeholder="Amount"
        type="number"
        value={form.amount}
        disabled={disabled}
        onChange={(e) => onChange('amount', e.target.value)}
      />
      <input
        className="input"
        placeholder="Paid by"
        value={form.payer}
        disabled={disabled}
        onChange={(e) => onChange('payer', e.target.value)}
      />
      <select
        className="select"
        value={form.category}
        disabled={disabled}
        onChange={(e) => onChange('category', e.target.value)}
      >
        {BUDGET_CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <button className="btn btn-primary" disabled={disabled} type="submit">
        Submit Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
