import { combineReducers } from "redux-immutable";
import appReducer from "./reducers/app";

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;
