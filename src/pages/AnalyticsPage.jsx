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

  const chartData = Object.entries(byCategory)
    .map(([category, value]) => ({ category, value }))
    .sort((left, right) => right.value - left.value);

  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  const colors = ['#0E7490', '#F97316', '#22C55E', '#A855F7', '#E11D48', '#2563EB', '#F59E0B', '#14B8A6'];

  const pieGradient =
    total > 0
      ? chartData
          .map((item, index) => {
            const start = chartData.slice(0, index).reduce((sum, entry) => sum + entry.value, 0);
            const end = start + item.value;
            const startPercent = (start / total) * 100;
            const endPercent = (end / total) * 100;
            return `${colors[index % colors.length]} ${startPercent}% ${endPercent}%`;
          })
          .join(', ')
      : 'transparent';

  return (
    <div className="stack-gap-lg">
      <div className="page-header">
        <h1>Expenditure Analytics</h1>
      </div>
      <section className="content-card panel-pad stack-gap-lg">
        <div className="analytics-layout">
          <div className="analytics-visual">
            <div className="analytics-pie" style={{ background: `conic-gradient(${pieGradient})` }}>
              <div className="analytics-pie-inner">
                <span className="brand-kicker">Total Spend</span>
                <strong>{formatCurrency(total)}</strong>
                <small>{chartData.length ? `${chartData.length} categories` : 'No expenditure data'}</small>
              </div>
            </div>
          </div>
          <div className="analytics-legend stack-gap">
            {chartData.length ? (
              chartData.map((item, index) => {
                const share = total > 0 ? Math.round((item.value / total) * 100) : 0;

                return (
                  <div key={item.category} className="analytics-legend-item">
                    <div className="analytics-legend-label">
                      <span
                        className="analytics-swatch"
                        style={{ backgroundColor: colors[index % colors.length] }}
                        aria-hidden="true"
                      />
                      <strong>{item.category}</strong>
                    </div>
                    <div className="analytics-legend-meta">
                      <span>{formatCurrency(item.value)}</span>
                      <small>{share}%</small>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="analytics-empty">
                <strong>No expenditure data yet</strong>
                <p>Add expenses to see the pie chart breakdown here.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsPage;
