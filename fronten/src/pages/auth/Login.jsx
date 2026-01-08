import "./Auth.css";
import api from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    try {
      const res = await api.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      res.data.role === "admin"
        ? navigate("/admin/dashboard")
        : navigate("/student/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <h2>Student Login</h2>
        <p className="subtitle">Welcome back 👋</p>

        <input name="email" placeholder="Email address" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />

        <button>Login</button>

        <div className="auth-links">
          <Link to="/register">Create new account</Link>
          <Link to="/admin">Admin Login</Link>
        </div>
      </form>
    </div>
  );
}
