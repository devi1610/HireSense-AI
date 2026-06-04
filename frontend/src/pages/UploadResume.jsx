import { useState } from "react";
import axios from "axios";

function UploadResume() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/users/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("Resume uploaded successfully 🚀");
    } catch (err) {
      console.log(err);
      setMessage("Upload failed");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleUpload} style={styles.card}>
        <h2>Upload Resume 📄</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Upload
        </button>

        {message && <p>{message}</p>}
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
    width: "350px",
    padding: "30px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    backgroundColor: "#111",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default UploadResume;