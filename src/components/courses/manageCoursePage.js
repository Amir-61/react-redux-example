import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorsActions";
import PropTypes from "prop-types";

// we now use functional componenet with useEffect which makes the componenet statefull
function ManageCoursePage({ loadCourses, loadAuthors }) {
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

  return (
    <div className="jumbotron">
      <h4>Manage Course page:</h4>
    </div>
  );
}

ManageCoursePage.PropTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
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
