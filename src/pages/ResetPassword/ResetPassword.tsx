import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { AppDispatch, AppState } from "../../types";
import { resetPasswordAction } from "../../redux/actions";

import AgencyLogo from "../../assets/air_ticket_agency.png";

import "../../common/styles/AuthPageDesign.scss";
import toast from "react-hot-toast";
import { CLEAR_ERROR, CLEAR_MESSAGE } from "../../constants";

import { AppButton } from "../../components";

// Interface for form values
interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

export const ResetPassword: React.FC = () => {
  const { token } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const { auth: authState } = useSelector((state: AppState) => state);

  const [isTokenValid] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormValues>();

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (token) {
      await dispatch(resetPasswordAction(token, data.password));
    }
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
          <p>Please enter your new password</p>
        </div>
        {!isTokenValid ? (
          <AppButton primary>Verify Your Link First</AppButton>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="password"
              placeholder="Enter your new password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}

            <input
              type="password"
              placeholder="Confirm your new password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword.message}</p>
            )}

            <button type="submit" className="auth-button">
              Reset Password
            </button>
          </form>
        )}
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
