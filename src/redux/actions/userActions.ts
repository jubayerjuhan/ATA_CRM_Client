import { client } from "@/api/api";
import {
  CREATE_USER_ERROR,
  CREATE_USER_PENDING,
  CREATE_USER_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_USERS_PENDING,
  FETCH_USERS_SUCCESS,
} from "@/constants";

import { Dispatch } from "@reduxjs/toolkit";

interface FormValues {
  [key: string]: string; // Dynamic form values
}

export const getAllUsers = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_USERS_PENDING });
    try {
      const response = await client.get("/user/list");
      console.log(response, "response");
      dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data.users });
    } catch (error: any) {
      dispatch({
        type: FETCH_USERS_ERROR,
        payload: {
          message: error.response?.data?.message || "Something went wrong",
        },
      });
    }
  };
};

export const addUser = (data: FormValues) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: CREATE_USER_PENDING });
    try {
      await client.post("/auth/register", data);
      dispatch({ type: CREATE_USER_SUCCESS });
      dispatch(getAllUsers() as any);
    } catch (error: any) {
      dispatch({
        type: CREATE_USER_ERROR,
        payload: {
          message: error.response?.data?.message || "Something went wrong",
        },
      });
    }
  };
};
