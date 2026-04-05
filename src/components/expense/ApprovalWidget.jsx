import { hoursLeftForApproval } from '../../utils/dateUtils';

const ApprovalWidget = ({ expenses, onUpdateStatus }) => {
  const pending = expenses.filter((item) => item.status === 'PENDING');

  return (
    <section className="content-card panel-pad">
      <div className="panel-head">
        <h3>Approval Center</h3>
        <span className="badge">{pending.length} pending</span>
      </div>

      <div className="stack-gap">
        {pending.map((expense) => (
          <article key={expense.id} className="approval-row">
            <div>
              <strong>{expense.title}</strong>
              <p>{hoursLeftForApproval(expense.createdAt, expense.objectionWindowHours)}h left in objection window</p>
            </div>
            <div className="row-gap">
              <button
                className="btn btn-primary"
                onClick={() => onUpdateStatus(expense.id, 'APPROVED')}
              >
                Approve
              </button>
              <button
                className="btn btn-muted"
                onClick={() => onUpdateStatus(expense.id, 'DISPUTED')}
              >
                Raise Objection
              </button>
            </div>
          </article>
        ))}
        {!pending.length && <p>Everything is reviewed.</p>}
      </div>
    </section>
  );
};

export default ApprovalWidget;
