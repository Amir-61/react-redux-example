import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./pageNotFound/pageNotFound";
import CoursesPage from "./courses/coursesPage";
import ManageCoursePage from "./courses/manageCoursePage";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route path="/about" component={AboutPage}></Route>
        <Route path="/courses" component={CoursesPage}></Route>
        <Route path="/course:slugId" component={CoursesPage}></Route>
        <Route path="/course" component={ManageCoursePage}></Route>
        <Route component={ManageCoursePage}></Route>
      </Switch>
    </div>
  );
}

export default App;
