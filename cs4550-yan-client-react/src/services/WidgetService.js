const url = 'https://cs4550-20su1-yan-ass6.herokuapp.com';

export const findWidgetsForTopic = (tid) =>
    fetch(`${url}/api/topics/${tid}/widgets`)
        .then(response => response.json());

export const deleteWidget = (wid) =>
    fetch(`${url}/api/widgets/${wid}`, {
        method: 'DELETE'
    })
        .then(response => response.json());

export const createWidget = (tid, widget) =>
    fetch(`${url}/api/topics/${tid}/widgets`, {
        method: 'POST',
        body: JSON.stringify(widget),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json());

export const findWidgetById = (wid) =>
    fetch(`${url}/api/widgets/${wid}`)
        .then(response => response.json());

export const updateWidget = (wid, widget) =>
    fetch(`${url}/api/widgets/${wid}`, {
        method: 'PUT',
        body: JSON.stringify(widget),
        headers: {
            'content-type': 'application/json'
        }
    });