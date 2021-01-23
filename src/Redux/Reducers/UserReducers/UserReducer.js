import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  FETCH_USER,
} from "../../Actions/actionType";

const initialState = {
  loading: false,
  user: {},
  error: "",
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: "",
      };
    case FETCH_USER:
      return {
        loading: true,
        user: action.payload,
        error: "",
      };
    case CREATE_USER_FAILURE:
      return {
        loading: false,
        user: {},
        error: action.payload,
      };
    default:
      return state;
  }
};
