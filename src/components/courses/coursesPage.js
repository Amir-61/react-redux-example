import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

// I use class here for now top have it have it statefull;
// later on I refactor it to use React Hooks. ie. state and effect hooks
class CoursesPage extends React.Component {
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
        <h1>Courses</h1>
        <h3>Course:</h3>
        <form onSubmit={this.handleOnSubmit}>
          <input
            type="text"
            onChange={this.handleOnChange}
            value={this.state.course.title}
          />
          <input type="submit" value="Save" />
          {this.props.courses.map(course => (
            <div key={course.title}>{course.title}</div>
          ))}
        </form>
      </div>
    );
  }
}

CoursesPage.PropTypes = {
  actions: PropTypes.object.isRequired,
  Courses: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
    // If you want to map multiple actions using 'bindActionCreators':
    // actions: bindActionCreators({ ...SomeActions, ...OtherActions }, dispatch)
    // OR
    // actions: bindActionCreators(Object.assign({}, SomeActions, OtherActions), dispatch)
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
