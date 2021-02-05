import React from 'react';
import { Landing } from '../pages/Landing';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Home } from '../pages/Home';
import { Room } from '../pages/Room';
import { Switch, Route, useLocation } from 'react-router-dom';
import { AuthRoutes } from './AuthRoutes/AuthRoutes';
import { PublicNavbar } from '../components/PublicNavbar';

export const Routes = () => {
    const { pathname } = useLocation()
    console.log(pathname)
    const ComponentNav = () => {
        return (
            <PublicNavbar buttonLogin={pathname === '/'} />
        )
    }
    return (
        < Switch >

            <Route exact path="/">
                <ComponentNav />
                <Landing />
            </Route>
            <Route exact path="/login" >
                <ComponentNav />
                <Login />
            </Route>
            <Route exact path="/register"  >
                <ComponentNav />
                <Register />
            </Route>
            <AuthRoutes exact path="/home" component={Home} />
            <AuthRoutes exact path="/room" component={Room} />
        </Switch >
    )
}