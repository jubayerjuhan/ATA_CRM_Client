import { client } from "@/api/api";
import {
  FETCH_USERS_ERROR,
  FETCH_USERS_PENDING,
  FETCH_USERS_SUCCESS,
} from "@/constants";

import { Dispatch } from "@reduxjs/toolkit";

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
