import { formatDateTime } from '../../utils/dateUtils';

const stylesByType = {
  approval: { background: '#e4f3fb', border: '#c7e6f6' },
  budget: { background: '#fff1df', border: '#f4d8b4' },
  reminder: { background: '#edf8f1', border: '#cdebd8' }
};

const NotificationItem = ({ notification, onToggleRead }) => {
  const style = stylesByType[notification.type] || stylesByType.approval;

  return (
    <article
      className="notification-item"
      style={{ background: style.background, borderColor: style.border }}
    >
      <div>
        <h4>{notification.title}</h4>
        <p>{notification.message}</p>
        <small>{formatDateTime(notification.createdAt)}</small>
      </div>
      <button className="btn btn-muted" onClick={() => onToggleRead(notification.id)}>
        {notification.read ? 'Unread' : 'Read'}
      </button>
    </article>
  );
};

export default NotificationItem;
