import { useContext } from 'react';
import BudgetForm from '../components/budget/BudgetForm';
import BudgetMeter from '../components/budget/BudgetMeter';
import { AppContext } from '../context/AppContext';

const BudgetPage = () => {
  const { budgets, setBudgets, addHistoryEvent } = useContext(AppContext);

  const onSaveBudget = (budget) => {
    setBudgets((prev) => [budget, ...prev]);
    addHistoryEvent('Budget Configured', `${budget.category} budget set to Rs. ${budget.limit}.`);
  };

  return (
    <div className="stack-gap-lg">
      <div className="page-header">
        <h1>Budget Thresholds</h1>
      </div>
      <div className="grid-two">
        <BudgetForm onSave={onSaveBudget} />
        <section className="stack-gap">
          {budgets.map((item) => (
            <BudgetMeter key={item.id} item={item} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default BudgetPage;
