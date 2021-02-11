import React from 'react';
import { Landing } from '../pages/Landing';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Home } from '../pages/Home';
import { Switch, Route } from 'react-router-dom';
import { AuthRoutes } from './AuthRoutes/AuthRoutes';
import { PublicNavbar } from '../components/PublicNavbar';
import { ChatRoom } from '../pages/ChatRoom';
import { NotFound } from '../components/NotFound'


export const Routes = () => {

    return (
        < Switch >
            <Route exact path="/">
                <PublicNavbar buttonLogin />
                <Landing />
            </Route>
            <Route exact path="/login" >
                <PublicNavbar />
                <Login />
            </Route>
            <Route exact path="/register"  >
                <PublicNavbar />
                <Register />
            </Route>
            <AuthRoutes exact path="/home" component={Home} />
            <AuthRoutes exact path="/room/:roomId" component={ChatRoom} />
            <Route component={NotFound} />
        </Switch >
    )
}
