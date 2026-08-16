import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  function handleLogin(event) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Please enter email and password.");
      return;
    }

    // Prototype login
    if (rememberMe) {
      localStorage.setItem("adminEmail", email);
    }

    localStorage.setItem("adminLoggedIn", "true");

    navigate("/admin/dashboard");
  }

  function handleForgotPassword() {
    alert("Please contact the administrator.");
  }

  function handleBackHome() {
    navigate("/");
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">

        {/* LEFT SIDE */}
        <div className="admin-login-brand">

          <div className="login-brand-icon">
            🎓
          </div>

          <h1>EduPortal</h1>

          <p>Education Management Portal</p>

          <div className="login-brand-info">
            <span>✓</span>
            <span>Manage students and teachers</span>
          </div>

          <div className="login-brand-info">
            <span>✓</span>
            <span>Manage courses and examinations</span>
          </div>

          <div className="login-brand-info">
            <span>✓</span>
            <span>Monitor academic performance</span>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="admin-login-card">

          <div className="login-card-header">

            <div className="login-small-icon">
              🔐
            </div>

            <p className="login-label">
              ADMIN PORTAL
            </p>

            <h2>Welcome back</h2>

            <p>
              Sign in to manage your Education Portal.
            </p>

          </div>

          <form onSubmit={handleLogin}>

            {/* EMAIL */}
            <div className="login-input-group">

              <label htmlFor="admin-email">
                Email Address
              </label>

              <input
                id="admin-email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
              />

            </div>

            {/* PASSWORD */}
            <div className="login-input-group">

              <label htmlFor="admin-password">
                Password
              </label>

              <input
                id="admin-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
              />

            </div>

            {/* OPTIONS */}
            <div className="login-options">

              <label className="remember-me">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(event.target.checked)
                  }
                />

                <span>Remember me</span>

              </label>

              <button
                type="button"
                className="forgot-password"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </button>

            </div>

            {/* SIGN IN */}
            <button
              type="submit"
              className="login-submit-button"
            >
              <span>Sign In</span>
              <span>→</span>
            </button>

          </form>

          {/* BACK HOME */}
          <button
            type="button"
            className="back-home-button"
            onClick={handleBackHome}
          >
            ← Back to Home
          </button>

        </div>

      </div>
    </div>
  );
}

export default AdminLogin;