import {
  CLEAR_ERROR,
  CLEAR_MESSAGE,
  FETCH_MY_FOLLOW_UPS_ERROR,
  FETCH_MY_FOLLOW_UPS_PENDING,
  FETCH_MY_FOLLOW_UPS_SUCCESS,
} from "../../constants";

export const followUpReducer = (state = {}, action: any) => {
  switch (action.type) {
    case FETCH_MY_FOLLOW_UPS_PENDING:
      return {
        ...state,
        loading: true,
      };

    case FETCH_MY_FOLLOW_UPS_SUCCESS:
      return {
        ...state,
        loading: false,
        myFollowUps: action.payload,
      };

    case FETCH_MY_FOLLOW_UPS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case CLEAR_MESSAGE:
      return {
        ...state,
        message: null,
      };

    default:
      return state;
  }
};
