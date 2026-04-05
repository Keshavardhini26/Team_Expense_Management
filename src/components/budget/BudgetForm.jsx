import { useState } from 'react';
import { BUDGET_CATEGORIES } from '../../utils/constants';

const BudgetForm = ({ onSave }) => {
  const [form, setForm] = useState({ category: BUDGET_CATEGORIES[0], limit: '' });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.limit) return;

    onSave({
      id: Date.now(),
      groupId: 1,
      category: form.category,
      limit: Number(form.limit),
      spent: 0
    });
    setForm((prev) => ({ ...prev, limit: '' }));
  };

  return (
    <form className="content-card panel-pad stack-gap" onSubmit={onSubmit}>
      <h3>Set Category Budget</h3>
      <select
        className="select"
        value={form.category}
        onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
      >
        {BUDGET_CATEGORIES.map((category) => (
          <option key={category}>{category}</option>
        ))}
      </select>
      <input
        className="input"
        type="number"
        placeholder="Budget limit"
        value={form.limit}
        onChange={(e) => setForm((prev) => ({ ...prev, limit: e.target.value }))}
      />
      <button className="btn btn-primary" type="submit">
        Save Budget
      </button>
    </form>
  );
};

export default BudgetForm;
