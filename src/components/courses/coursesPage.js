import React from "react";

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
    alert(this.state.course.title);
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
        </form>
      </div>
    );
  }
}

export default CoursesPage;
