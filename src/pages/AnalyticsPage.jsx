import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import formatCurrency from '../utils/formatCurrency';

const AnalyticsPage = () => {
  const { expenses } = useContext(AppContext);

  const byCategory = expenses.reduce((acc, item) => {
    const current = acc[item.category] || 0;
    acc[item.category] = current + item.amount;
    return acc;
  }, {});

  const max = Math.max(...Object.values(byCategory), 1);

  return (
    <div className="stack-gap-lg">
      <div className="page-header">
        <h1>Expenditure Analytics</h1>
      </div>
      <section className="content-card panel-pad stack-gap">
        {Object.entries(byCategory).map(([category, value]) => (
          <div key={category} className="analytics-row">
            <div className="panel-head">
              <strong>{category}</strong>
              <span>{formatCurrency(value)}</span>
            </div>
            <div className="analytics-track">
              <div className="analytics-fill" style={{ width: `${(value / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AnalyticsPage;
