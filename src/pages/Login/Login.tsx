import { useState } from "react";

import AgencyLogo from "../../assets/air_ticket_agency.png";

import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handlePasswordChange = (e: any) => setPassword(e.target.value);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-header">
          <img src={AgencyLogo} alt="ATA Logo" className="logo" />
          <p>Please login to your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <a href="#" className="forgot-password">
            Forgot Password?
          </a>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="or-divider">
          <span>OR</span>
        </div>
        <button className="microsoft-login">
          {/* <FaMicrosoft className="microsoft-icon" /> */}
          Login with Microsoft
        </button>
      </div>
      <div className="login-banner">
        <h1>Delight Your Customer Effortlessly</h1>
        <p>
          Simplify every experience and put customers back in control by
          offering the support they expect
        </p>
        {/* <div className="mockup-image">
          <img src="ticket-list.png" alt="Tickets list mockup" />
        </div> */}
      </div>
    </div>
  );
};

export default Login;
