import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const sendLink = async () => {
    try {
      const res = await axios.post(
        "https://hiresense-ai-75v4.onrender.com/api/users/forgot-password/",
        { email }
      );

      setMsg(res.data.message);
    } catch (err) {
      setMsg("Error sending link");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Forgot Password</h2>

        <input
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <button onClick={sendLink} style={styles.button}>
          Send Reset Link
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

export default ForgotPassword;