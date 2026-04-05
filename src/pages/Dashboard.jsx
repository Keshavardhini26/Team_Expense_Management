import { useContext } from 'react';
import NotificationPanel from '../components/notification/NotificationPanel';
import { AppContext } from '../context/AppContext';
import formatCurrency from '../utils/formatCurrency';

const Dashboard = () => {
  const { groups, expenses, settlements } = useContext(AppContext);

  const approvedTotal = expenses
    .filter((item) => item.status === 'APPROVED')
    .reduce((sum, item) => sum + item.amount, 0);

  const pendingPayments = settlements.filter((item) => item.status !== 'PAID').length;

  const cards = [
    { title: 'Total Groups', value: groups.length },
    { title: 'Approved Spend', value: formatCurrency(approvedTotal) },
    { title: 'Pending Payments', value: pendingPayments },
    { title: 'Pending Approvals', value: expenses.filter((item) => item.status === 'PENDING').length }
  ];

  return (
    <div className="stack-gap-lg">
      <div className="page-header">
        <h1>Operations Dashboard</h1>
        <span className="badge">Live audit enabled</span>
      </div>
      <section className="grid-four">
        {cards.map((card) => (
          <article key={card.title} className="content-card panel-pad stat-card">
            <p>{card.title}</p>
            <h3>{card.value}</h3>
          </article>
        ))}
      </section>
      <NotificationPanel />
    </div>
  );
};

export default Dashboard;
