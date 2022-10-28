const list = document.querySelector('ul');

function request(callback, url, method = 'GET', body = null, headers = {}) {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);
    Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
    });

    xhr.send(body ? JSON.stringify(body) : null);
    xhr.onload = () => {
        callback(xhr.response);
    }
}

function renderData({ name, photo, position }) {
    const li = document.createElement(`li`);
    li.innerHTML = `
        <h4>${name}</h4>
        <img src="${photo}" alt="${name}">
        <p>${position}</p>
    `;
    list.append(li)
}

request((response) => {
    const data = JSON.parse(response);

    Object.values(data).forEach((array) => {
        renderData(array);
    });
}, 'https://users-api-id.herokuapp.com/users');

