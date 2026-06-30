import { useState } from "react";
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

    const response = await fetch(
      "https://hiresense-ai-75v4.onrender.com/api/users/upload/",
      {
        method: "POST",
        body: formData,
      }
    );

    console.log("Status:", response.status);

    const text = await response.text();
    console.log("Response:", text);

    if (!response.ok) {
      throw new Error(text);
    }

    alert("Resume uploaded successfully 🚀");
    navigate("/dashboard");

  } catch (err) {
    console.error("Upload Error:", err);
    alert("Upload failed: " + err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      {/* ================= UPLOAD PAGE ================= */}
      <div className="upload-page">

        <div className="upload-card">

          {/* Back Button */}
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            ← Dashboard
          </button>

          {/* Logo */}
          <div className="upload-logo" onClick={() => navigate("/dashboard")}>
            <img src="/logo.png" alt="logo" height="40" />
          </div>

          {/* Title */}
          <h1 className="upload-title">Upload Resume</h1>
          <p className="upload-subtitle">
            Upload your resume for AI-powered ATS scoring and job matching
          </p>

          <form onSubmit={handleUpload}>

            {/* FILE UPLOAD BOX */}
            <div
              className="clean-upload"
              onClick={() => document.getElementById("resumeFile").click()}
            >
              <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"></path>
              </svg>

              <span className="file-title">Click to upload your resume</span>
              <span className="file-subtitle">PDF, DOCX, TXT (Max 10MB)</span>

              {file && (
                <div className="file-selected">
                  ✓ {file.name}
                </div>
              )}

              <input
                id="resumeFile"
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                onChange={(e) => setFile(e.target.files[0])}
                hidden
              />
            </div>

            {/* BUTTON */}
            <button className="upload-btn" disabled={loading}>
              {loading ? "Uploading..." : "Upload Resume"}
            </button>

          </form>

        </div>
      </div>

      {/* ================= INLINE CSS ================= */}
      <style>{`
        .upload-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f4f7fb;
          padding: 20px;
        }

        .upload-card {
          width: 100%;
          max-width: 520px;
          background: rgba(255,255,255,0.85);
          border: 1px solid rgba(15,23,42,0.08);
          border-radius: 16px;
          padding: 28px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          backdrop-filter: blur(10px);
          text-align: center;
        }

        .upload-title {
          font-size: 20px;
          font-weight: 700;
          margin-top: 10px;
          color: #0f172a;
        }

        .upload-subtitle {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 20px;
        }

        .clean-upload {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 26px;
          border: 2px dashed rgba(79,70,229,0.3);
          border-radius: 14px;
          background: #f8fafc;
          cursor: pointer;
          transition: 0.2s;
          gap: 6px;
        }

        .clean-upload:hover {
          border-color: #4f46e5;
          background: #eef2ff;
        }

        .file-title {
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
        }

        .file-subtitle {
          font-size: 12px;
          color: #64748b;
        }

        .file-selected {
          margin-top: 10px;
          font-size: 12px;
          color: #16a34a;
          font-weight: 500;
        }

        .upload-btn {
          width: 100%;
          margin-top: 16px;
          padding: 12px;
          background: #4f46e5;
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
        }

        .upload-btn:hover {
          background: #4338ca;
        }

        .back-btn {
          position: absolute;
          left: 20px;
          top: 20px;
          background: transparent;
          border: none;
          font-size: 14px;
          cursor: pointer;
          color: #64748b;
        }

        .back-btn:hover {
          color: #0f172a;
        }
      `}</style>
    </>
  );
}

export default UploadResume;