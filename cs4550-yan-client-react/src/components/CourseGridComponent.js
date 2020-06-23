import React from "react";
import CourseCardComponent from "./CourseCardComponent";

export default class CourseGridComponent
    extends React.Component {

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Owned by</th>
                        <th>
                            <i onClick={() => this.props.setLayout('table')}
                               className="fa fa-list pr-2"/>
                            <i className="fa fa-sort-alpha-asc"/>
                        </th>
                    </tr>
                    </thead>
                </table>


              <div className="row row-cols-1
          row-cols-sm-2 row-cols-md-3
           row-cols-lg-4 row-cols-xl-6">
                {
                  this.props.courses.map(course =>
                      <CourseCardComponent
                          deleteCourse={this.props.deleteCourse}
                          selectCourse={this.props.selectCourse}
                          key={course._id}
                          course={course}
                          selected={this.props.selected === course._id}/>
                  )}
              </div>
            </div>
        )

    }
}