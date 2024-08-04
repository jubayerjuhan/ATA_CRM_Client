import { Dispatch } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import {
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_PENDING,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_ERROR,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
} from "../../constants";
import { base_url, client } from "../../api/api";

export const loginToCRM = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: LOGIN_PENDING });
    try {
      const response = await client.post("/auth/login", {
        email,
        password,
      });
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      toast.success("Login Successful");
    } catch (error: any) {
      dispatch({ type: LOGIN_ERROR, payload: error.response.data });
    }
  };
};

export const forgotPasswordAction = (email: string) => {
  return async (dispatch: Dispatch) => {
    console.log(base_url, "Base URL...");
    console.log(import.meta.env.NODE_ENV, "Node ENV...");
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
