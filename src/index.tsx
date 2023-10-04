import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import restaurantReducer from './redux-store/restaurantReducer';
import 'bootstrap/dist/css/bootstrap.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const store = createStore(restaurantReducer);
root.render(
  <React.StrictMode>
     <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
