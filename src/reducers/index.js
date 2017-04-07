import {combineReducers} from "redux";
// courses is an alias for courseReducer
import courses from "./courseReducer";
// authors is an alias for authorReducer
import authors from "./authorReducer";
import ajaxCallsInProgress from './ajaxStatusReducer';

// Using combineReducers to map reducer (RHS) to slice of state (LHS).
// E.g. courses: courses
const rootReducer = combineReducers({
  // Using ES6 shorthand property name
  courses,
  authors,
  ajaxCallsInProgress
});

export default rootReducer;
