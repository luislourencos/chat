import React from 'react';
import { Route, Redirect } from 'react-router-dom';


export const AuthRoutes = ({ component: RouteComponent, ...rest }) => {

    const authUser = true;
    return (
        <Route
            {...rest}
            render={routeProps =>
                authUser ? (
                    <RouteComponent {...routeProps} />
                ) : (
                        <Redirect to={"/login"} />
                    )
            }
        />
    );
};