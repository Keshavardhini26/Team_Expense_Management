import { useContext } from 'react';
import SettlementSummary from '../components/settlement/SettlementSummary';
import SettlementTable from '../components/settlement/SettlementTable';
import { AppContext } from '../context/AppContext';

const SettlementPage = () => {
  const { settlements, setSettlements, tripLocked, setTripLocked, addHistoryEvent } = useContext(AppContext);

  const markPaid = (id) => {
    setSettlements((prev) => prev.map((item) => (item.id === id ? { ...item, status: 'PAID' } : item)));
    addHistoryEvent('Settlement Confirmed', `Settlement row #${id} marked paid.`);
  };

  const lockTrip = () => {
    setTripLocked(true);
    addHistoryEvent('Trip Locked', 'All balances cleared, modifications are disabled.');
  };

  const pending = settlements.filter((item) => item.status !== 'PAID').length;

  return (
    <div className="stack-gap-lg">
      <div className="page-header">
        <h1>Debt Settlement</h1>
        <button className="btn btn-primary" disabled={tripLocked || pending > 0} onClick={lockTrip}>
          Activate Trip Lock
        </button>
      </div>
      <div className="settlement-layout">
        <SettlementSummary rows={settlements} tripLocked={tripLocked} />
        <SettlementTable rows={settlements} onMarkPaid={markPaid} disabled={tripLocked} />
      </div>
    </div>
  );
};

export default SettlementPage;
