import {connect} from "react-redux";
import ModuleListComponent from "../components/CourseEditor/ModuleListComponent";
import ModuleService from "../services/ModuleService";

const stateToPropertyMapper = (state, ownProps) => {
    return {
        modules: state.ModuleReducer.modules,
        newModuleTitle: state.ModuleReducer.newModuleTitle,
        params: ownProps.params
    }
}

const dispatchToPropertyMapper = (dispatch) => {
  return {
    findModuleForCourse: (courseId) => {
      ModuleService.findModuleForCourse(courseId)
      .then(modulesForTheCourse => dispatch({
        type: 'FIND_MODULES_FOR_COURSE',
        modules: modulesForTheCourse
      }))
    },
    updateModule: (moduleId, newModuleData) => {
      ModuleService.updateModule(moduleId, newModuleData)
      .then(status => dispatch({
        type: 'UPDATE_MODULE',
        updatedModule: newModuleData
      }))
    },
    createModule: (courseId, newModule) => {
      ModuleService.createModule(courseId, newModule)
      .then(actualNewModule => dispatch({
        type: "CREATE_MODULE",
        newModule: actualNewModule
      }))
    },
    deleteModule  : (moduleId) => {
      ModuleService.deleteModule(moduleId)
      .then(status => dispatch({
        type: "DELETE_MODULE",
        moduleId: moduleId
      }))
    }
  }
}
const ModuleListContainer = connect
(stateToPropertyMapper, dispatchToPropertyMapper)
(ModuleListComponent)

export default ModuleListContainer