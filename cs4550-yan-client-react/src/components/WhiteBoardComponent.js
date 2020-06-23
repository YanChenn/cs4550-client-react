import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import CourseManagerContainer from "../containers/CourseManagerContainer";
import CourseEditorContainer from "../containers/CourseEditorContainer";
import HomeComponent from "./HomeComponent";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
import ProfileComponent from "./ProfileComponent";

export default class WhiteBoardComponent extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <div>

                    <Route path="/login" exact={true} component={LoginComponent}/>
                    <Route path="/register" exact={true} component={RegisterComponent}/>
                    <Route path="/profile" exact={true} component={ProfileComponent}/>
                    <Route
                        path='/'
                        exact={true}
                        component={HomeComponent}/>

                    <Route
                        path='/:layout/courses'
                        exact={true}
                        component={CourseManagerContainer}/>

                    <Route
                        path={['/editor','/editor/course/:courseId', '/editor/course/:courseId/modules/:moduleId',
                               `/editor/course/:courseId/modules/:moduleId/lessons/:lessonId`,
                               `/editor/course/:courseId/modules/:moduleId/lessons/:lessonId/topics/:topicId`]}
                        exact={true}
                        component={CourseEditorContainer}/>


                </div>
            </BrowserRouter>
        )
    }
}
