import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import 'bootstrap/dist/css/bootstrap.min.css'

const store = configureStore()

store.subscribe(() => {
    console.log(store.getState())
})



const ele = (
    <Provider store={store} >
        <App />
    </Provider>
)

ReactDOM.render(ele, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
