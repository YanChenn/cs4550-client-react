const url='https://cs4550-20su1-yan-ass6.herokuapp.com';

const findTopic = (topicId) => {
    return fetch(`${url}/api/topics/${topicId}`)
        .then(response => response.json())
}

const findTopicsForLesson = (lessonId) =>
    fetch(`${url}/api/lessons/${lessonId}/topics`)
        .then(response => response.json())

const deleteTopic = (topicId) => {
    return fetch(`${url}/api/topics/${topicId}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
}

const updateTopic = (topicId, topic) =>
    fetch(`${url}/api/topics/${topicId}`, {
        method: 'PUT',
        body: JSON.stringify(topic),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

const createTopic = (lessonId, topic) =>
    fetch(`${url}/api/lessons/${lessonId}/topics`, {
        method: 'POST',
        body: JSON.stringify(topic),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export default {
    createTopic,
    findTopicsForLesson,
    findTopic,
    updateTopic,
    deleteTopic
}