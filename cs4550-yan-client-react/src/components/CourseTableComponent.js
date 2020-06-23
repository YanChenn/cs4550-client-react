import React from "react";
import CourseRowComponent from "./CourseRowComponent";

export default class CourseTableComponent
    extends React.Component {

    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th className="d-none d-sm-table-cell">Owned by</th>
                        <th className="d-none d-md-table-cell">Last Modified</th>
                        <th>
                            <i onClick={() => this.props.setLayout('grid')}
                               className="fa fa-th pr-2"/>
                            <i className="fa fa-sort-alpha-asc"/>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.courses.map(course =>
                                                   <CourseRowComponent
                                                       deleteCourse={this.props.deleteCourse}
                                                       selectCourse={this.props.selectCourse}
                                                       selected={this.props.selected === course._id}
                                                       key={course._id}
                                                       course={course}/>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}