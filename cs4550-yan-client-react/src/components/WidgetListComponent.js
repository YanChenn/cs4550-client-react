import React from "react";
import HeadingWidgetComponent from "./CourseEditor/widgets/HeadingWidgetComponent";
import ParagraphWidgetComponent from "./CourseEditor/widgets/ParagraphWidgetComponent";
import ImageWidgetComponent from "./CourseEditor/widgets/ImageWidgetComponent";
import ListWidgetComponent from "./CourseEditor/widgets/ListWidget";

export default class WidgetListComponent extends React.Component {

    componentDidMount() {
        if (this.props.params.topicId !== undefined) {
            this.props.findWidgetsForTopic(this.props.params.topicId);
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.params.topicId !== this.props.params.topicId) {
            this.props.findWidgetsForTopic(this.props.params.topicId);
        }
    };

    moveDown = select => {
        let current = select.widgetOrder;
        this.props.widgets.forEach(widget => {
            if (widget.widgetOrder === current) {
                this.props.updateWidget(widget.id,
                    {...widget, widgetOrder: widget.widgetOrder + 1})
            } else if (widget.widgetOrder === current + 1) {
                this.props.updateWidget(widget.id,
                    {...widget, widgetOrder: widget.widgetOrder - 1})
            }
        })
    };
    moveUp = select => {
        let current = select.widgetOrder;
        this.props.widgets.forEach(widget => {
            if (widget.widgetOrder === current) {
                this.props.updateWidget(widget.id,
                    {...widget, widgetOrder: widget.widgetOrder - 1})
            } else if (widget.widgetOrder === current - 1) {
                this.props.updateWidget(widget.id,
                    {...widget, widgetOrder: widget.widgetOrder + 1})
            }
        })
    };

    delete = (select) => {
        this.props.deleteWidget(select.id);
        this.props.widgets.forEach(widget => {
            if (widget.widgetOrder > select.widgetOrder) {
                this.props.updateWidget(widget.id,
                    {...widget, widgetOrder: widget.widgetOrder - 1})
            }
        })
    };

    generateWidgetList = () => {
        let copy = this.props.widgets.slice(0);
        copy.sort((a, b) => {
            if (a.widgetOrder > b.widgetOrder) {
                return 1;
            } else if (a.widgetOrder < b.widgetOrder) {
                return -1;
            } else {
                return 0;
            }
        });
        return copy.map(widget =>
            <li key={widget.id}
                className="list-group-item">
                {
                    widget.type === 'HEADING' &&
                    <HeadingWidgetComponent widget={widget}
                                            updateWidget={this.props.updateWidget}
                                            delete={this.delete}
                                            moveUp={this.moveUp}
                                            moveDown={this.moveDown}
                                            isLast={widget.widgetOrder
                                            === this.props.widgets.length}/>
                }
                {
                    widget.type === 'PARAGRAPH' &&
                    <ParagraphWidgetComponent widget={widget}
                                              updateWidget={this.props.updateWidget}
                                              delete={this.delete}
                                              moveUp={this.moveUp}
                                              moveDown={this.moveDown}
                                              isLast={widget.widgetOrder
                                              === this.props.widgets.length}/>
                }

                {
                    widget.type === 'IMAGE' &&
                    <ImageWidgetComponent widget={widget}
                                          updateWidget={this.props.updateWidget}
                                          delete={this.delete}
                                          moveUp={this.moveUp}
                                          moveDown={this.moveDown}
                                          isLast={widget.widgetOrder
                                          === this.props.widgets.length}/>
                }
                {
                    widget.type === 'LIST' &&
                    <ListWidgetComponent widget={widget}
                                         updateWidget={this.props.updateWidget}
                                         delete={this.delete}
                                         moveUp={this.moveUp}
                                         moveDown={this.moveDown}
                                         isLast={widget.widgetOrder
                                         === this.props.widgets.length}/>
                }
            </li>)

    };

    render() {
        return (
            <div>
                <h2>Widget List</h2>
                <ul>
                    {
                        this.props.widgets.map(widget =>
                            <li key={widget.id}>
                                {
                                    widget.type === 'HEADING' &&
                                    <HeadingWidgetComponent widget={widget}/>
                                }
                                {
                                    widget.type === 'PARAGRAPH' &&
                                    <ParagraphWidgetComponent widget={widget}/>
                                }
                                }
                                <div>
                                    <button>Edit</button>
                                    <button>Save</button>
                                    <button
                                        onClick={() => this.props.deleteWidget(
                                            widget.id)}>
                                        Delete
                                    </button>
                                    <button>Move Up</button>
                                    <button>Move Down</button>
                                    <select
                                        onChange={(e) => this.updateWidget(e,
                                            widget)} value={widget.type}>
                                        <option value="HEADING">HEADING</option>
                                        <option value="YOUTUBE">YOUTUBE</option>
                                        <option value="PARAGRAPH">PARAGRAPH
                                        </option>
                                    </select>
                                </div>
                            </li>)
                    }
                </ul>
                <button onClick={() => this.props.createWidget(this.props.params.topicId, {
                    type: 'HEADING', name: 'New Widget'
                })}>
                    Create Widget
                </button>
            </div>
        )
    }
}