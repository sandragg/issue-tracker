import { fetch } from "whatwg-fetch";
import {
    apiConfig,
    getApiPath
} from "../config";
import { BaseModel } from "./base";

class UserModel extends BaseModel {
    API_PATH = getApiPath(apiConfig, 'user');
    AUTHORIZE_API_PATH = getApiPath(apiConfig, 'authorization');

    authorize(data) {
        return fetch(
            this.AUTHORIZE_API_PATH,
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
}

export const User = new UserModel();
