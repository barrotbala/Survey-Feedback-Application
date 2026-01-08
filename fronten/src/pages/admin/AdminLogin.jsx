import "../auth/Auth.css";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    try {
      const res = await api.post("/auth/login", data);

      if (res.data.role !== "admin") {
        alert("Admin access only");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/admin/dashboard");
    } catch {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="auth-page admin-bg">
      <form className="auth-card" onSubmit={submit}>
        <h2>Admin Login</h2>
        <p className="subtitle">Restricted access 🔒</p>

        <input name="email" placeholder="Admin email" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />

        <button className="admin-btn">Login</button>
      </form>
    </div>
  );
}
