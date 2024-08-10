import React, { useEffect } from "react";

import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { loginToCRM } from "../../redux/actions";
import { AppDispatch, AppState } from "../../types";
import { CLEAR_ERROR, CLEAR_MESSAGE } from "../../constants";

import AgencyLogo from "../../assets/air_ticket_agency.png";
import "../../common/styles/AuthPageDesign.scss";

// Interface for form values
interface LoginFormValues {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { auth: authState } = useSelector((state: AppState) => state);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    await dispatch(loginToCRM(data.email, data.password));
  };

  useEffect(() => {
    if (authState.message) {
      toast.success(authState.message);
      dispatch({ type: CLEAR_MESSAGE });
    }
  }, [authState.message, dispatch]);

  useEffect(() => {
    if (authState.error?.message) {
      toast.error(authState.error.message);
      dispatch({ type: CLEAR_ERROR });
    }
  }, [authState.error?.message, dispatch]);

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="auth-header">
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

          <Link to={"/forgot-password"} className="forgot-password">
            Forgot Password?
          </Link>
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
      </div>
      <div className="auth-banner">
        <h1>Delight Your Customer Effortlessly</h1>
        <p>
          Simplify every experience and put customers back in control by
          offering the support they expect
        </p>
      </div>
    </div>
  );
};
