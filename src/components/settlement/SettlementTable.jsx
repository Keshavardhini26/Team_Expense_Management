import formatCurrency from '../../utils/formatCurrency';

const SettlementTable = ({ rows, onMarkPaid, disabled }) => {
  return (
    <section className="content-card panel-pad">
      <h3>Optimized Settlements</h3>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Team</th>
              <th>Expense</th>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item.id}>
                <td>{item.teamName || '-'}</td>
                <td>{item.expenseTitle || `Expense #${item.expenseId}`}</td>
                <td>{item.from}</td>
                <td>{item.to}</td>
                <td>{formatCurrency(item.amount)}</td>
                <td>{item.status}</td>
                <td>
                  <button
                    className="btn btn-muted"
                    disabled={disabled || item.status === 'PAID'}
                    onClick={() => onMarkPaid(item.id)}
                  >
                    Mark Paid
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default SettlementTable;
