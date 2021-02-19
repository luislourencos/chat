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
import { GitLogo } from '../components/GitLogo';
import { PublicRoutes } from './PublicRoutes';


export const Routes = () => {

    return (
        < Switch >
            <PublicRoutes exact path='/' component={Landing} />
            <PublicRoutes exact path='/login' component={Login} />
            <PublicRoutes exact path='/register' component={Register} />
            <AuthRoutes exact path="/home" component={Home} />
            <AuthRoutes exact path="/room/:roomId" component={ChatRoom} />
            <Route component={NotFound} />
        </Switch >
    )
}
