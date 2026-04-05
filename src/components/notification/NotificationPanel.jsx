import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import NotificationItem from './NotificationItem';

const NotificationPanel = () => {
  const { notifications, setNotifications } = useContext(AppContext);

  const toggleRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === notificationId ? { ...item, read: !item.read } : item
      )
    );
  };

  return (
    <section className="content-card panel-pad">
      <div className="panel-head">
        <h3>Notifications</h3>
        <span className="badge">
          {notifications.filter((item) => !item.read).length} unread
        </span>
      </div>
      <div className="stack-gap">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onToggleRead={toggleRead}
          />
        ))}
      </div>
    </section>
  );
};

export default NotificationPanel;
