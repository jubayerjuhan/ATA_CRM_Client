import { Dispatch } from "@reduxjs/toolkit";

import {
  ADD_LEAD_ERROR,
  ADD_LEAD_PENDING,
  ADD_LEAD_SUCCESS,
} from "@/constants";
import { client } from "@/api/api";

export interface Lead {
  [key: string]: string;
}

export const addLead = (data: Lead) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: ADD_LEAD_PENDING });
    try {
      await client.post("/leads", data);
      dispatch({
        type: ADD_LEAD_SUCCESS,
        payload: { message: "Form Submitted Successfully" },
      });
      // dispatch(getAllUsers() as any);
    } catch (error: any) {
      dispatch({
        type: ADD_LEAD_ERROR,
        payload: {
          message: error.response?.data?.message || "Something went wrong",
        },
      });
    }
  };
};
