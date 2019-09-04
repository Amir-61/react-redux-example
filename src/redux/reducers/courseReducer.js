import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS: {
      return action.courses;
    }
    case types.UPDATE_COURSE_SUCCESS: {
      // state is immutable and we should not change state; we can use map, filter, spread operator,.... but not pop, push or ...
      return state.map(course =>
        course.id === action.course.id ? action.course : course
      );
    }
    case types.CREATE_COURSES_SUCCESS: {
      return [...state, { ...action.course }];
    }
    default:
      return state;
  }
}
