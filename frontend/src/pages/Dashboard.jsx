import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [analysis, setAnalysis] = useState(
    JSON.parse(localStorage.getItem("analysis")) || null
  );
  const [jobs, setJobs] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState(null);

  const analysisRef = useRef(null);
  const token = localStorage.getItem("access");

  useEffect(() => {
    if (!token) navigate("/");
  }, [token, navigate]);

  // ---------------- FETCH RESUMES ----------------
  const fetchResumes = async () => {
    try {
      const res = await axios.get(
        "https://hiresense-ai-75v4.onrender.com/api/users/resumes/"
      );
      const fetched = res.data || [];
      setResumes(fetched);
      
      // Auto-set selected id if we have active analysis
      if (analysis && fetched.length > 0) {
        const matching = fetched.find(r => r.name === analysis.name || r.email === analysis.email);
        if (matching) setSelectedResumeId(matching.id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  // ---------------- ANALYZE RESUME ----------------
  const analyzeResume = async (id) => {
    try {
      setSelectedResumeId(id);
      const res = await axios.get(
        `https://hiresense-ai-75v4.onrender.com/api/users/analyze/${id}/`
      );

      const data = res.data || {};
      setAnalysis(data);
      setJobs(data.recommended_jobs || []);

      localStorage.setItem("analysis", JSON.stringify(data));

      setTimeout(() => {
        analysisRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- DELETE RESUME ----------------
  const deleteResume = async (id) => {
    try {
      await axios.delete(
        `https://hiresense-ai-75v4.onrender.com/api/users/delete/${id}/`
      );
      if (selectedResumeId === id) {
        setAnalysis(null);
        setJobs([]);
        localStorage.removeItem("analysis");
      }
      fetchResumes();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dashboard-page grid-bg fade-in-up">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-nav-container">
          <div className="logo" onClick={() => navigate("/")}>
            <img src="/logo.png" alt="HireSense AI Logo" style={{ height: "42px", width: "auto", display: "block", objectFit: "contain" }} />
          </div>

          <div className="dashboard-user-info">
            <span className="dashboard-welcome" style={{ fontWeight: "600", color: "var(--text-main)" }}>Candidate Portal</span>
            <button
              className="btn-logout icon-btn"
              title="Logout"
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px', marginLeft: '8px', transition: 'color 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--error)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-light)'}
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="dashboard-main">
        <div className="dashboard-grid">
          
          {/* Left Column: Manage Resumes */}
          <section className="dashboard-left">
            <div className="section-header">
              <h2 className="dashboard-title">📄 Manage Resumes</h2>
              <button
                className="nav-btn-primary dashboard-upload-btn"
                onClick={() => navigate("/upload")}
              >
                + Upload Resume
              </button>
            </div>

            {resumes.length === 0 ? (
              <div className="empty-state glass-card">
                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--text-light)" strokeWidth="1.5" style={{ marginBottom: "16px" }}>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                <h3>No Resumes Found</h3>
                <p>Upload your resume to get instant ATS scores and custom job recommendations.</p>
                <button
                  className="nav-btn-primary"
                  onClick={() => navigate("/upload")}
                  style={{ marginTop: "16px", padding: "10px 20px" }}
                >
                  Upload Now
                </button>
              </div>
            ) : (
              <div className="resumes-list">
                {resumes.map((r) => (
                  <div
                    key={r.id}
                    className={`resume-card glass-card ${selectedResumeId === r.id ? "active" : ""}`}
                  >
                    <div className="resume-info">
                      <h4 className="resume-name">{r.name}</h4>
                      <p className="resume-email">{r.email}</p>
                    </div>

                    <div className="resume-actions">
                      <a
                        className="action-view"
                        href={`https://hiresense-ai-75v4.onrender.com${r.file}`}
                        target="_blank"
                        rel="noreferrer"
                        title="View Resume PDF"
                      >
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: "4px" }}>
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        View
                      </a>

                      <button
                        className="action-analyze"
                        onClick={() => analyzeResume(r.id)}
                      >
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: "4px" }}>
                          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                        </svg>
                        Analyze
                      </button>

                      <button
                        className="action-delete"
                        onClick={() => deleteResume(r.id)}
                        title="Delete Resume"
                      >
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Right Column: AI Analysis */}
          <section className="dashboard-right" ref={analysisRef}>
            {!analysis ? (
              <div className="empty-analysis-state glass-card">
                <svg viewBox="0 0 24 24" width="56" height="56" fill="none" stroke="var(--text-light)" strokeWidth="1.25" style={{ marginBottom: "20px" }}>
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="9" y1="9" x2="15" y2="9"></line>
                  <line x1="9" y1="13" x2="15" y2="13"></line>
                  <line x1="9" y1="17" x2="13" y2="17"></line>
                </svg>
                <h3>AI Analysis Results</h3>
                <p>Select and click "Analyze" on any resume in the left panel to load the AI score breakdowns and recommended career match cards.</p>
              </div>
            ) : (
              <div className="analysis-results">
                
                {/* Score Banner */}
                <div className="glass-card analysis-score-card">
                  <div className="score-flex">
                    <div style={{ textAlign: "left" }}>
                      <span className="analysis-tag">ATS METRICS MATCHED</span>
                      <h2 style={{ fontSize: "1.5rem", fontWeight: "800", marginTop: "12px", marginBottom: "6px", letterSpacing: "-0.5px" }}>
                        Resume Score Generated
                      </h2>
                      <p className="resume-email">
                        Suggested Job Title: <strong style={{ color: "var(--text-main)" }}>
                          {Array.isArray(analysis.job_suggestions)
                            ? analysis.job_suggestions.join(", ")
                            : "Not detected"}
                        </strong>
                      </p>
                    </div>

                    <div className="circular-score">
                      <svg width="72" height="72" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#f1f5f9"
                          strokeWidth="3.5"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="var(--primary)"
                          strokeDasharray={`${analysis.score || 0}, 100`}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                        <text x="18" y="21.5" style={{ fontSize: "9px", fontWeight: "800", fill: "var(--text-main)", textAnchor: "middle", fontFamily: "var(--font-title)" }}>
                          {analysis.score || 0}%
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Detected Skills */}
                <div className="glass-card analysis-detail-card">
                  <h3 className="detail-card-title">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--primary)" strokeWidth="2.5">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>
                    Detected Technical Skills
                  </h3>
                  <div className="badge-grid">
                    {Array.isArray(analysis.skills_detected) && analysis.skills_detected.length > 0 ? (
                      analysis.skills_detected.map((s, i) => (
                        <span key={i} className="badge-skill">{s}</span>
                      ))
                    ) : (
                      <p className="no-skills-msg">No skills identified yet.</p>
                    )}
                  </div>
                </div>

                {/* Missing Skills */}
                <div className="glass-card analysis-detail-card">
                  <h3 className="detail-card-title">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--error)" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    Identified Skills Gaps
                  </h3>
                  <div className="badge-grid">
                    {Array.isArray(analysis.missing_skills) && analysis.missing_skills.length > 0 ? (
                      analysis.missing_skills.map((s, i) => (
                        <span key={i} className="badge-missing">{s}</span>
                      ))
                    ) : (
                      <span className="badge-matched">All targeted skills matched successfully! 🎉</span>
                    )}
                  </div>
                </div>

                {/* Jobs Match Grid */}
                {Array.isArray(jobs) && jobs.length > 0 && (
                  <div className="recommended-jobs-section">
                    <h3 className="detail-card-title" style={{ paddingLeft: "4px" }}>
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--success)" strokeWidth="2.5">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="8.5" cy="7" r="4"></circle>
                      </svg>
                      Active Job Market Matches
                    </h3>
                    
                    <div className="jobs-match-grid">
                      {jobs.map((job, i) => (
                        <div key={i} className="glass-card job-match-card">
                          <div className="job-match-header">
                            <h4 className="job-role-title">{job.role}</h4>
                            <span className="job-match-badge">Match</span>
                          </div>
                          
                          <div className="job-match-links">
                            <a
                              href={job?.links?.linkedin || "#"}
                              target="_blank"
                              rel="noreferrer"
                              className="job-btn-linkedin"
                            >
                              LinkedIn
                            </a>

                            <a
                              href={job?.links?.naukri || "#"}
                              target="_blank"
                              rel="noreferrer"
                              className="job-btn-naukri"
                            >
                              Naukri
                            </a>

                            <a
                              href={job?.links?.unstop || "#"}
                              target="_blank"
                              rel="noreferrer"
                              className="job-btn-unstop"
                            >
                              Unstop
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}
          </section>

        </div>
      </main>
    </div>
  );
}

export default Dashboard;