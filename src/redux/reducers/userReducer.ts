import {
  CLEAR_ERROR,
  CLEAR_MESSAGE,
  FETCH_USERS_ERROR,
  FETCH_USERS_PENDING,
  FETCH_USERS_SUCCESS,
} from "@/constants";

export const userReducer = (state = {}, action: any) => {
  switch (action.type) {
    case FETCH_USERS_PENDING:
      return {
        ...state,
        loading: true,
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case FETCH_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
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
