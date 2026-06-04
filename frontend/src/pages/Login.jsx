import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`http://127.0.0.1:8000/api/users/login/`, {
        email,
        password,
      });

      // store only necessary user info
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: res.data.user.id,
          name: res.data.user.name,
          email: res.data.user.email,
        })
      );

      alert("Login successful 🚀");
      navigate("/dashboard");

    } catch (err) {
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Login failed. Try again.";

      alert(errorMsg);

    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: "20px" }}>Login</h2>

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />

        <button
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
          onClick={handleLogin}
          disabled={loading || !email || !password}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={styles.link} onClick={() => navigate("/forgot")}>
          Forgot Password?
        </p>

        <p style={styles.link} onClick={() => navigate("/register")}>
          Don't have an account? Register
        </p>
      </div>
    </div>
  );
}

// ---------------- STYLES ----------------
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f8",
    fontFamily: "Arial",
  },

  card: {
    width: "320px",
    padding: "30px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },

  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },

  link: {
    color: "blue",
    cursor: "pointer",
    marginTop: "10px",
    textDecoration: "underline",
  },
};

export default Login;