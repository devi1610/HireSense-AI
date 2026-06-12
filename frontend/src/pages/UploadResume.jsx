import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UploadResume() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("access");

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!name || !email || !file) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("file", file);

    try {
      setLoading(true);

      await axios.post(
        "https://hiresense-ai-75v4.onrender.com/api/users/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Resume uploaded successfully 🚀");
      navigate("/dashboard");

    } catch (err) {
      console.log(err.response?.data);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <h1 style={styles.title}>📤 Upload Resume</h1>

        <p style={styles.subtitle}>
          Upload your resume and get AI-powered analysis instantly.
        </p>

        <form onSubmit={handleUpload}>

          <input
            type="text"
            placeholder="Full Name"
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="file"
            style={styles.input}
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Resume"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default UploadResume;

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #eef2ff, #f8fafc)",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "500px",
    background: "#fff",
    padding: "35px",
    borderRadius: "20px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
  },

  title: {
    textAlign: "center",
    marginBottom: "10px",
  },

  subtitle: {
    textAlign: "center",
    color: "#64748b",
    marginBottom: "25px",
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
    border: "none",
    borderRadius: "10px",
    background: "#6366f1",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
  },
};