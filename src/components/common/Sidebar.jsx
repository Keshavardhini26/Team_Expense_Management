import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../../utils/constants';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h3>TEMS</h3>
        <p>Control panel</p>
      </div>
      <nav className="sidebar-nav">
        {NAV_LINKS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `side-link ${isActive ? 'side-link-active' : ''}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
