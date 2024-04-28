import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from './components/reducers'; // Подключите ваш корневой редуктор
import App from './components/App';
import './index.css';

const store = configureStore({
  reducer: rootReducer, // Передайте ваш корневой редуктор в качестве параметра
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
