import { client } from "@/api/api";
import {
  FETCH_MY_FOLLOW_UPS_ERROR,
  FETCH_MY_FOLLOW_UPS_PENDING,
  FETCH_MY_FOLLOW_UPS_SUCCESS,
} from "@/constants";
import { Dispatch } from "@reduxjs/toolkit";

export const getMyFollowUps = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_MY_FOLLOW_UPS_PENDING });
    try {
      const response = await client.get(`/followups/my-follow-ups`);

      dispatch({
        type: FETCH_MY_FOLLOW_UPS_SUCCESS,
        payload: response.data.followups,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_MY_FOLLOW_UPS_ERROR,
        payload: {
          message: error.response?.data?.message || "Something went wrong",
        },
      });
    }
  };
};
