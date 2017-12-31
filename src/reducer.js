import { combineReducers } from "redux-immutable";
import changelogReducer from "./reducers/changelog";
import appReducer from "./reducers/app";
import userReducer from "./reducers/user";
import helpReducer from "./reducers/help";

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  changelog: changelogReducer,
  help: helpReducer,
});

export default rootReducer;
