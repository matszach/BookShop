import config from './config.json';

export const http = {

    request(type, url, body, callback) {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            const response = JSON.parse(xhr.responseText);
            callback(response);
        });
        xhr.open(type, config.apiUrl + url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(body));
    },

    get(url, callback) {
        this.request('GET', url, null, callback);
    },

    post(url, body, callback) {
        this.request('POST', url, body, callback);
    },

};