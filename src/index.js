import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import store from "./store/store"
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import "./index.css";

ReactDOM.render(
    <div className='container'>
        <Provider store={store}>
            <App/>
        </Provider>
    </div>,
    document.getElementById('root')
);

reportWebVitals();
