import React from "react";
import {Link} from "react-router-dom";
import './TopicPillsComponent.css';

export default class TopicPillsComponent extends React.Component {
    state = {
        editingTopic: {}
    };

    componentDidMount() {
        if (this.props.params.lessonId !== undefined) {
            this.props.findTopicsForLesson(this.props.params.lessonId);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.params.lessonId !== this.props.params.lessonId) {
            this.props.findTopicsForLesson(this.props.params.lessonId)
        }
    }

    renderPill = (topic, isEditing, isHighlight) =>
        <li className="nav-item">
            {!isHighlight &&
             <span className="nav-link">
                 {this.renderEditing(isEditing, topic)}
             </span>}

            {isHighlight &&
             <span className="nav-link active">
                 {this.renderEditing(isEditing, topic)}
             </span>}
        </li>;

    renderEditing = (isEditing, topic) =>
        <div>
            {isEditing &&
             <span>
             <input className="form-control"
                    onChange={(e) => {
                        const newTitle = e.target.value;
                        this.setState(prevState => ({
                            editingTopic: {
                                ...prevState.editingTopic,
                                title: newTitle
                            }
                        }))
                    }
                    }
                    value={this.state.editingTopic.title}
             />
                <button className="btn btn-danger"
                        onClick={() => this.props.deleteTopic(topic.id)}>
                <i className="fa fa-trash"/>
                </button>
                <button
                    className="btn btn-success"
                    onClick={() => {
                        this.props.updateTopic(
                            this.state.editingTopic.id,
                            this.state.editingTopic);
                        this.setState({editingTopic: {}})
                    }
                    }>
                <i className="fa fa-check"/>
                    </button>
             </span>}


            {
                !isEditing &&
                <span className="nav-link">

                    <Link
                        to={`/editor/course/${this.props.params.courseId}/modules/${this.props.params.moduleId}/lessons/${this.props.params.lessonId}/topics/${topic.id}`}>
                    {topic.title}
                    </Link>

                    <button className="btn btn-primary"
                            onClick={() => this.setState(
                                {editingTopic: topic})}>
                    <i className="fa fa-pencil"/>
                    </button>
                    </span>
            }
        </div>;

    render() {
        return (

            <div>
                <h3>Topic Pills
                    {/*lessonID: {this.props.params.lessonId}*/}
                </h3>
                <ul className="nav nav-pills">
                    {this.props.topics.map(
                        topic =>
                            <div key={topic.id}>
                                {this.renderPill(topic, this.state.editingTopic.id === topic.id,
                                                 this.props.params.topicId == topic.id ||
                                                 this.state.editingTopic.id == topic.id)}
                            </div>)}


                </ul>
                <button className="btn btn-primary"
                        onClick={() => {
                            if (this.props.params.lessonId !== undefined) {
                                this.props.createTopic(
                                    this.props.params.lessonId,
                                    {
                                        title: 'New Topic'
                                    })
                            }
                        }}>
                    <i className="fa fa-plus fa-lg"/>
                </button>
            </div>
        )
    }
}

