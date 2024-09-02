import { Dispatch } from "@reduxjs/toolkit";

import {
  ADD_LEAD_ERROR,
  FETCH_LEADS_PENDING,
  ADD_LEAD_SUCCESS,
  FETCH_LEADS_SUCCESS,
  FETCH_LEADS_ERROR,
  ADD_LEAD_PENDING,
  EDIT_LEAD_PENDING,
  EDIT_LEAD_SUCCESS,
  EDIT_LEAD_ERROR,
} from "@/constants";
import { client } from "@/api/api";
import toast from "react-hot-toast";
import { LeadType } from "@/types";

export const addLead = (data: LeadType) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: ADD_LEAD_PENDING });
    try {
      await client.post("/leads", data);
      dispatch({
        type: ADD_LEAD_SUCCESS,
        payload: { message: "Form Submitted Successfully" },
      });
      toast.success("Lead Added Successfully");
      window.location.reload();
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

// Get leads by user id
export const getLeadsByUserId = (userId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_LEADS_PENDING });
    try {
      const response = await client.get(`/leads/user/${userId}`);

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

// edit lead
export const editLead = (data: LeadType) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: EDIT_LEAD_PENDING });
    try {
      await client.put(`/leads/${data._id}`, data);
      dispatch({
        type: EDIT_LEAD_SUCCESS,
        payload: { message: "Lead Updated Successfully" },
      });
      toast.success("Lead Updated Successfully");
      dispatch(getAllLeads() as any);
    } catch (error: any) {
      dispatch({
        type: EDIT_LEAD_ERROR,
        payload: {
          message: error.response?.data?.message || "Something went wrong",
        },
      });
    }
  };
};
