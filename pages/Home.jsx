function Home() {
  return (
    <div className="home">

      <header className="navbar">
        <div className="logo">EduPortal</div>

        <nav>
          <a href="/">Home</a>
          <a href="/courses">Courses</a>
          <a href="/contact">Contact</a>
          <a href="/student">Student Portal</a>
          <a href="/admin/login">Admin</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <p className="tag">SMART EDUCATION MANAGEMENT</p>

          <h1>
            Manage Learning.
            <br />
            Improve Performance.
          </h1>

          <p className="description">
            A unified platform for students, teachers,
            courses, classes, examinations and academic
            performance.
          </p>

          <div className="buttons">
            <a href="/courses" className="primary-button">
              Explore Courses
            </a>

            <a href="/admin/login" className="secondary-button">
              Admin Login
            </a>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Everything in One Platform</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="icon">📚</div>
            <h3>Course Management</h3>
            <p>Browse and manage academic courses.</p>
          </div>

          <div className="feature-card">
            <div className="icon">🎓</div>
            <h3>Academic Management</h3>
            <p>
              Manage students, teachers, classes
              and examinations.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">📊</div>
            <h3>Reports & Analytics</h3>
            <p>
              Monitor academic performance through
              meaningful reports.
            </p>
          </div>

        </div>
      </section>

      <footer>
        <p>© 2026 EduPortal</p>
      </footer>

    </div>
  );
}

export default Home;