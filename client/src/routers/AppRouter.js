import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AppScreen } from '../components/requests/AppScreen'
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { ClientDashboard } from '../components/requests/ClientDashboard';
import { ExecutiveDashboard } from '../components/requests/ExecutiveDashboard';
import { startChecking } from '../actions/auth';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const {checking, uid, isClient} = useSelector(state => state.auth);

    console.log(uid, isClient)

    useEffect(() => {
        dispatch( startChecking() );
    }, [dispatch])

    if ( checking ) {
        return (<h1>Loading...</h1>);
    }

    return (
        <Router>
            <div>
                <Switch>
                    <Route 
                        exact path="/" 
                        component={ AppScreen } 
                    />
                    <Route 
                        exact path="/login" 
                        component={ LoginScreen } 
                    />
                    <Route 
                        exact path="/register" 
                        component={ RegisterScreen } 
                    />
                    <Route 
                        path="/client-dashboard" 
                        component={ ClientDashboard } 
                    />
                    <Route 
                        path="/executive-dashboard" 
                        component={ ExecutiveDashboard } 
                    />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
