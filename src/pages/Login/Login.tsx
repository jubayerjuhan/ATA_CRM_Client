import React from "react";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import AgencyLogo from "../../assets/air_ticket_agency.png";

import { loginToCRM } from "../../redux/actions";
import { AppDispatch } from "../../types";

import "./Login.scss";

// Interface for form values
interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    await dispatch(loginToCRM(data.email, data.password));
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-header">
          <img src={AgencyLogo} alt="ATA Logo" className="logo" />
          <p>Please login to your account</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: /^\S+@\S+\.\S+$/,
            })}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must have at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}

          <a href="#" className="forgot-password">
            Forgot Password?
          </a>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
      <div className="login-banner">
        <h1>Delight Your Customer Effortlessly</h1>
        <p>
          Simplify every experience and put customers back in control by
          offering the support they expect
        </p>
      </div>
    </div>
  );
};

export default Login;
