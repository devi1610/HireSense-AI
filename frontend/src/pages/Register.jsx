import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/users/register/",
        {
          name,
          email,
          password,
        }
      );

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.log(err);
      setMessage("Register failed");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleRegister} style={styles.card}>
        <h2>Register</h2>

        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Register
          
        </button>
         <p
          style={{
            textAlign: "center",
            marginTop: "10px",
            color: "blue",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          Already have an account? Login
        </p>

        <p>{message}</p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f6fa",
  },
  card: {
    width: "300px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    borderRadius: "5px",
  },
};

export default Register;