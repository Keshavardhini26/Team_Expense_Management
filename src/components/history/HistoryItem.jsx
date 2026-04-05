import { formatDateTime } from '../../utils/dateUtils';

const HistoryItem = ({ item }) => {
  return (
    <article className="history-item">
      <h4>{item.event}</h4>
      <p>{item.details}</p>
      <small>
        {item.actor} | {formatDateTime(item.time)}
      </small>
    </article>
  );
};

export default HistoryItem;
