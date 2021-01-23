import { combineReducers } from "redux";
import { UserReducer } from "./Reducers/UserReducers/UserReducer"
import { UsersReducer } from "./Reducers/UserReducers/UsersReducer";

export const RootReducer = combineReducers({
    UsersReducer: UsersReducer,
    UserReducer : UserReducer
});