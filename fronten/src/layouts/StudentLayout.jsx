import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../pages/student/Student.css";

export default function StudentLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="student-wrapper">
      <aside className="student-sidebar">
        <h2 className="student-logo">Student Panel</h2>

        <nav className="student-nav">
          <NavLink to="/student/dashboard">📊 Dashboard</NavLink>

          <NavLink to="/student/feedback">📝 Student Feedback</NavLink>
        </nav>

        <button className="student-logout" onClick={logout}>
          Logout
        </button>
      </aside>

      <main className="student-main">
        <Outlet />
      </main>
    </div>
  );
}
