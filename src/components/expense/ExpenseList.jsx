import ExpenseCard from './ExpenseCard';

const ExpenseList = ({ title = 'Expenses', emptyMessage = 'No expenses yet.', expenses }) => {
  return (
    <section className="stack-gap">
      <div className="panel-head">
        <h3>{title}</h3>
      </div>
      {expenses.length ? (
        expenses.map((expense) => <ExpenseCard key={expense.id} expense={expense} />)
      ) : (
        <div className="content-card panel-pad">{emptyMessage}</div>
      )}
    </section>
  );
};

export default ExpenseList;
