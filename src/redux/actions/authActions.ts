import { Dispatch } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import { LOGIN_ERROR, LOGIN_PENDING, LOGIN_SUCCESS } from "../../constants";
import { client } from "../../api/api";

export const loginToCRM = (email: string, password: string) => {
  console.log(import.meta.env.VITE_BASE_URL, " import.meta.env.VITE_BASE_URL");
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
