import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { AuthNavbar } from '../../components/AuthNavbar';
import './styles.css'

export const AuthRoutesBase = ({ component: RouteComponent, userIsAuth, ...rest }) => {


    return (
        <Route
            {...rest}
            render={routeProps =>
                userIsAuth ? (<div>
                    <AuthNavbar />
                    <RouteComponent {...routeProps} className='route' />
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