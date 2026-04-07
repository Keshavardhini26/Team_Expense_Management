import { formatDateTime } from '../../utils/dateUtils';
import formatCurrency from '../../utils/formatCurrency';

const ExpenseCard = ({ expense }) => {
  const isObjected = expense.status === 'OBJECTED' || expense.status === 'DISPUTED';
  const statusLabel = isObjected ? 'Objected' : expense.status.charAt(0) + expense.status.slice(1).toLowerCase();

  return (
    <article className={`content-card panel-pad expense-card ${isObjected ? 'expense-card-objected' : ''}`}>
      <div className="panel-head">
        <h4>{expense.title}</h4>
        <span className="badge">{statusLabel}</span>
      </div>
      <p>{formatCurrency(expense.amount)}</p>
      <p>Paid by: {expense.payer}</p>
      <p>Category: {expense.category}</p>
      {isObjected && expense.objectionReason && (
        <p className="expense-objection-note">
          <strong>Objection reason:</strong> {expense.objectionReason}
        </p>
      )}
      {isObjected && expense.objectionRaisedAt && <small>Objected on {formatDateTime(expense.objectionRaisedAt)}</small>}
      <small>{formatDateTime(expense.createdAt)}</small>
    </article>
  );
};

export default ExpenseCard;
