import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Admin.css";

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  return (
    <div className="admin-wrapper">
      <aside className="admin-sidebar">
        <h2 className="admin-logo">Admin Panel</h2>

        <nav className="admin-nav">
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
          <NavLink to="/admin/create">Create Survey</NavLink>
        </nav>

        <button className="admin-logout" onClick={logout}>
          Logout
        </button>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
