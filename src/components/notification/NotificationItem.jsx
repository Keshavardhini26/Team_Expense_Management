import { formatDateTime } from '../../utils/dateUtils';

const stylesByType = {
  approval: { background: 'var(--brand-100)', border: 'var(--brand-500)' },
  budget: { background: 'var(--accent-100)', border: 'var(--accent-700)' },
  reminder: { background: 'color-mix(in srgb, var(--success-600) 12%, var(--bg-surface))', border: 'var(--success-600)' }
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
