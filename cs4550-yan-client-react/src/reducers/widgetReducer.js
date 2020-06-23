const initialState = {
    widgets: []
};

const widgetReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_WIDGET":
            return {
                ...state,
                widgets: [...state.widgets, action.widget]
            };
        case "FIND_WIDGETS_FOR_TOPIC":
            return {
                ...state,
                widgets: action.widgetsFromServer
            };
        case "DELETE_WIDGET":
            return {
                ...state,
                widgets: state.widgets.filter(widget => widget.id !== action.widgetId)
            };
        case "UPDATE_WIDGET":
            return {
                ...state,
                widgets: state.widgets.map(
                    widget => widget.id === action.updatedWidget.id ?
                              action.updatedWidget : widget)
            };
        default:
            return state;
    }
};

export default widgetReducer;