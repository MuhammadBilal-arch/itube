import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  FETCH_USER
} from "../actionType";
import axios from "axios";

export const createUserRequest = () => ({
  type: CREATE_USER_REQUEST,
});

export const createUserSuccess = (user) => ({
  type: CREATE_USER_SUCCESS,
  payload: user,
});

export const getUserSuccess = (user) => ({
  type: FETCH_USER,
  payload: user,
});

export const createUserFailure = (error) => ({
  type: CREATE_USER_FAILURE,
  payload: error,
});

export const createUser = (user) => {
  return function (dispatch) {
    dispatch(createUserRequest());
    axios
      .post("http://localhost:4000/api/user", user)
      .then((response) => {
        const user = response.data;
        dispatch(createUserSuccess(user));
      })
      .catch((response) => {
        const errors = response.data;
        dispatch(createUserFailure(errors));
      });
  };
};

export const getUser = (user) => {
  // console.log(user)
  return function (dispatch) {
    dispatch(createUserRequest());
    axios
      .get(`http://localhost:4000/api/user/getuser/${user}`)
      .then((response) => {
        const userData = response.data;
        dispatch(getUserSuccess(userData));
      })
      .catch((response) => {
        const errors = response.data;
        dispatch(createUserFailure(errors));
      });
  };
};