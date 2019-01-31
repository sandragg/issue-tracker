import React from 'react';
import {
    BrowserRouter,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import * as Pages from './pages';
import { Session } from "./services/session";
import './App.css';

export const App = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Redirect exact from="/" to="/list/issue" />
                <Route exact path="/login" component={Pages.AuthorizePage} />
                <Route path="/" render={
                    () => Session.isAuthorized() ? null : <Redirect to="/login" />
                } />
            </Switch>
            <Route exact path="/create/:type" component={Pages.EditorPage} />
            <Route exact path="/edit/:id" component={Pages.EditorPage} />
            <Route exact path="/list/:type" component={Pages.ListPage} />
        </div>
    </BrowserRouter>
);
