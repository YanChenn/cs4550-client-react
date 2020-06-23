import React from "react";
import {Link} from "react-router-dom";

export default class LessonTabsComponent extends React.Component {
    state = {
        editingLesson: {}
    };

    componentDidMount() {
        this.props.findLessonsForModule(this.props.params.moduleId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.params.moduleId !== this.props.params.moduleId) {
            this.props.findLessonsForModule(this.props.params.moduleId)
        }
    }

    renderTab = (lesson, isEditing, isHighlight) => (
        <li className="nav-item">
            {!isHighlight &&
             <span className="nav-link">
                 {this.renderEditing(isEditing, lesson)}
             </span>}

            {isHighlight &&
             <span className="nav-link active">
                 {this.renderEditing(isEditing, lesson)}
             </span>}

        </li>
    );

    renderEditing = (isEditing, lesson) => (
        <div>
            {!isEditing &&
             <span>
                <Link
                    to={`/editor/course/${this.props.params.courseId}/modules/${this.props.params.moduleId}/lessons/${lesson._id}`}>
                    {lesson.title}
                </Link>

                <button className="btn btn-primary"
                        onClick={() => this.setState(
                            {editingLesson: lesson})}>
                    <i className="fa fa-pencil"/>
                </button>
             </span>
            }

            {isEditing &&
             <span>
                     <input className="form-control"
                            onChange={(e) => {
                                const newTitle = e.target.value;
                                this.setState(prevState => ({
                                    editingLesson: {
                                        ...prevState.editingLesson,
                                        title: newTitle
                                    }
                                }))
                            }
                            }
                            value={this.state.editingLesson.title}
                     />
                     <button className="btn btn-danger"
                             onClick={() => this.props.deleteLesson(lesson._id)}>
                         <i className="fa fa-trash"/>
                     </button>
                     <button
                         className="btn btn-success"
                         onClick={() => {
                             this.props.updateLesson(
                                 this.state.editingLesson._id,
                                 this.state.editingLesson);
                             this.setState({editingLesson: {}})
                         }
                         }>
                         <i className="fa fa-check"/>
                     </button>
                 </span>
            }
        </div>
    );

    render() {
        return (
            <div>
                <h3>Lesson Tabs
                    {/*moduleID: {this.props.params.moduleId}*/}
                </h3>
                <ul className="nav nav-tabs">
                    {this.props.lessons.map(
                        lesson =>
                            <div key={lesson._id}>
                                {this.renderTab(lesson,
                                                this.state.editingLesson._id === lesson._id,
                                                this.props.params.lessonId === lesson._id ||
                                                this.state.editingLesson._id === lesson._id)}

                            </div>)}
                </ul>

                <button
                    className="btn btn-primary"
                    onClick={() => {
                        if (this.props.params.moduleId !== undefined) {
                            this.props.createLesson(
                                this.props.params.moduleId,
                                {
                                    title: 'New Lesson'
                                })
                        }
                    }}>
                    <i className="fa fa-plus fa-lg"/>
                </button>
            </div>
        )
    }
}

