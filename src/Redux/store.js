import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// import { UsersReducer } from "./Reducers/UserReducers/UsersReducer";
import { RootReducer } from "./rootReducer";
export const store = createStore(
  RootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
