import React from 'react'
import './styles.sass';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { Routes } from '../routes';
import {i18next} from '../lang/i18next';
import {I18nextProvider} from 'react-i18next';
import {Provider} from 'react-redux';
import reducers from '../reducers';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {ErrorHandler} from '../components/ErrorHandler';

const store = createStore(reducers, applyMiddleware(thunk));
export const App = () => {

  return (
       <Provider store={store}>
        <I18nextProvider i18n={i18next} >
          <Router>
            <Routes />
          </Router>
          <ErrorHandler/>
        </I18nextProvider>
      </Provider >
  );
}


