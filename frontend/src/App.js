import React from 'react';
import {
    BrowserRouter,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import * as Pages from 'pages';
import { Header } from 'components/header';
import { Session } from 'services/session';
import { ROUTES } from 'services/routes';
import './App.css';

export const App = () => (
    <BrowserRouter>
        <div className="page">
            <Header />
            <main className="page-content">
                <Switch>
                    <Redirect exact from="/" to={ROUTES.HOME} />
                    <Route exact path={ROUTES.AUTHORIZE} component={Pages.AuthorizePage} />
                    <Route path="/" render={
                        () => !Session.isAuthorized()
                            ? <Redirect to={ROUTES.AUTHORIZE} />
                            : null
                    } />
                </Switch>
                <Route exact path={ROUTES.CREATE} component={Pages.EditorPage} />
                <Route exact path={ROUTES.EDIT} component={Pages.EditorPage} />
                <Route exact path={ROUTES.LIST} component={Pages.ListPage} />
            </main>
        </div>
    </BrowserRouter>
);
