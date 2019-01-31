import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import * as Pages from './pages';
import './App.css';

export const App = () => (
    <BrowserRouter>
        <div>
            <Route exact path="/" component={Pages.AuthorizePage} />
            <Route exact path="/create/:type" component={Pages.EditorPage} />
            <Route exact path="/edit/:id" component={Pages.EditorPage} />
            <Route exact path="/:type" component={Pages.ListPage} />
        </div>
    </BrowserRouter>
);
