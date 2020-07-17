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

    const state = useSelector(state => state.auth);

    console.log(state)

    useEffect(() => {
        dispatch( startChecking() );
    }, [dispatch])

    if ( state.checking ) {
        return (<h1>Loading...</h1>);
    }

    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={ AppScreen } />
                    <Route exact path="/login" component={ LoginScreen } />
                    <Route exact path="/register" component={ RegisterScreen } />
                    <Route exact path="/client-dashboard" component={ ClientDashboard } />
                    <Route exact path="/executive-dashboard" component={ ExecutiveDashboard } />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
