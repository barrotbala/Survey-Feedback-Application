import "./Navbar.css";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ❌ No navbar for admin pages
  if (!token || role === "admin") return null;

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h3>College Survey</h3>
      <div>
        <Link to="/student/dashboard">Dashboard</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}
