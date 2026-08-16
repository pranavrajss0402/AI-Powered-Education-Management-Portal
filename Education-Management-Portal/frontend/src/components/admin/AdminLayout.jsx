import { NavLink, useNavigate } from "react-router-dom";
import "./AdminLayout.css";

function AdminLayout({ children }) {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", icon: "⌂", path: "/admin/dashboard" },
    { label: "Students", icon: "🎓", path: "/admin/students" },
    { label: "Teachers", icon: "👨‍🏫", path: "/admin/teachers" },
    { label: "Courses", icon: "📚", path: "/admin/courses" },
    { label: "Classes", icon: "🏫", path: "/admin/classes" },
    { label: "Examinations", icon: "📝", path: "/admin/exams" },
    { label: "Reports", icon: "📊", path: "/admin/reports" },
  ];

  function handleLogout() {
    navigate("/admin/login");
  }

  return (
    <div className="admin-layout">

      <aside className="admin-sidebar">

        <div className="admin-brand">
          <div className="admin-brand-icon">🎓</div>

          <div>
            <strong>EduPortal</strong>
            <span>Administration</span>
          </div>
        </div>

        <div className="admin-menu-title">
          MAIN MENU
        </div>

        <nav className="admin-navigation">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "admin-nav-link active"
                  : "admin-nav-link"
              }
            >
              <span className="admin-nav-icon">
                {item.icon}
              </span>

              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">

          <div className="admin-user">
            <div className="admin-avatar">A</div>

            <div>
              <strong>Administrator</strong>
              <span>Admin Account</span>
            </div>
          </div>

          <button
            className="admin-logout"
            onClick={handleLogout}
          >
            ↪ Logout
          </button>

        </div>

      </aside>

      <div className="admin-page">

        <header className="admin-topbar">

          <div className="admin-mobile-brand">
            🎓 EduPortal
          </div>

          <div className="admin-topbar-right">

            <button className="admin-notification">
              🔔
              <span />
            </button>

            <div className="admin-top-user">
              <div className="admin-avatar small">
                A
              </div>

              <div>
                <strong>Administrator</strong>
                <span>Admin</span>
              </div>
            </div>

          </div>

        </header>

        <main className="admin-content">
          {children}
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;