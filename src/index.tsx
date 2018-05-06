import React from 'react';
import ReactDOM from 'react-dom';
import App from 'src/app';
import 'src/index.css';

const render = App => {
    const root = document.getElementById('root');
    ReactDOM.render(<App />, root);
}

render(App);

declare var module: any;

if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept();
    render(App);
}

