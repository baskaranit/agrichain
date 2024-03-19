import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import { Nav, Alert } from '../_components';
import { Add } from '../Product/Add';
import { Edit } from '../Product/Edit';
import { List } from '../Product/List';
import { Checkout } from '../Product/Checkout';

function App() {
    const { pathname } = useLocation(); 
    return (
        <div className="app-container bg-light">
            <Nav />
            <Alert />
            <div className="container pt-4 pb-4">
                <Switch>
                    <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                    <Route exact path="/" component={List} />
                    <Route exact path="/add" component={Add} />
                    <Route exact path="/checkout" component={Checkout} />
                    <Route exact path="/edit/:id" component={Edit} />
                    <Redirect from="*" to="/" />
                </Switch>
            </div>
        </div>
    );
}

export { App }; 