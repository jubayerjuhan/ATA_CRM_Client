import { Dispatch } from "@reduxjs/toolkit";

import {
  ADD_LEAD_ERROR,
  FETCH_LEADS_PENDING,
  ADD_LEAD_SUCCESS,
  FETCH_LEADS_SUCCESS,
  FETCH_LEADS_ERROR,
  ADD_LEAD_PENDING,
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

export const getAllLeads = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_LEADS_PENDING });
    try {
      const response = await client.get("/leads");

      dispatch({
        type: FETCH_LEADS_SUCCESS,
        payload: response.data.leads,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_LEADS_ERROR,
        payload: {
          message: error.response?.data?.message || "Something went wrong",
        },
      });
    }
  };
};
