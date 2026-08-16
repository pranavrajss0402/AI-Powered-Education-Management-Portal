import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: "⌂",
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      icon: "🎓",
      label: "Students",
      path: "/admin/students",
    },
    {
      icon: "👨‍🏫",
      label: "Teachers",
      path: "/admin/teachers",
    },
    {
      icon: "📚",
      label: "Courses",
      path: "/admin/courses",
    },
    {
      icon: "🏫",
      label: "Classes",
      path: "/admin/classes",
    },
    {
      icon: "📝",
      label: "Examinations",
      path: "/admin/exams",
    },
    {
      icon: "📊",
      label: "Reports",
      path: "/admin/reports",
    },
  ];

  const stats = [
    {
      icon: "🎓",
      title: "Total Students",
      value: "120",
      change: "+12%",
    },
    {
      icon: "👨‍🏫",
      title: "Total Teachers",
      value: "15",
      change: "+5%",
    },
    {
      icon: "📚",
      title: "Total Courses",
      value: "25",
      change: "+8%",
    },
    {
      icon: "📝",
      title: "Examinations",
      value: "12",
      change: "+3%",
    },
  ];

  function handleLogout() {
    navigate("/admin/login");
  }

  return (
    <div className="new-dashboard">

      {/* SIDEBAR */}

      <aside className="dashboard-sidebar">

        <div className="sidebar-brand">
          <div className="sidebar-logo">
            🎓
          </div>

          <div>
            <strong>EduPortal</strong>
            <small>Administration</small>
          </div>
        </div>

        <div className="sidebar-section">
          <span>MAIN MENU</span>
        </div>

        <nav className="sidebar-nav">

          {menuItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={
                item.path === "/admin/dashboard"
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >
              <span className="sidebar-icon">
                {item.icon}
              </span>

              <span>{item.label}</span>
            </a>
          ))}

        </nav>

        <div className="sidebar-bottom">

          <div className="sidebar-admin">
            <div className="admin-avatar">
              A
            </div>

            <div>
              <strong>Administrator</strong>
              <small>Admin Account</small>
            </div>
          </div>

          <button
            className="sidebar-logout"
            onClick={handleLogout}
          >
            ↪ Logout
          </button>

        </div>

      </aside>

      {/* MAIN */}

      <main className="dashboard-main">

        {/* TOP BAR */}

        <header className="dashboard-topbar">

          <div>
            <p className="dashboard-label">
              ADMIN PORTAL
            </p>

            <h1>Dashboard</h1>
          </div>

          <div className="topbar-actions">

            <button className="notification-button">
              🔔
              <span></span>
            </button>

            <div className="topbar-profile">
              <div className="admin-avatar">
                A
              </div>

              <div>
                <strong>Administrator</strong>
                <small>Admin</small>
              </div>
            </div>

          </div>

        </header>

        {/* WELCOME */}

        <section className="dashboard-welcome">

          <div>
            <h2>
              Welcome back, Administrator 👋
            </h2>

            <p>
              Here's what's happening across your
              Education Management Portal today.
            </p>
          </div>

          <button
            className="primary-dashboard-button"
            onClick={() => navigate("/admin/students")}
          >
            + Add Student
          </button>

        </section>

        {/* STATISTICS */}

        <section className="new-stats-grid">

          {stats.map((stat) => (
            <div
              className="new-stat-card"
              key={stat.title}
            >

              <div className="stat-top">

                <div className="new-stat-icon">
                  {stat.icon}
                </div>

                <span className="stat-change">
                  {stat.change}
                </span>

              </div>

              <p>{stat.title}</p>

              <h2>{stat.value}</h2>

              <small>
                Compared with last month
              </small>

            </div>
          ))}

        </section>

        {/* CONTENT GRID */}

        <section className="new-dashboard-grid">

          {/* QUICK MANAGEMENT */}

          <div className="new-dashboard-card management-card">

            <div className="card-heading">

              <div>
                <h2>Quick Management</h2>
                <p>
                  Access your administration modules.
                </p>
              </div>

            </div>

            <div className="new-management-grid">

              {menuItems.slice(1).map((item) => (
                <a
                  href={item.path}
                  key={item.path}
                  className="new-management-item"
                >

                  <div className="management-icon">
                    {item.icon}
                  </div>

                  <div>
                    <strong>{item.label}</strong>

                    <small>
                      Manage {item.label.toLowerCase()}
                    </small>
                  </div>

                  <span className="arrow">
                    →
                  </span>

                </a>
              ))}

            </div>

          </div>

          {/* ACADEMIC OVERVIEW */}

          <div className="new-dashboard-card">

            <div className="card-heading">

              <div>
                <h2>Academic Overview</h2>
                <p>
                  Current performance indicators.
                </p>
              </div>

            </div>

            <div className="academic-stat">

              <div>
                <span>Student Attendance</span>
                <strong>87%</strong>
              </div>

              <div className="new-progress">
                <div
                  style={{ width: "87%" }}
                ></div>
              </div>

            </div>

            <div className="academic-stat">

              <div>
                <span>Course Completion</span>
                <strong>72%</strong>
              </div>

              <div className="new-progress">
                <div
                  style={{ width: "72%" }}
                ></div>
              </div>

            </div>

            <div className="academic-stat">

              <div>
                <span>Exam Completion</span>
                <strong>64%</strong>
              </div>

              <div className="new-progress">
                <div
                  style={{ width: "64%" }}
                ></div>
              </div>

            </div>

            <div className="academic-stat">

              <div>
                <span>Student Engagement</span>
                <strong>81%</strong>
              </div>

              <div className="new-progress">
                <div
                  style={{ width: "81%" }}
                ></div>
              </div>

            </div>

          </div>

        </section>

        {/* FOOTER */}

        <footer className="dashboard-footer">
          © 2026 EduPortal. Education Management Portal.
        </footer>

      </main>

    </div>
  );
}

export default Dashboard;