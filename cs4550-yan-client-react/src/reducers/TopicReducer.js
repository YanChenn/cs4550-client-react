const initialState = {
    topics: []
};

const TopicReducer = (state = initialState, action) => {
    switch (action.type) {
        case "DELETE_TOPIC":
            return {
                topics: state.topics.filter(topic => topic.id !== action.topicId)
            };
        case "FIND_TOPICS_FOR_LESSON":
            return {
                ...state,
                topics: action.actualTopics
            };
        case "CREATE_TOPIC":
            return {
                ...state,
                topics: [...state.topics,
                         action.newTopic]
            };
        case"FIND_TOPIC":
            return {
                ...state,
                topics: action.topics
            };
        case"UPDATE_TOPIC":
            return {
                ...state,
                topics: state.topics.map(
                    topic => topic.id === action.updatedTopic.id ?
                             action.updatedTopic : topic)
            };
        default:
            return state;
    }
};

export default TopicReducer