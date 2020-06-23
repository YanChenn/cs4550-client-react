import {
    createWidget,
    deleteWidget,
    findWidgetsForTopic,
    updateWidget
} from "../services/WidgetService";
import {connect} from "react-redux";
import WidgetListComponent from "../components/WidgetListComponent";

const stateToPropertyMapper = (state) => ({
    widgets: state.widgetReducer.widgets
});

const dispatchToPropertyMapper = (dispatcher) => ({
    createWidget: (tid, widget) =>
        createWidget(tid, widget)
            .then(actualNewWidgetFromServer =>
                      dispatcher({
                                     type: "CREATE_WIDGET",
                                     widget: actualNewWidgetFromServer
                                 })
            ),
    deleteWidget: (wid) =>
        deleteWidget(wid)
            .then(status =>
                      dispatcher({
                                     type: "DELETE_WIDGET",
                                     widgetId: wid
                                 })),
    findWidgetsForTopic: (tid) =>
        findWidgetsForTopic(tid)
            .then(actualWidgetsFromServer =>
                      dispatcher({
                                     type: "FIND_WIDGETS_FOR_TOPIC",
                                     widgetsFromServer: actualWidgetsFromServer
                                 })),
    updateWidget: (wid, widget) =>
        updateWidget(wid, widget)
            .then(status =>
                      dispatcher({
                                     type: "UPDATE_WIDGET",
                                     updatedWidget: widget
                                 }))

});

const WidgetListContainer = connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
(WidgetListComponent);
export default WidgetListContainer;