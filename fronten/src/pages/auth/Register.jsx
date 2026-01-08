import "./Auth.css";
import api from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    try {
      await api.post("/auth/register", data);
      alert("Registration successful");
      navigate("/");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <h2>Create Account</h2>
        <p className="subtitle">Student Registration</p>

        <input name="name" placeholder="Full name" required />
        <input name="email" placeholder="Email address" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />

        <button>Register</button>

        <div className="auth-links">
          <Link to="/">Already have an account?</Link>
        </div>
      </form>
    </div>
  );
}
