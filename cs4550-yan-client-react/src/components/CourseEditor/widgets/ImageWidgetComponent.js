import React from "react";

export default class ImageWidgetComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            name: '',
            type: 'IMAGE',
            url: '',
            order: 1
        }
    }

    componentDidMount() {
        this.setState({
                          name: this.props.widget.name,
                          type: this.props.widget.type,
                          url: this.props.widget.url,
                          order: this.props.widget.widgetOrder
                      })
    }

    update = () => {
        this.props.updateWidget(this.props.widget.id,
                                {
                                    ...this.props.widget,
                                    name: this.state.name,
                                    type: this.state.type,
                                    widgetOrder: this.state.order,
                                    url: this.state.url
                                });

    };

    render() {
        return <div>
            <div className={'form-row'}>
                <h3>Image Widget</h3>
                {this.state.editing &&
                 <span>
                     {
                         this.props.widget.widgetOrder !== 1 &&
                         <button className={'btn btn-warning'}
                                 onClick={() => this.props.moveUp(
                                     this.props.widget)}>
                             <i className="fa fa-arrow-up"/>
                         </button>
                     }
                     {
                         !this.props.isLast &&
                         <button className={'btn btn-warning'}
                                 onClick={() => this.props.moveDown(
                                     this.props.widget)}>
                             <i className="fa fa-arrow-down"/>
                         </button>
                     }
                     <button className={'btn btn-primary'}
                             onClick={() => {
                                 this.update();
                                 this.setState({editing: false})
                             }}>
                        <i className="fa fa-check"/>
                    </button>
                    <button className={'btn btn-danger'}
                            onClick={() => this.props.delete(this.props.widget)}>
                        <i className="fa fa-trash"/>
                    </button>
                </span>}
                {!this.state.editing &&
                 <span className='float-right'>
                 <button className={'btn btn-success'}
                         onClick={() => this.setState({editing: true})}>
                     <i className="fa fa-pencil"/>
                 </button>
                     </span>
                }
            </div>
            {!this.state.editing &&
             <img src={this.props.widget.url} alt={this.props.widget.name}/>
            }

            {this.state.editing &&
             <form>
                 <div className={'form-group row'}>
                     <label className="col-md-2 col-form-label"
                            htmlFor={`imageUrl${this.props.widget.url}`}>
                         Url:
                     </label>
                     <div className={'col-md-10'}>
                        <textarea value={this.state.url}
                                  placeholder="Url"
                                  className="form-control"
                                  id={`imageUrl${this.props.widget.url}`}
                                  onChange={(e) => this.setState({url: e.target.value})}/>
                     </div>
                 </div>
                 <div className={'form-group row'}>
                     <label className="col-md-2 col-form-label"
                            htmlFor={`imageName${this.props.widget.id}`}>
                         Widget Name:
                     </label>
                     <div className={'col-md-10'}>
                         <input value={this.state.name}
                                placeholder="Widget Name"
                                className="form-control"
                                onChange={(e) => this.setState({name: e.target.value})}
                                id={`imageName${this.props.widget.id}`}/>
                     </div>
                 </div>

                 <div className={'form-group row'}>
                     <label className="col-md-2 col-form-label"
                            htmlFor={`imageType${this.props.widget.id}`}>
                         Widget Type:
                     </label>
                     <div className={'col-md-10'}>
                         <select className="form-control"
                                 value={this.state.type}
                                 id={`imageType${this.props.widget.id}`}
                                 onChange={(e) => this.setState({type: e.target.value})}>
                             <option value='HEADING'>Heading</option>
                             <option value='PARAGRAPH'>Paragraph</option>
                             <option value='IMAGE'>Image</option>
                             <option value='LIST'>List</option>
                         </select>
                     </div>
                 </div>

             </form>}
        </div>
    }
}