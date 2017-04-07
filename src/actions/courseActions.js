// Below declaration allows type constants to be referred as types.XXX_YYY_ZZZ.
import * as types from "./actionTypes";
// Below mock API can be swapped in with the actual API when it's ready
import courseApi from "../api/mockCourseApi";
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

// Action creators ending with Success will get called upon successful
// API calls
export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

// loadCourses will be called at the entry point, i.e. src/index.js
export function loadCourses() {
  return function(dispatch) {
    // Putting beginAjaxCall in here instead of mock API in order to have
    // the flexitibility of not calling it for certain AJAX calls.
    // For example: optimistic update (without waiting for AJAX calls to return)
    // for deletion of record.
    dispatch(beginAjaxCall());
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      throw(error);
    });
  };
}

// saveCourse will be called when the Course Form is saved
export function saveCourse(course) {
  // Need to cache the course ID as saveCourse will populate a new course
  // object with an ID.
  const courseId = course.id;
  // Redux Thunk middleware allows you to write action creators that return a
  // function instead of an action. The thunk can be used to delay the dispatch
  // of an action, or to dispatch only if a certain condition is met. The inner
  // function receives the store methods dispatch and getState as parameters.
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
    return courseApi.saveCourse(course).then(course => {
      // If a course ID exists then it's an existing course to be updated.
      courseId ? dispatch(updateCourseSuccess(course)) :
        dispatch(createCourseSuccess(course));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
