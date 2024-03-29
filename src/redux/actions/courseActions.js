import * as types from "./actionTypes";
import * as courseApis from "../../api/courseApi";

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function updateCoursesSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function createCoursesSuccess(course) {
  return { type: types.CREATE_COURSES_SUCCESS, course };
}

export function loadCourses() {
  return function(dispatch) {
    return courseApis
      .getCourses()
      .then(courses => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveCourse(course) {
  return function(dispatch, getState) {
    // getState can be useful; this is where you have access of all redux-state across the app here
    return courseApis
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCoursesSuccess(savedCourse))
          : dispatch(createCoursesSuccess(savedCourse));
      })
      .catch(error => {
        throw error;
      });
  };
}
