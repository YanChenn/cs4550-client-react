import React from "react";
import {Link} from "react-router-dom";
import ModuleListContainer from "./ModuleListContainer";
import LessonTabsContainer from "./LessonTabsContainer";
import TopicPillsContainer from "./TopicPillsContainer";
import WidgetListContainer from "./WidgetListContainer";
import CourseService from "../services/CourseService";

export default class CourseEditorContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
    }

    componentDidMount() {
        CourseService.findCourseById(this.props.match.params.courseId)
            .then(course =>
                      this.setState({
                                        title: course.title
                                    }));
    }

  render() {
    return (
        <div className="container">
          <div className="font-weight-bold">
            <div className="row ">
              <div className="col-2 col-md-1">
                <Link className="align-middle"
                      to={`/table/courses`}>
                  <i className="fa fa-times fa-lg"></i>
                </Link>
              </div>
              <div
                  className="col-10 col-md-2 text-truncate align-middle"
                  title={this.state.courseName}>
                {this.state.courseName}
              </div>
              <div className="col-12 col-md-9">
                {
                  <LessonTabsContainer {...this.props.match}/>
                }
              </div>
            </div>
          </div>
          <div className="row wbdv-no-margin">
            {
              <ModuleListContainer {...this.props.match}/>
            }
            <div className="col-md-8 wbdv-no-padding">
              {
                <TopicPillsContainer {...this.props.match}/>
              }
              <div className="">
                {
                  this.props.match.params.topicId &&
                  <WidgetListContainer {...this.props.match}/>
                }
              </div>
            </div>
          </div>
        </div>
    )
  }

}
