import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from 'src/state/store';
import App from 'src/app';
import 'src/index.css';

const render = (app: () => JSX.Element) => {
    const root = document.getElementById('root');
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        root
    );
};

render(App);

if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept();
    render(App);
}
