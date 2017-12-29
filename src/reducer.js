import { combineReducers } from "redux-immutable";
import changelogReducer from "./reducers/changelog";
import appReducer from "./reducers/app";
import userReducer from "./reducers/user";

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  changelog: changelogReducer,
});

export default rootReducer;
