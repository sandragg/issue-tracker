import { fetch } from "whatwg-fetch";
import {
    apiConfig,
    getApiPath
} from "../config";

export class User {
    static API_PATH = getApiPath(apiConfig, 'user');
    static AUTHORIZE_API_PATH = getApiPath(apiConfig, 'authorization');

    static authorize(data) {
        return fetch(
            User.AUTHORIZE_API_PATH,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        )
            .then(res => res.ok ? res.json() : res.text());
    }

    static getAll() {
        return fetch(User.API_PATH)
            .then(res => res.json())
    }

    static getById(id) {
        return fetch(`${User.API_PATH}/${id}`)
            .then(res => res.json())
    }

    static create(data) {
        return fetch(
            User.API_PATH,
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

    static update(id, data) {
        return fetch(
            `${User.API_PATH}/${id}`,
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
