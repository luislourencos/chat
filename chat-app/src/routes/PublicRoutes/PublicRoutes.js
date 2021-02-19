import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import { PublicNavbar } from '../../components/PublicNavbar';

import './styles.sass'
import { GitLogo } from '../../components/GitLogo';

export const PublicRoutesBase = ({ component: RouteComponent, userIsAuth, ...rest }) => {

    const { pathname } = useLocation()

    return (
        <Route
            {...rest}
            render={routeProps =>
                userIsAuth ? (
                    <Redirect to={"/home"} />
                ) : (
                        <div>
                            <PublicNavbar buttonLogin={pathname === '/' ? true : false} />
                            <RouteComponent {...routeProps} className='route' />
                            <div className='routes-logo'>
                                <GitLogo />
                            </div>
                        </div>
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
export const PublicRoutes = connect(state2props, dispatch2props)(PublicRoutesBase)