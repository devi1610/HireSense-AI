import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

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

    const res = await axios.post(
      "https://hiresense-ai-75v4.onrender.com/api/users/login/",
      { email, password }
    );

    localStorage.setItem("user", JSON.stringify(res.data.user));

    alert("Login successful 🚀");
    navigate("/dashboard");

  } catch (err) {
    console.log(err.response?.data || err.message);
    alert(err.response?.data?.error || "Login failed ❌");
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
        <h1 style={{ textAlign: "center" }}>
          Welcome Back 👋
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            marginBottom: "25px",
          }}
        >
          Login to continue using HireSense AI
        </p>


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
            opacity: loading ? 0.7 : 1,
          }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
            color: "#6366f1",
            cursor: "pointer",
            fontWeight: "500",
          }}
          onClick={() => navigate("/register")}
        >
          Don't have an account? Register
        </p>
        
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #eef2ff, #f8fafc)",
    padding: "20px",
    fontFamily: "Inter, Arial",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#fff",
    padding: "35px",
    borderRadius: "20px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid #dbeafe",
    fontSize: "14px",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#6366f1",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Login;