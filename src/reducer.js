import { combineReducers } from "redux-immutable";
import changelogReducer from "./reducers/changelog";
import appReducer from "./reducers/app";
import notificationReducer from "./reducers/notification"
import userReducer from "./reducers/user";
import helpReducer from "./reducers/help";

const rootReducer = combineReducers({
  app: appReducer,
  notification: notificationReducer,
  user: userReducer,
  changelog: changelogReducer,
  help: helpReducer,
});

export default rootReducer;
