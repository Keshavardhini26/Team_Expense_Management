import { formatDateTime } from '../../utils/dateUtils';
import formatCurrency from '../../utils/formatCurrency';

const ExpenseCard = ({ expense }) => {
  return (
    <article className="content-card panel-pad">
      <div className="panel-head">
        <h4>{expense.title}</h4>
        <span className="badge">{expense.status}</span>
      </div>
      <p>{formatCurrency(expense.amount)}</p>
      <p>Paid by: {expense.payer}</p>
      <p>Category: {expense.category}</p>
      <small>{formatDateTime(expense.createdAt)}</small>
    </article>
  );
};

export default ExpenseCard;
