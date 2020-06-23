import React from "react";
import {Link} from "react-router-dom";
import courseService from '../services/CourseService'

export default class CourseCardComponent extends React.Component {
    state = {
        editing: false,
        unsaved_changes: this.props.course,
        course: this.props.course
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.selected && !this.props.selected) {
            this.setState({
                editing: false,
                unsaved_changes: this.state.course
            })
        }
    }

    setEditing = (editing) =>
        this.setState({editing: editing})

    ok = () => {
        this.setState({
            course: this.state.unsaved_changes
        })
        courseService.updateCourse(
            this.state.unsaved_changes._id,
            this.state.unsaved_changes)
        .then(status => this.setEditing(false))
    }

    updateCourseTitle = (newTitle) =>
        this.setState(prevState => ({
            unsaved_changes: {
                ...prevState.unsaved_changes,
                title: newTitle
            }
        }))

    render() {
        return (
            <div className="col mb-4">
                <div className="card"
                     onClick={() => this.props.selectCourse(this.state.course._id)}>
                    <span className={this.props.selected ? 'card-selected' : ''}>
                        {
                            !this.state.editing && this.props.selected &&
                            <span>
                                <i className="fa fa-pencil fa-lg float-right"
                                   onClick={() => this.setEditing(true)}/>
                                <i className="fa fa-trash fa-lg float-right"
                                   onClick={() => this.props.deleteCourse(this.props.course)}/>
                            </span>
                        }
                        <img className="card-img-top" src={require('../card-preview-image.png')}
                             alt="Card image cap"/>
                        <div className="row card-body">
                            <div className="col-10 ">
                                {
                                    !this.state.editing &&
                                    <p className={this.props.selected ?
                                        'text-truncate card-title' :
                                        'text-truncate card-title'}>
                                        <Link to={`/editor/${this.state.course._id}`}>
                                            <span>
                                                {this.state.course.title}
                                            </span>
                                        </Link>
                                    </p>
                                }
                                {
                                    this.state.editing && this.props.selected &&
                                    <input
                                        className="form-control align-middle"
                                        onChange={(event) => this.updateCourseTitle(event.target.value)}
                                        value={this.state.unsaved_changes.title}/>
                                }
                                <div className="align-middle">
                                    <span>
                                        <i className="fa fa-file-text align-middle "></i>
                                    </span>
                                    <span className="wbdv-card-time align-bottom">
                                        <span>
                                            {this.state.course.modified}
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="col-2">
                                {
                                    this.state.editing &&
                                    <i className="fa fa-check align-top "
                                       onClick={this.ok}/>
                                }
                            </div>
                        </div>
                    </span>
                </div>
            </div>
        )
    }
}
