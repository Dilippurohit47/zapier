import { combineReducers } from "redux";
import userReducer  from "./reducers/userReducer";

const rootReducer = combineReducers({
  userReducer: userReducer,
});

export default rootReducer;