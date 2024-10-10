import { client } from "@/api/api";
import {
  EDIT_LEAD_ERROR,
  EDIT_LEAD_PENDING,
  EDIT_LEAD_SUCCESS,
} from "@/constants";
import { getAllLeads } from "@/redux/actions";
import { AppDispatch, LeadType } from "@/types";
import toast from "react-hot-toast";

export const changeLeadStatus = async (
  lead: LeadType,
  dispatch: AppDispatch
) => {
  dispatch({ type: EDIT_LEAD_PENDING });
  try {
    await client.put(`/leads/${lead._id}`, lead);
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
