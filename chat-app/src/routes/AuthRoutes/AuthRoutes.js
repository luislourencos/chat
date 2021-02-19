import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import { AuthNavbar } from '../../components/AuthNavbar';

import './styles.css'
import { GitLogo } from '../../components/GitLogo';

export const AuthRoutesBase = ({ component: RouteComponent, userIsAuth, ...rest }) => {

    const { pathname } = useLocation()

    return (
        <Route
            {...rest}
            render={routeProps =>
                userIsAuth ? (<div>
                    {pathname === '/home' ? <AuthNavbar /> : <AuthNavbar textExit={'navbar.exit'} route='/home' />}
                    <RouteComponent {...routeProps} className='route' />

                    <GitLogo />
                </div>
                ) : (
                        <Redirect to={"/login"} />
                    )
            }
        />
    );
};
const state2props = (state) => ({
    userIsAuth: state.user.isAuth
})
const dispatch2props = {

}
export const AuthRoutes = connect(state2props, dispatch2props)(AuthRoutesBase)