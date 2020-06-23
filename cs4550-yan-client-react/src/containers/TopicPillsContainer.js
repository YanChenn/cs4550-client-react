import {connect} from "react-redux";
import TopicService from "../services/TopicService"
import TopicPillsComponent from "../components/CourseEditor/TopicPillsComponent";

const stateToPropertyMapper = (state, ownProps) => ({
    topics: state.TopicReducer.topics,
    newTopicTitle: state.topicReducer.newTopicTitle,
    params: ownProps.params
});

const dispatchToPropertyMapper = (dispatch) => ({
    createTopic: (lessonId, topic) => {
        TopicService.createTopic(lessonId, topic)
            .then(actualTopic => dispatch({
                                              type: 'CREATE_TOPIC',
                                              newTopic: actualTopic
                                          }))
    },
    findTopicsForLesson: (lessonId) => {
        TopicService.findTopicsForLesson(lessonId)
            .then(actualTopics => dispatch({
                                               type: "FIND_TOPICS_FOR_LESSON",
                                               actualTopics: actualTopics
                                           }))
    },
    deleteTopic: (topicId) => {
        TopicService.deleteTopic(topicId)
            .then(status => dispatch({
                                         type: "DELETE_TOPIC",
                                         topicId: topicId
                                     }))

    },

    updateTopic: (topicId, topic) => {
        TopicService.updateTopic(topicId, topic)
            .then(status => dispatch({
                                         type: 'UPDATE_TOPIC',
                                         updatedTopic: topic
                                     }))
    },
    findTopic: (topicId) => {
        TopicService.findTopic(topicId)
            .then(status => dispatch({
                                         type: "FIND_TOPIC",
                                         topicId: topicId
                                     }))

    }
});
const TopicPillsContainer = connect
(stateToPropertyMapper, dispatchToPropertyMapper)
(TopicPillsComponent);
export default TopicPillsContainer;

