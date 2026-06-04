import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    alert(`Reset link sent to ${email} (demo mode)`);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Forgot Password</h2>

      <p>Enter your email to reset password</p>

      <input
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        Send Reset Link
      </button>
    </div>
  );
}

export default ForgotPassword;