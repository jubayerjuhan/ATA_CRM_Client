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
  FETCH_SINGLE_LEAD_PENDING,
  FETCH_SINGLE_LEAD_SUCCESS,
  FETCH_SINGLE_LEAD_ERROR,
} from "@/constants";
import { client } from "@/api/api";
import toast from "react-hot-toast";
import { LeadType } from "@/types";

export const addLead = (data: LeadType) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: ADD_LEAD_PENDING });
    try {
      const { data: leadData } = await client.post("/leads", data);

      dispatch({
        type: ADD_LEAD_SUCCESS,
        payload: {
          message: "Form Submitted Successfully",
          insertedLeadId: leadData.lead._id,
        },
      });
      return leadData.lead._id; // Return the ID directly
    } catch (error: any) {
      dispatch({
        type: ADD_LEAD_ERROR,
        payload: {
          message: error.response?.data?.message || "Something went wrong",
        },
      });
      throw error;
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

export const getAllCustomers = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_LEADS_PENDING });
    try {
      const response = await client.get("/customers");

      dispatch({
        type: FETCH_LEADS_SUCCESS,
        payload: response.data.customers,
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
// Get converted leads
export const getConvertedLeads = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_LEADS_PENDING });
    try {
      const response = await client.get(`/leads/converted-leads/list`);

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

// get cancelled leads
export const getCancelledLeads = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_LEADS_PENDING });
    try {
      const response = await client.get(`/leads/cancelled-leads/list`);

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

// Fetch a single lead
export const getSingleLead = (leadId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_SINGLE_LEAD_PENDING });
    try {
      const response = await client.get(`/leads/${leadId}`);

      dispatch({
        type: FETCH_SINGLE_LEAD_SUCCESS,
        payload: response.data.lead,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_SINGLE_LEAD_ERROR,
        payload: {
          message: error.response?.data?.message || "Something went wrong",
        },
      });
    }
  };
};

// edit lead
export const editLead = async (data: LeadType) => {
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

// edit lead
// Update the claimLead function in your actions file
export const claimLead = async (data: LeadType) => {
  try {
    await client.post(`/leads/${data._id}/claim-lead`, data);
    toast.success("Lead Claimed Successfully");
    return true;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Something went wrong");
    return false;
  }
};

// Search Lead With email
export const searchLeadWithEmail = async (email: string) => {
  try {
    const response = await client.post(`/leads/search`, { email });
    toast.success("Existing Information Found");

    return response.data.lead;
  } catch (error: any) {
    return null;
  }
};
