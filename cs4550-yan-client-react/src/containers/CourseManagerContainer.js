import React from "react";
import courseService from "../services/CourseService";
import CourseTableComponent from "../components/CourseTableComponent";
import CourseGridComponent from "../components/CourseGridComponent";

export default class CourseManagerContainer
    extends React.Component {
    state = {
        layout: this.props.match.params.layout,
        courses: [],
        newCourseTitle: 'New Title',
      selected:null
    };

    componentDidMount() {
        courseService.findAllCourses()
            .then(actualArrayOfCourses =>
                      this.setState({
                                        courses: actualArrayOfCourses
                                    }))
    };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.match.params.layout !== this.props.match.params.layout) {
      courseService.findAllCourses()
      .then(actualArrayOfCourses =>
          this.setState({
            layout: this.props.match.params.layout,
            courses: actualArrayOfCourses
          }))
    }
  };

    setLayout = (layout) => {
        this.props.history.push(`/${layout}/courses`)
    };

    deleteCourse = (courseToDelete) =>
        courseService.deleteCourse(courseToDelete._id)
            .then(status => this.setState(prevState => ({
                courses: prevState
                    .courses.filter(course => course !== courseToDelete)
            })));

  selectCourse  = (courseId) => {this.setState({
    selected: courseId
  })}

    addCourse = (title) =>
        courseService.createCourse({
                                       title: title,
                                       owner: 'me',
                                       modified: (new Date()).toDateString()
                                   })
            .then(theActualNewCourse =>
                      this.setState((prevState) => {
                          return {
                              courses: [
                                  ...prevState.courses,
                                  theActualNewCourse
                              ]
                          }
                      }));

    render() {
        return (
            <div>
                <div className="input-group mb-3">
                    <input className="form-control"
                           onChange={(event) => this.setState({
                                                                  newCourseTitle: event.target.value
                                                              })}
                           value={this.state.newCourseTitle}
                           placeholder="Course Title"/>
                    <button className="btn btn-outline-primary"
                            onClick={
                                () => this.addCourse(this.state.newCourseTitle)}>
                        Add Course
                    </button>
                </div>
                {
                    this.state.layout === 'table' &&
                    <CourseTableComponent
                        setLayout={this.setLayout}
                        deleteCourse={this.deleteCourse}
                        selected={this.state.selected}
                        courses={this.state.courses}/>
                }
                {
                    this.state.layout === 'grid' &&
                    <CourseGridComponent setLayout={this.setLayout}
                                         deleteCourse={this.deleteCourse}
                                         selected={this.state.selected}
                                         courses={this.state.courses}/>
                }
            </div>
        );
    }
}
