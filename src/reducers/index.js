import {combineReducers} from "redux";
// courses is an alias for courseReducer
import courses from "./courseReducer";
import authors from "./authorReducer";
const rootReducer = combineReducers({
  // Using ES6 shorthand property name
  courses,
  authors
});

export default rootReducer;
