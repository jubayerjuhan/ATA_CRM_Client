import {
  CLEAR_ERROR,
  CLEAR_MESSAGE,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_PENDING,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_ERROR,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
} from "../../constants";

export const authReducer = (state = {}, action: any) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        message: action.payload.message,
      };
    case LOGIN_ERROR:
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

    // For Forgot Password Cases
    case FORGOT_PASSWORD_PENDING:
      return {
        ...state,
        loading: true,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
