import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorsActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./courseList";

// I use class here for now top have it have it statefull;
// later on I refactor it to use React Hooks. ie. state and effect hooks
class CoursesPage extends React.Component {
  componentDidMount() {
    const { actions } = this.props;
    const { loadCourses, loadAuthors } = actions;

    // get courses list
    loadCourses().catch(error => {
      alert(`Eorror to load courses: ${error}`);
    });

    // get authors list
    loadAuthors().catch(error => {
      alert(`Eorror to load authors: ${error}`);
    });
  }

  state = {
    course: {
      title: ""
    }
  };

  handleOnChange = event => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  };

  handleOnSubmit = event => {
    event.preventDefault();
    this.props.actions.createCourse(this.state.course);
    this.setState({ course: { title: "" } });
  };

  render() {
    return (
      <div className="jumbotron">
        <h4>Course:</h4>
        <form onSubmit={this.handleOnSubmit}>
          <input
            type="text"
            onChange={this.handleOnChange}
            value={this.state.course.title}
          />
          <input type="submit" value="Save" />
        </form>

        <br />

        <CourseList courses={this.props.courses} />
      </div>
    );
  }
}

CoursesPage.PropTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    courses: !state.authors || state.authors.length === 0
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

function mapDispatchToProps(dispatch) {
  return {
    // actions: bindActionCreators(courseActions, dispatch)
    // If you want to map multiple actions using 'bindActionCreators':
    actions: bindActionCreators(
      { ...courseActions, ...authorActions },
      dispatch
    )
    // OR
    // actions: bindActionCreators(Object.assign({}, courseActions, authorActions), dispatch)
  };
}

// another way of doing `mapDispatchToProps`:
// const mapDispatchToProps = {
//   createCourse: courseActions.createCourse
// }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
