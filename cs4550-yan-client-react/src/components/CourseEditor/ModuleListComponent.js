import React from "react";
import {Link} from "react-router-dom";

export default class ModuleListComponent extends React.Component {
    state = {
        newModuleTitle: 'New Module',
        editingModule: {}
    };

    componentDidMount() {
        this.props.findModuleForCourse(this.props.params.courseId)
    }

    renderEditing = (module) => (
        <div>
            {this.state.editingModule._id === module._id &&
             <span>
                 <input className="form-control"
                     onChange={(e) => {
                         const newTitle = e.target.value;
                         this.setState(prevState => ({
                             editingModule: {
                                 ...prevState.editingModule,
                                 title: newTitle
                             }
                         }))
                     }
                     }
                     value={this.state.editingModule.title}
                 />
                 <button className="btn btn-danger"
                         onClick={() => this.props.deleteModule(
                             module._id)}>
                     <i className="fa fa-trash"/>
                 </button>
                 <button
                     className="btn btn-success"
                     onClick={() => {
                         this.props.updateModule(
                             this.state.editingModule._id,
                             this.state.editingModule);
                         this.setState({editingModule: {}})
                     }
                     }>
                     <i className="fa fa-check"/>
                 </button>
             </span>
            }

            {
                this.state.editingModule._id !== module._id &&
                <span>

                    <Link
                        to={`/editor/course/${this.props.params.courseId}/modules/${module._id}`}>
                        {module.title}
                    </Link>

                    <button className="btn btn-primary"
                            onClick={() => this.setState(
                                {editingModule: module})}>
                        <i className="fa fa-pencil"/>
                    </button>
                </span>
            }

        </div>);

    render() {
        return (
            <div>
                <ul className="list-group">
                    {
                        this.props.modules.map(
                            module =>
                                <div key={module._id}>
                                    {this.props.params.moduleId === module._id &&
                                     <li key={module._id}
                                         className="list-group-item list-group-item-action list-group-item-primary">
                                         {this.renderEditing(module)}
                                     </li>}
                                    {this.props.params.moduleId !== module._id &&
                                     <li key={module._id}
                                         className="list-group-item list-group-item-action">
                                         {this.renderEditing(module)}
                                     </li>
                                    }
                                </div>
                        )}
                </ul>
                <input className="form-control"
                    onChange={(event) =>
                        this.setState({
                                          newModuleTitle: event.target.value
                                      })
                    }
                    value={this.state.newModuleTitle}
                />
                <button className="btn btn-primary"
                        onClick={() => this.props.createModule(
                            this.props.params.courseId,
                            {
                                title: this.state.newModuleTitle
                            })}>

                    <i className="fa fa-plus fa-lg"/>
                </button>
            </div>
        )
    }
}

