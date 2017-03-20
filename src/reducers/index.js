import {combineReducers} from "redux";
// courses is an alias for courseReducer
import courses from "./courseReducer";
const rootReducer = combineReducers({
  // ES6 shorthand property name
  courses
});

export default rootReducer;
