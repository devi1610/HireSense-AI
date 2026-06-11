import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const reset = async () => {
    try {
      const res = await axios.post(
        "https://hiresense-ai-75v4.onrender.com/api/users/reset-password/",
        {
          token,
          password,
        }
      );

      setMsg(res.data.message);
    } catch (err) {
      setMsg("Reset failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Reset Password</h2>

        <input
          type="password"
          placeholder="New password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={reset} style={styles.button}>
          Reset Password
        </button>

        <p>{msg}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },
  card: {
    width: "320px",
    padding: "25px",
    background: "white",
    borderRadius: "10px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "black",
    color: "white",
    border: "none",
  },
};

export default ResetPassword;