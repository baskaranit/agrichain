import React from 'react';
import { HashRouter } from 'react-router-dom';
import { render } from 'react-dom';

import { App } from './app/Index';

import './styles.less';

// setup fake backend
// import { configureFakeBackend } from './_helpers';
// configureFakeBackend();

render(
    <HashRouter>
        <App />
    </HashRouter>,
    document.getElementById('app')
);