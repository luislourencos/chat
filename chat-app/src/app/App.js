import React, { useEffect, useState } from 'react'
import './styles.sass';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { Routes } from '../routes';
import { i18next } from '../lang/i18next';
import { I18nextProvider } from 'react-i18next';
import { connect } from 'react-redux';

import { ErrorHandler } from '../components/ErrorHandler';
import { userIsAuth } from '../actions/UserActions'
import { Spinner } from '../components/Spinner';
import { GitLogo } from '../components/GitLogo';


const AppBase = ({ userIsAuth }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    userIsAuth()
    setLoading(false)
  }, [userIsAuth])

  if (loading) {
    return (<Spinner />)
  }

  return (
    <I18nextProvider i18n={i18next} >
      <Router>
        <Routes />
      </Router>
      <ErrorHandler />
    </I18nextProvider>
  );
}

const state2props = () => ({})
const dispatch2props = {
  userIsAuth
}
export const App = connect(state2props, dispatch2props)(AppBase)


