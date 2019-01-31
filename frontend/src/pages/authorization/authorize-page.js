import React, {
    useRef,
    useState,
    useCallback
} from 'react';
import { Redirect } from "react-router-dom";
import { User } from '../../api/models/user';
import { Session } from "../../services/session";
import './authorize-page.css';

export const AuthorizePage = () => {
    const [ isLogged, setIsLogged ] = useState(null);
    const loginRef = useRef(null);
    const passwordRef = useRef(null);
    const onSubmit = useCallback(
        () => {
            const login = loginRef.current && loginRef.current.value;
            const password = passwordRef.current && passwordRef.current.value;

            if (login && password) {
                authorizeUser({ login, password })
                    .then(res => res && setIsLogged(res));
            }
        },
        []
    );

    return isLogged ? (
        <Redirect to="/list/issue" />
    ) : (
        <section className="section authorize-section">
            <h1 className="authorize-section__title">Welcome</h1>
            <div className="authorize-section__field">
                <label
                    htmlFor="login"
                    className="field__label"
                >
                    Login
                </label>
                <input
                    ref={loginRef}
                    id="login"
                    className="field__input"
                    type="text"
                    placeholder="Enter your login"
                />
            </div>
            <div className="authorize-section__field">
                <label
                    htmlFor="password"
                    className="field__label"
                >
                    Password
                </label>
                <input
                    ref={passwordRef}
                    id="password"
                    className="field__input"
                    type="text"
                    placeholder="Enter your password"
                />
            </div>
            <button
                className="authorize-section__submit"
                onClick={onSubmit}
            >
                Submit
            </button>
        </section>
    );
};

function authorizeUser(credentials) {
    return User.authorize(credentials)
        .then(res => {
            if (typeof res === 'object') {
                Session.setUser(res);
                return true;
            }
            console.log(res);
            return false;
        });
}
