import { combineReducers } from "redux-immutable";
import appReducer from "./reducers/app";
import userReducer from "./reducers/user";

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
});

export default rootReducer;
