const url = 'https://wbdv-generic-server.herokuapp.com/api/001845751/courses/';

const createCourse = (course) =>
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(course),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json());

const updateCourse = (courseId, course) =>
    fetch(url + courseId, {
        method: 'PUT',
        body: JSON.stringify(course),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json());

const deleteCourse = (courseId) =>
    fetch(url + courseId, {
        method: 'DELETE'
    })
        .then(response => response.json());

const findCourseById = (courseId) => {
    return fetch(url + courseId)
        .then(response => response.json());
};

const findAllCourses = () =>
    fetch(url)
        .then(response => response.json());

export default {
    createCourse,
    deleteCourse,
    findCourseById,
    findAllCourses,
    updateCourse
}