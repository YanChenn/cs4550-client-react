import {connect} from "react-redux";
import LessonTabsComponent from "../components/CourseEditor/LessonTabsComponent";
import {
    findLessonsForModule,
    createLesson,
    findLesson,
    deleteLesson,
    updateLesson
} from "../services/LessonService"

const stateToPropertyMapper = (state, ownProps) => ({
    lessons: state.LessonReducer.lessons,
    newLessonTitle: state.LessonReducer.newLessonTitle,
    params: ownProps.params
})

const dispatchToPropertyMapper = (dispatch) => ({
    createLesson: (moduleId, newLesson) => {
        createLesson(moduleId, newLesson)
            .then(actualLesson => dispatch({
                                               type: 'CREATE_LESSON',
                                               newLesson: actualLesson
                                           }))
    },
    findLessonsForModule: (moduleId) => {
        findLessonsForModule(moduleId)
            .then(actualLessons => dispatch({
                                                type: "FIND_LESSONS_FOR_MODULE",
                                                actualLessons: actualLessons
                                            }))
    },
    deleteLesson: (lessonId) => {
        deleteLesson(lessonId)
            .then(status => dispatch({
                                         type: "DELETE_LESSON",
                                         lessonId: lessonId
                                     }))

    },

    updateLesson: (lessonId, lesson) => {
        updateLesson(lessonId, lesson)
            .then(status => dispatch({
                                         type: 'UPDATE_LESSON',
                                         updatedLesson: lesson
                                     }))
    },
    findLesson: (lessonId) => {
        findLesson(lessonId).then(status => dispatch({
                                                         type: "FIND_LESSON",
                                                         lessonId: lessonId
                                                     }))

    }
});
const LessonTabsContainer = connect
(stateToPropertyMapper, dispatchToPropertyMapper)
(LessonTabsComponent);
export default LessonTabsContainer;

