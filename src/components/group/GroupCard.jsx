import formatCurrency from '../../utils/formatCurrency';

const GroupCard = ({ group, onSelect }) => {
  return (
    <article className="content-card panel-pad group-card" onClick={() => onSelect(group)}>
      <div className="panel-head">
        <h3>{group.name}</h3>
        <span className="badge">{group.members.length} members</span>
      </div>
      <p>Total spent: {formatCurrency(group.totalSpent)}</p>
      <p>Pending approvals: {group.pendingApprovals}</p>
      <p>{group.tripLocked ? 'Trip Locked' : 'Trip Active'}</p>
    </article>
  );
};

export default GroupCard;
