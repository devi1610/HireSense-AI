import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UploadResume() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("name", "Candidate");
    formData.append("email", "candidate@example.com");
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

      alert("Resume uploaded successfully! 🚀");
      navigate("/dashboard");

    } catch (err) {
      console.log(err.response?.data);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-container">
      <div className="glass-card" style={styles.card}>
        
        {/* Back to Dashboard Link */}
        <button className="back-to-home-btn" onClick={() => navigate("/dashboard")}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: "6px" }}>
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Dashboard
        </button>

        {/* LOGO */}
        <div style={styles.logo} onClick={() => navigate("/dashboard")}>
          <img src="/logo.png" alt="HireSense AI Logo" style={{ height: "42px", width: "auto", display: "block", objectFit: "contain" }} />
        </div>

        <h1 style={styles.title}>Upload Resume</h1>
        <p style={styles.subtitle}>Submit your PDF or Word document for real-time AI parsing and analysis.</p>

        <form onSubmit={handleUpload}>
          
          {/* Styled File Input Zone */}
          <div className="form-group">
            <label className="form-label">
              Resume Document <span className="required-asterisk">*</span>
            </label>
            <div className="file-upload-wrapper">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" className="file-upload-icon">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"></path>
              </svg>
              <span className="file-upload-text">Click to choose resume file</span>
              <span className="file-upload-subtext">PDF, DOCX, or TXT up to 10MB</span>
              <input
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                onChange={(e) => setFile(e.target.files[0])}
                required
                disabled={loading}
              />
              {file && (
                <div className="file-upload-selected">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Selected: {file.name}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={styles.submitBtn}
            disabled={loading}
          >
            {loading ? "Uploading Resume..." : "Upload Resume"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default UploadResume;

const styles = {
  card: {
    width: "100%",
    maxWidth: "500px",
    padding: "44px 36px",
    textAlign: "center",
  },
  logo: {
    display: "inline-flex",
    alignItems: "center",
    cursor: "pointer",
    marginBottom: "20px",
  },
  logoText: {
    fontFamily: "var(--font-title)",
    fontSize: "1.25rem",
    fontWeight: "800",
    letterSpacing: "-0.5px",
    color: "var(--text-main)",
  },
  title: {
    fontSize: "1.75rem",
    fontWeight: "800",
    color: "var(--text-main)",
    marginBottom: "8px",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: "0.85rem",
    color: "var(--text-muted)",
    marginBottom: "28px",
    lineHeight: "1.5",
  },
  submitBtn: {
    width: "100%",
    marginTop: "16px",
  },
};