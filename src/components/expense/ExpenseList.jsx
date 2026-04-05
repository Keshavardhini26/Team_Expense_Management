import ExpenseCard from './ExpenseCard';

const ExpenseList = ({ expenses }) => {
  return (
    <section className="stack-gap">
      {expenses.length ? (
        expenses.map((expense) => <ExpenseCard key={expense.id} expense={expense} />)
      ) : (
        <div className="content-card panel-pad">No expenses yet.</div>
      )}
    </section>
  );
};

export default ExpenseList;
