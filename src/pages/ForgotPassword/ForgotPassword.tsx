import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, AppState } from "../../types";
import { forgotPasswordAction } from "../../redux/actions";

import AgencyLogo from "../../assets/air_ticket_agency.png";

import "../../common/styles/AuthPageDesign.scss";
import toast from "react-hot-toast";
import { CLEAR_MESSAGE } from "../../constants";

// Interface for form values
interface ForgotPasswordFormValues {
  email: string;
}

export const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { auth: authState } = useSelector((state: AppState) => state);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>();

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    await dispatch(forgotPasswordAction(data.email));
  };

  useEffect(() => {
    if (authState.message) {
      toast.success(authState.message);
      dispatch({ type: CLEAR_MESSAGE });
    }
  }, [authState.message, dispatch]);

  return (
    <div className="auth-container">
      <div className="auth-form">
        <div className="auth-header">
          <img src={AgencyLogo} alt="ATA Logo" className="logo" />
          <p>Please enter your email to forgot your password</p>
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

          <button type="submit" className="auth-button">
            Send Password Reset Link
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
