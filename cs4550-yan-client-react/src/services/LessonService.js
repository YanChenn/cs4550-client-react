export const findLessonsForModule = (moduleId) =>
    fetch(`https://wbdv-generic-server.herokuapp.com/api/001845751/modules/${moduleId}/lessons`)
        .then(response => response.json())

export const createLesson = (moduleId, newLesson) =>
    fetch(`https://wbdv-generic-server.herokuapp.com/api/001845751/modules/${moduleId}/lessons`, {
        method: 'POST',
        body: JSON.stringify(newLesson),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const findLesson = (lessonId) => {
    fetch(`https://wbdv-generic-server.herokuapp.com/api/001845751/lessons/${lessonId}`)
        .then(response => response.json())
}

export const deleteLesson = (lessonId) => {
    return fetch(`https://wbdv-generic-server.herokuapp.com/api/001845751/lessons/${lessonId}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
}

export const updateLesson = (lessonId, lesson) =>
    fetch(`https://wbdv-generic-server.herokuapp.com/api/001845751/modules/${lessonId}`, {
        method: 'PUT',
        body: JSON.stringify(lesson),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
