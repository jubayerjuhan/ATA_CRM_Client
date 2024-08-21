import {
  ADD_LEAD_ERROR,
  ADD_LEAD_PENDING,
  ADD_LEAD_SUCCESS,
  CLEAR_ERROR,
  CLEAR_MESSAGE,
  FETCH_LEADS_ERROR,
  FETCH_LEADS_PENDING,
  FETCH_LEADS_SUCCESS,
} from "../../constants";

export const leadReducer = (state = { leads: [] }, action: any) => {
  switch (action.type) {
    case ADD_LEAD_PENDING:
      return {
        ...state,
        loading: true,
      };
    case ADD_LEAD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        success: true,
      };
    case ADD_LEAD_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.message,
      };

    case FETCH_LEADS_PENDING:
      return {
        ...state,
        loading: true,
      };

    case FETCH_LEADS_SUCCESS:
      return {
        ...state,
        loading: false,
        leads: action.payload,
      };

    case FETCH_LEADS_ERROR:
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
