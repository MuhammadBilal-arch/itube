import axios from 'axios';
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "../actionType";

export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

export const fetchUsers = () => {
    return function(dispatch)
    {
        dispatch(fetchUsersRequest())
        axios
        .get("http://localhost:4000/api/user")
        .then( response =>         
        {
            const users = response.data;
            dispatch(fetchUsersSuccess(users))
        })
        .catch( response => 
        {
            const errors = response.data;
            dispatch(fetchUsersFailure(errors))
        })
    }
}