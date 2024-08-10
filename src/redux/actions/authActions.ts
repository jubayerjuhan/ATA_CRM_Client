import { Dispatch } from "@reduxjs/toolkit";

import {
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_PENDING,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_ERROR,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_PENDING,
  RESET_PASSWORD_SUCCESS,
} from "../../constants";

import { client } from "../../api/api";

export const loginToCRM = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: LOGIN_PENDING });
    try {
      const response = await client.post("/auth/login", {
        email,
        password,
      });
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    } catch (error: any) {
      dispatch({
        type: LOGIN_ERROR,
        payload: {
          message: error.response?.data?.message || "Something went wrong",
        },
      });
    }
  };
};

export const forgotPasswordAction = (email: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FORGOT_PASSWORD_PENDING });
    try {
      await client.post("/auth/forgot-password", {
        email,
      });

      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: "Your Forgot Password Link Has Been Sent To Your Email",
      });
    } catch (error: any) {
      dispatch({
        type: FORGOT_PASSWORD_ERROR,
        payload: {
          message: error.response.data.message
            ? error.response.data.message
            : "Something went wrong",
        },
      });
    }
  };
};

export const resetPasswordAction = (token: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: RESET_PASSWORD_PENDING });
    try {
      await client.post(`/auth/reset-password/${token}`, { password });

      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: "Your password has been reset successfully",
      });
    } catch (error: any) {
      dispatch({
        type: RESET_PASSWORD_ERROR,
        payload: {
          message: error.response?.data?.message || "Something went wrong",
        },
      });
    }
  };
};
