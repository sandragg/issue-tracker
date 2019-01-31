export class Session {
    static isAuthorized() {
        return 'user' in sessionStorage;
    }

    static setUser(userData) {
        const strValue = JSON.stringify(userData);
        sessionStorage.setItem('user', strValue);
    }

    static getUser() {
        const strValue = sessionStorage.getItem('user');
        return JSON.parse(strValue);
    }

    static clear() {
        sessionStorage.clear();
    }
}
