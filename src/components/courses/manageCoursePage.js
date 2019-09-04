import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorsActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { course } from "../../../tools/mockData";

// we now use functional componenet with useEffect and useState which make the componenet statefull
function ManageCoursePage({ authors, loadCourses, loadAuthors, ...props }) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setError] = useState({});

  useEffect(() => {
    // get courses list
    loadCourses().catch(error => {
      alert(`Eorror to load courses: ${error}`);
    });

    // get authors list
    loadAuthors().catch(error => {
      alert(`Eorror to load authors: ${error}`);
    });
  }, []);
  // useEffect is exactly like componentDidMount and only runs once;
  // it is newer semantic; let's use this instead of class componenets;
  // there is no need to use class componenet anymore.

  return <CourseForm course={course} authors={authors} errors={errors}/>;
}

ManageCoursePage.PropTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    course: course, // this one comes from import from mockData (empty course object)
    courses:
      !state.authors || state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(
                author => author.id === course.authorId
              ).name
            };
          }),
    authors: state.authors
  };
}

// lets use an object instead of the one we used in cursePage with `bindActionCreators`
const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors
};

// another way of doing `mapDispatchToProps`:
// const mapDispatchToProps = {
//   createCourse: courseActions.createCourse
// }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
