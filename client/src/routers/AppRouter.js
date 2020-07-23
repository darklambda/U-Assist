import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch
  } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AppScreen } from '../components/requests/AppScreen'
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { startChecking } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { ClientDashboard } from '../components/requests/ClientDashboard';
import { ExecutiveDashboard } from '../components/requests/ExecutiveDashboard';
import { PublicRoute } from './PublicRoute';
import { MeetingScreen } from '../components/requests/MeetingScreen';
import { MeetingExScreen } from '../components/requests/MeetingExScreen';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const {checking, uid, isClient} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch( startChecking() );
    }, [dispatch])

    if ( checking ) {
        return (
        <>
            <div className="jumbotron min-vh-100 text-center m-0 d-flex flex-column justify-content-center">
                <h3> Cargando... </h3>
            </div>
        </>
        );
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        exact path="/" 
                        component={ AppScreen }
                        isAuthenticated={!!uid}
                        isClient={isClient} 
                    />
                    <PublicRoute 
                        exact path="/login" 
                        component={ LoginScreen }
                        isAuthenticated={!!uid}
                        isClient={isClient} 
                    />
                    <PublicRoute 
                        exact path="/register" 
                        component={ RegisterScreen }
                        isAuthenticated={!!uid}
                        isClient={isClient} 
                    />
                    <PrivateRoute 
                        path="/client-dashboard" 
                        component={ClientDashboard}
                        isAuthenticated={!!uid && isClient}
                    />
                    <PrivateRoute 
                        path="/executive-dashboard" 
                        component={ExecutiveDashboard}
                        isAuthenticated={!!uid && !isClient}
                    />
                    <PrivateRoute 
                        path="/meet" 
                        component={MeetingScreen}
                        isAuthenticated={!!uid}
                    />
                    <PrivateRoute 
                        path="/meet-executive" 
                        component={MeetingExScreen}
                        isAuthenticated={!!uid && !isClient}
                    />
                </Switch>
            </div>
        </Router>
    )
}
