import { fetch } from 'whatwg-fetch';

export class BaseModel {
    API_PATH = null;

    getAll() {
        return fetch(this.API_PATH)
            .then(res => res.json())
    }

    getById(id) {
        return fetch(`${this.API_PATH}/${id}`)
            .then(res => res.ok ? res.json() : res.text())
    }

    create(data) {
        return fetch(
            this.API_PATH,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        )
            .then(res => res.ok ? res.json() : res.text())
    }

    update(data, id) {
        return fetch(
            `${this.API_PATH}/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        )
            .then(res => res.ok ? res.json() : res.text())
    }
}
